import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { db } from "../queries/connection";
import { payments, orders } from "../../db/schema";
import { eq } from "drizzle-orm";
import { createYookassaPayment, getYookassaPayment, mapYookassaStatus } from "../services/yookassa";

export const paymentRouter = createRouter({
  create: publicQuery
    .input(z.object({
      orderId: z.number(),
      amount: z.number(),
      description: z.string().optional(),
      customerEmail: z.string().email().optional(),
      customerPhone: z.string().optional(),
      returnUrl: z.string().url(),
    }))
    .mutation(async ({ input }) => {
      const order = await db.query.orders.findFirst({
        where: eq(orders.id, input.orderId),
      });
      if (!order) throw new Error("Order not found");
      if (order.status === "cancelled") throw new Error("Order is cancelled");

      const idempotencyKey = `${Date.now()}_${input.orderId}`;

      const yookassaResponse = await createYookassaPayment({
        amount: input.amount,
        description: input.description || `Order #${order.orderNumber}`,
        orderId: input.orderId,
        returnUrl: input.returnUrl,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
      }) as any;

      await db.insert(payments).values({
        orderId: input.orderId,
        yookassaPaymentId: yookassaResponse.id,
        yookassaConfirmationUrl: yookassaResponse.confirmation?.confirmation_url,
        amount: input.amount,
        status: "pending",
        description: input.description || `Order #${order.orderNumber}`,
        metadata: { yookassaResponse: yookassaResponse },
        idempotencyKey,
      } as any);

      const newPayment = await db.query.payments.findFirst({
        orderBy: (payments: any, { desc }: any) => [desc(payments.id)],
      });

      await db.update(orders)
        .set({ status: "pending", updatedAt: new Date() })
        .where(eq(orders.id, input.orderId));

      return {
        paymentId: newPayment?.id,
        yookassaPaymentId: yookassaResponse.id,
        confirmationUrl: yookassaResponse.confirmation?.confirmation_url,
        status: "pending",
      };
    }),

  checkStatus: publicQuery
    .input(z.object({ paymentId: z.number() }))
    .query(async ({ input }) => {
      const payment = await db.query.payments.findFirst({
        where: eq(payments.id, input.paymentId),
      });
      if (!payment) throw new Error("Payment not found");

      if (payment.yookassaPaymentId) {
        try {
          const yookassaPayment = await getYookassaPayment(payment.yookassaPaymentId) as any;
          const mappedStatus = mapYookassaStatus(yookassaPayment.status);

          if (mappedStatus !== payment.status) {
            await db.update(payments)
              .set({
                status: mappedStatus as any,
                paymentMethod: yookassaPayment.payment_method?.type,
                last4: yookassaPayment.payment_method?.card?.last4,
                cardType: yookassaPayment.payment_method?.card?.card_type,
                metadata: { ...payment.metadata as any, yookassaResponse: yookassaPayment },
                updatedAt: new Date(),
              })
              .where(eq(payments.id, input.paymentId));

            if (mappedStatus === "succeeded") {
              await db.update(orders)
                .set({ status: "confirmed", updatedAt: new Date() })
                .where(eq(orders.id, payment.orderId));
            }
          }

          return { ...payment, status: mappedStatus, yookassaStatus: yookassaPayment.status };
        } catch (e) {
          return payment;
        }
      }

      return payment;
    }),

  listByOrder: publicQuery
    .input(z.object({ orderId: z.number() }))
    .query(async ({ input }) => {
      return db.query.payments.findMany({
        where: eq(payments.orderId, input.orderId),
      });
    }),
});
