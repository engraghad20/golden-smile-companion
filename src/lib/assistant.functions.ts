import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { ASSISTANT_SYSTEM_PROMPT } from "./assistant-knowledge";

const InputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(40),
});

export type AssistantReply = {
  reply: string;
  mode: "live" | "demo";
};

/**
 * طبقة خدمة المساعد: تستدعي مزوّد الذكاء الاصطناعي على الخادم فقط.
 * إذا لم يكن المفتاح مهيأً، تُعيد الحالة "demo" ليتولى العميل وضع العرض المحلي.
 */
export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }): Promise<AssistantReply> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { reply: "", mode: "demo" };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        messages: [{ role: "system", content: ASSISTANT_SYSTEM_PROMPT }, ...data.messages],
      }),
    });

    if (response.status === 429) {
      throw new Error("RATE_LIMIT");
    }
    if (response.status === 402 || response.status === 403) {
      throw new Error("QUOTA");
    }
    if (!response.ok) {
      throw new Error("UPSTREAM");
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = payload.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error("EMPTY");

    return { reply, mode: "live" };
  });
