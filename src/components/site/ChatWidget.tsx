import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, RefreshCcw, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import logoMark from "@/assets/logo-mark.png";
import { demoRespond, initialDemoState, type DemoState } from "@/lib/assistant-demo";
import type { ChatMessage } from "@/lib/assistant-knowledge";
import { askAssistant } from "@/lib/assistant.functions";
import { cn } from "@/lib/utils";

const quickActions = [
  "حجز موعد",
  "معرفة الخدمات",
  "الاستفسار عن الأسعار",
  "أوقات العمل",
  "التحدث مع موظف",
];

const welcome: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "أهلًا بك في المدار الذهبي 👋🏻\n\nكيف أقدر أساعدك اليوم؟",
  createdAt: Date.now(),
};

function newId() {
  return Math.random().toString(36).slice(2);
}

export function ChatWidget({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoState, setDemoState] = useState<DemoState>(initialDemoState);
  const [suggestions, setSuggestions] = useState<string[]>(quickActions);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ask = useServerFn(askAssistant);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 260);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || pending) return;

      const userMessage: ChatMessage = {
        id: newId(),
        role: "user",
        content: text,
        createdAt: Date.now(),
      };
      const history = [...messages, userMessage];
      setMessages(history);
      setInput("");
      setSuggestions([]);
      setError(null);
      setPending(true);

      const runDemo = () => {
        const result = demoRespond(text, demoState);
        setDemoState(result.state);
        setSuggestions(result.options ?? []);
        setMessages((prev) => [
          ...prev,
          { id: newId(), role: "assistant", content: result.reply, createdAt: Date.now() },
        ]);
      };

      try {
        const result = await ask({
          data: {
            messages: history
              .filter((message) => message.id !== "welcome")
              .map(({ role, content }) => ({ role, content })),
          },
        });

        if (result.mode === "demo" || !result.reply) {
          runDemo();
        } else {
          setMessages((prev) => [
            ...prev,
            { id: newId(), role: "assistant", content: result.reply, createdAt: Date.now() },
          ]);
        }
      } catch {
        setError(
          "يبدو أن هناك مشكلة بسيطة في الاتصال حاليًا. يمكنك المحاولة مرة أخرى، أو التواصل مباشرة مع فريق العيادة.",
        );
        runDemo();
      } finally {
        setPending(false);
      }
    },
    [ask, demoState, messages, pending],
  );

  const reset = () => {
    setMessages([welcome]);
    setDemoState(initialDemoState);
    setSuggestions(quickActions);
    setError(null);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-label={open ? "إغلاق مساعد المدار" : "فتح مساعد المدار الذكي"}
        className={cn(
          "fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-ink py-3.5 pr-4 pl-5 text-sm font-semibold text-background shadow-[var(--shadow-lift)] transition-transform duration-300 hover:scale-[1.03]",
          !open && "pulse-ring",
          open && "scale-95 opacity-0 lg:opacity-100",
        )}
      >
        {open ? (
          <X className="size-5" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-5 text-gold" aria-hidden="true" />
        )}
        <span>{open ? "إغلاق" : "مساعد المدار"}</span>
      </button>

      <div
        role="dialog"
        aria-modal="false"
        aria-label="مساعد المدار الذكي"
        aria-hidden={!open}
        className={cn(
          "fixed z-50 flex flex-col overflow-hidden bg-card shadow-[var(--shadow-lift)] transition-all duration-400",
          "inset-x-0 bottom-0 top-0 rounded-none sm:inset-auto sm:bottom-24 sm:left-5 sm:top-auto sm:h-[min(38rem,80vh)] sm:w-[24.5rem] sm:rounded-xl sm:border sm:border-border",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <div className="flex items-start gap-3 bg-ink px-5 py-4 text-background">
          <img src={logoMark} alt="" width={40} height={40} className="mt-0.5 size-10" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">مساعد المدار الذكي</p>
            <p className="mt-1 flex items-center gap-1.5 text-[0.72rem] text-background/60">
              <span className="inline-block size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              متصل الآن
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            aria-label="بدء محادثة جديدة"
            className="inline-flex size-9 items-center justify-center rounded-md text-background/60 transition-colors hover:text-gold"
          >
            <RefreshCcw className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            aria-label="إغلاق المحادثة"
            className="inline-flex size-9 items-center justify-center rounded-md text-background/60 transition-colors hover:text-gold"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <p className="border-b border-border bg-secondary px-5 py-3 text-[0.78rem] leading-6 text-muted-foreground">
          أساعدك في معرفة الخدمات، الأسعار، أوقات العمل، وحجز موعدك.
        </p>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "msg-in flex",
                message.role === "user" ? "justify-start" : "justify-end",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-xl px-4 py-3 text-[0.9rem] leading-7 whitespace-pre-line",
                  message.role === "user"
                    ? "rounded-bl-sm bg-primary text-primary-foreground"
                    : "rounded-br-sm border border-border bg-secondary text-foreground",
                )}
              >
                {message.content}
              </div>
            </div>
          ))}

          {pending ? (
            <div className="flex justify-end" aria-live="polite">
              <div className="flex items-center gap-1.5 rounded-xl rounded-br-sm border border-border bg-secondary px-4 py-3.5">
                <span className="sr-only">المساعد يكتب…</span>
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    className="typing-dot size-1.5 rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {error ? (
            <p
              role="alert"
              className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-[0.8rem] leading-6 text-destructive"
            >
              {error}
            </p>
          ) : null}
        </div>

        {suggestions.length ? (
          <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
            {suggestions.map((action) => (
              <button
                key={action}
                type="button"
                onClick={() => void send(action)}
                className="rounded-full border border-border px-3.5 py-2 text-[0.8rem] text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
              >
                {action}
              </button>
            ))}
          </div>
        ) : null}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void send(input);
          }}
          className="flex items-end gap-2 border-t border-border p-3"
        >
          <label htmlFor="assistant-input" className="sr-only">
            اكتب رسالتك
          </label>
          <textarea
            id="assistant-input"
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void send(input);
              }
            }}
            placeholder="اكتب سؤالك هنا…"
            className="max-h-28 min-h-11 flex-1 resize-none rounded-md border border-input bg-background px-3.5 py-2.5 text-sm leading-7 placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={pending || !input.trim()}
            aria-label="إرسال الرسالة"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
          >
            <Send className="size-4 rotate-180" aria-hidden="true" />
          </button>
        </form>
      </div>
    </>
  );
}
