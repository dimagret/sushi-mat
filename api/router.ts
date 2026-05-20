import { createRouter } from "./middleware";
import { orderRouter } from "./routers/order";
import { paymentRouter } from "./routers/payment";
import { webhookRouter } from "./routers/webhook";
import { menuRouter } from "./routers/menu";
import { telegramRouter } from "./routers/telegram";

export const appRouter = createRouter({
  order: orderRouter,
  payment: paymentRouter,
  webhook: webhookRouter,
  menu: menuRouter,
  telegram: telegramRouter,
});

export type AppRouter = typeof appRouter;
