import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { db } from "../queries/connection";
import { orders, orderItems } from "../../db/schema";
import { eq } from "drizzle-orm";
import { generateOrderNumber, calculateOrderTotals } from "../services/order";

// Send order notification to Telegram
async function sendTelegramNotification(order: {
  orderNumber: string;
  customerName?: string;
  customerPhone: string;
  deliveryAddress: string;
  total: number;
  items: Array<{ name: string; quantity: number; unitPrice: number }>;
  deliveryFee: number;
  discount: number;
}) {
  const botToken = process.env.TG_BOT_TOKEN;
  const chatIds = [process.env.TG_CHAT_ID, process.env.TG_CHAT_ID_2].filter(Boolean);

  if (!botToken || chatIds.length === 0) {
    console.warn("[Telegram] TG_BOT_TOKEN or TG_CHAT_ID not configured");
    return;
  }

  const itemsText = order.items
    .map((item) => `  • ${item.name} x${item.quantity} = ${item.unitPrice * item.quantity}₽`)
    .join("\n");

  const message = `
🍣 <b>Новый заказ Суши Мать!</b>

📋 <b>Заказ:</b> ${order.orderNumber}
👤 <b>Имя:</b> ${order.customerName || "Не указано"}
📞 <b>Телефон:</b> ${order.customerPhone}
📍 <b>Адрес:</b> ${order.deliveryAddress}

🛒 <b>Состав заказа:</b>
${itemsText}

🚚 <b>Доставка:</b> ${order.deliveryFee > 0 ? order.deliveryFee + "₽" : "Бесплатно"}
${order.discount > 0 ? `🎁 <b>Скидка:</b> ${order.discount}₽\n` : ""}💰 <b>Итого:</b> <b>${order.total}₽</b>
  `.trim();

  for (const chatId of chatIds) {
    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });

      const data = await response.json();
      if (data.ok) {
        console.log(`[Telegram] Sent to ${chatId}, messageId: ${data.result?.message_id}`);
      } else {
        console.error(`[Telegram] Error: ${data.description}`);
      }
    } catch (error) {
      console.error(`[Telegram] Failed to send: ${error}`);
    }
  }
}

export const orderRouter = createRouter({
  create: publicQuery
    .input(z.object({
      customerPhone: z.string().min(10).max(20),
      customerName: z.string().optional(),
      customerEmail: z.string().email().optional(),
      deliveryAddress: z.string().min(5),
      deliveryInstructions: z.string().optional(),
      items: z.array(z.object({
        menuItemId: z.number(),
        name: z.string(),
        quantity: z.number().min(1),
        unitPrice: z.number(),
      })).min(1),
      deliveryFee: z.number().optional().default(0),
      discount: z.number().optional().default(0),
    }))
    .mutation(async ({ input }) => {
      const orderNumber = generateOrderNumber();
      const calc = calculateOrderTotals(input.items, input.deliveryFee, input.discount);

      await db.insert(orders).values({
        orderNumber,
        customerPhone: input.customerPhone,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        deliveryAddress: input.deliveryAddress,
        deliveryInstructions: input.deliveryInstructions,
        subtotal: calc.subtotal,
        deliveryFee: calc.deliveryFee,
        discount: calc.discount,
        total: calc.total,
        status: "draft",
      } as any);

      const newOrder = await db.query.orders.findFirst({
        orderBy: (orders: any, { desc: d }: any) => [d(orders.id)],
      });
      const id = newOrder?.id || 0;

      for (const item of input.items) {
        await db.insert(orderItems).values({
          orderId: id,
          menuItemId: item.menuItemId,
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.unitPrice * item.quantity,
        } as any);
      }

      // Send Telegram notification
      await sendTelegramNotification({
        orderNumber,
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        deliveryAddress: input.deliveryAddress,
        total: calc.total,
        items: input.items,
        deliveryFee: calc.deliveryFee,
        discount: calc.discount,
      });

      return { orderId: id, orderNumber, total: calc.total, items: input.items.length };
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const order = await db.query.orders.findFirst({
        where: eq(orders.id, input.id),
      });
      if (!order) throw new Error("Order not found");

      const items = await db.query.orderItems.findMany({
        where: eq(orderItems.orderId, input.id),
      });

      return { ...order, items };
    }),

  updateStatus: publicQuery
    .input(z.object({
      orderId: z.number(),
      status: z.enum(["pending", "confirmed", "preparing", "ready", "out_for_delivery", "delivered", "cancelled"]),
    }))
    .mutation(async ({ input }) => {
      await db.update(orders)
        .set({ status: input.status, updatedAt: new Date() })
        .where(eq(orders.id, input.orderId));
      return { success: true };
    }),

  list: publicQuery
    .query(async () => {
      return db.query.orders.findMany({
        orderBy: (orders: any, { desc: d }: any) => [d(orders.createdAt)],
        limit: 20,
      });
    }),
});
