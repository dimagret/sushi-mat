import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";
import { handleUpload } from "./upload";

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));

// Send order notification to Telegram (server-side)
app.post("/api/send-order", async (c) => {
  try {
    const body = await c.req.json<{
      items: Array<{ name: string; quantity: number; price: number }>;
      total: number;
      phone: string;
      name?: string;
      address?: string;
      payment?: string;
      comment?: string;
      deliveryTime?: string;
    }>();

    const botToken = process.env.TG_BOT_TOKEN;
    const chatIds = [process.env.TG_CHAT_ID, process.env.TG_CHAT_ID_2].filter(Boolean);

    if (!botToken || chatIds.length === 0) {
      console.error("[send-order] TG_BOT_TOKEN or TG_CHAT_ID not configured");
      return c.json({ error: "Telegram not configured" }, 500);
    }

    const itemsText = body.items
      .map((item) => `  \u2022 ${item.name} x${item.quantity} = ${item.price * item.quantity}\u20bd`)
      .join("\n");

    const message =
      `\ud83c\udf63 <b>\u041d\u043e\u0432\u044b\u0439 \u0437\u0430\u043a\u0430\u0437 \u0421\u0443\u0448\u0438 \u041c\u0430\u0442\u044c!</b>\n\n` +
      `\ud83d\udc64 <b>\u0418\u043c\u044f:</b> ${body.name || "\u041d\u0435 \u0443\u043a\u0430\u0437\u0430\u043d\u043e"}\n` +
      `\ud83d\udcf1 <b>\u0422\u0435\u043b\u0435\u0444\u043e\u043d:</b> ${body.phone}\n` +
      `\ud83d\udccd <b>\u0410\u0434\u0440\u0435\u0441:</b> ${body.address || "\u0421\u0430\u043c\u043e\u0432\u044b\u0432\u043e\u0437"}\n` +
      `\ud83d\udcb3 <b>\u041e\u043f\u043b\u0430\u0442\u0430:</b> ${body.payment || "\u041d\u0430\u043b\u0438\u0447\u043d\u044b\u0435"}\n` +
      `\ud83d\u5505 <b>\u0412\u0440\u0435\u043c\u044f:</b> ${body.deliveryTime || "\u041a\u0430\u043a \u043c\u043e\u0436\u043d\u043e \u0441\u043a\u043e\u0440\u0435"}\n` +
      (body.comment ? `\ud83d\udcac <b>\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439:</b> ${body.comment}\n` : "") +
      `\n\ud83d\udccb <b>\u0417\u0430\u043a\u0430\u0437:</b>\n${itemsText}\n\n` +
      `\ud83d\udcb0 <b>\u0418\u0442\u043e\u0433\u043e:</b> <b>${body.total}\u20bd</b>`;

    const results = [];
    for (const chatId of chatIds) {
      try {
        const resp = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
          }),
        });
        const data = await resp.json();
        results.push({ chatId, ok: data.ok, messageId: data.result?.message_id });
      } catch (err) {
        results.push({ chatId, ok: false, error: String(err) });
      }
    }

    console.log("[send-order] Results:", JSON.stringify(results));
    return c.json({ success: true, results });
  } catch (err) {
    console.error("[send-order] Error:", err);
    return c.json({ error: "Failed to process order" }, 500);
  }
});

// File upload endpoint
app.post("/api/upload", handleUpload);

app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
