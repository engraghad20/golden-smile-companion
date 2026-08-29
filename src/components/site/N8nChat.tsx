import { useEffect } from "react";

const N8N_CSS_ID = "n8n-chat-styles";

/**
 * شات n8n الخاص بالعميلة — يُحمَّل في المتصفح فقط (client-only).
 */
export function N8nChat() {
  useEffect(() => {
    if (!document.getElementById("n8n-chat-theme")) {
      const style = document.createElement("style");
      style.id = "n8n-chat-theme";
      style.textContent = `
        :root {
          --chat--color-primary: #1a365d;
          --chat--color-primary-shade-50: #2a4365;
          --chat--color-primary-tint-50: #2b6cb0;
          --chat--color-light: #ffffff;
          --chat--color-dark: #000000;
          --chat--font-family: 'Tajawal', sans-serif;
        }
      `;
      document.head.appendChild(style);
    }

    if (!document.getElementById(N8N_CSS_ID)) {
      const link = document.createElement("link");
      link.id = N8N_CSS_ID;
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
      document.head.appendChild(link);
    }

    let cancelled = false;

    const bundleUrl = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js";
    void import(/* @vite-ignore */ bundleUrl).then(
      ({ createChat }) => {
        if (cancelled) return;
        createChat({
          webhookUrl:
            "https://raghad2026.app.n8n.cloud/webhook/ef045e22-eab7-4940-b8f0-f01e6576dcb0/chat",
          mode: "floating-button",
          defaultLanguage: "ar",
          initialMessages: ["أهلاً بك 👋", "معك رغد، كيف ممكن أساعدك؟"],
          i18n: {
            ar: {
              title: "أهلاً وسهلاً 👋",
              subtitle: "ابدأ المحادثة، متواجدين على مدار الساعة لخدمتك.",
              footer: "",
              getStarted: "مرحباً 👋",
              inputPlaceholder: "اكتب سؤالك...",
            },
          },
        });
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
