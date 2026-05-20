import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";

export const telegramRouter = createRouter({
  sendOrder: publicQuery
    .input(
      z.object({
        botToken: z.string().min(1),
        chatId: z.string().min(1),
        message: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const url = `https://api.telegram.org/bot${input.botToken}/sendMessage`;
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: input.chatId,
            text: input.message,
            parse_mode: "HTML",
          }),
        });

        const data = await response.json();

        if (!data.ok) {
          return {
            success: false,
            error: data.description || "Telegram API error",
          };
        }

        return { success: true, messageId: data.result?.message_id };
      } catch (error) {
        return { success: false, error: String(error) };
      }
    }),
});
