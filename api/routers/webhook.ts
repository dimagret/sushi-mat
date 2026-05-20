import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { db } from "../queries/connection";
import { payments, orders } from "../../db/schema";
import { eq } from "drizzle-orm";
import { mapYookassaStatus } from "../services/yookassa";

export const webhookRouter = createRouter({
  yookassa: publicQuery
    .input(z.object({
      type: z.string(),
      event: z.string().optional(),
      object: z.object({
        id: z.string(),
        status: z.string(),
        amount: z.object({
          value: z.string(),
          currency: z.string(),
        }),
        income_amount: z.object({
          value: z.string(),
          currency: z.string(),
        }).optional(),
        description: z.string().optional(),
        metadata: z.record(z.string(), z.string()).optional(),
        payment_method: z.object({
          type: z.string(),
          id: z.string(),
          saved: z.boolean(),
          title: z.string().optional(),
          card: z.object({
            first6: z.string().optional(),
            last4: z.string(),
            expiry_year: z.string(),
            expiry_month: z.string(),
            card_type: z.string().optional(),
          }).optional(),
        }).optional(),
        created_at: z.string().optional(),
        captured_at: z.string().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      const yookassaPaymentId = input.object.id;
      const newStatus = mapYookassaStatus(input.object.status);

      const payment = await db.query.payments.findFirst({
        where: eq(payments.yookassaPaymentId, yookassaPaymentId),
      });

      if (!payment) {
        console.error(`Payment not found for Yookassa ID: ${yookassaPaymentId}`);
        return { status: "not_found" };
      }

      const card = input.object.payment_method?.card as any;

      await db.update(payments)
        .set({
          status: newStatus as any,
          paymentMethod: input.object.payment_method?.type,
          last4: card?.last4,
          cardType: card?.card_type,
          metadata: {
            ...(payment.metadata as any),
            yookassaWebhook: input.object,
          },
          updatedAt: new Date(),
        })
        .where(eq(payments.id, payment.id));

      if (newStatus === "succeeded") {
        await db.update(orders)
          .set({ status: "confirmed", updatedAt: new Date() })
          .where(eq(orders.id, payment.orderId));
      } else if (newStatus === "cancelled") {
        await db.update(orders)
          .set({ status: "cancelled", updatedAt: new Date() })
          .where(eq(orders.id, payment.orderId));
      } else if (newStatus === "refunded") {
        await db.update(orders)
          .set({ status: "refunded", updatedAt: new Date() })
          .where(eq(orders.id, payment.orderId));
      }

      return { status: "processed", paymentId: payment.id, newStatus };
    }),
});
