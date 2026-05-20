import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { db } from "../queries/connection";
import { orders, orderItems } from "../../db/schema";
import { eq } from "drizzle-orm";
import { generateOrderNumber, calculateOrderTotals } from "../services/order";

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
