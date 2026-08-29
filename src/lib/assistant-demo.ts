import { clinic, services } from "@/data/clinic";

/**
 * وضع العرض التجريبي: يُستخدم فقط إذا لم يكن مزوّد الذكاء الاصطناعي مهيأً
 * أو تعذّر الاتصال به. يحاكي سلوك موظف الاستقبال بشكل تسلسلي.
 */

export type DemoState = {
  stage: "idle" | "name" | "phone" | "service" | "time" | "done";
  fullName?: string;
  phone?: string;
  service?: string;
  time?: string;
};

export const initialDemoState: DemoState = { stage: "idle" };

const serviceNames = services.map((service) => service.title);

function matchService(text: string): string | undefined {
  return serviceNames.find((name) => text.includes(name.replace("الأسنان", "").trim()));
}

export function demoRespond(
  input: string,
  state: DemoState,
): { reply: string; state: DemoState; options?: string[] } {
  const text = input.trim();

  if (state.stage === "name") {
    return {
      reply: `شكرًا لك ${text.split(" ")[0]} 🤍 ما رقم الجوال الذي نتواصل معك عليه؟`,
      state: { ...state, fullName: text, stage: "phone" },
    };
  }

  if (state.stage === "phone") {
    if (!/\d{6,}/.test(text.replace(/\s/g, ""))) {
      return {
        reply: "يبدو أن الرقم غير مكتمل. ممكن تكتب رقم الجوال بصيغة 05XXXXXXXX؟",
        state,
      };
    }
    return {
      reply: "ممتاز. أي خدمة حاب تحجز لها؟",
      state: { ...state, phone: text, stage: "service" },
      options: [...serviceNames, "استشارة"],
    };
  }

  if (state.stage === "service") {
    return {
      reply: "وأي وقت يناسبك أكثر؟",
      state: { ...state, service: matchService(text) ?? text, stage: "time" },
      options: ["صباحًا", "بعد الظهر", "مساءً"],
    };
  }

  if (state.stage === "time") {
    const next: DemoState = { ...state, time: text, stage: "done" };
    return {
      reply: `تم استلام بياناتك بنجاح 🤍

سأجهز طلب الحجز بالمعلومات التالية:
الاسم: ${next.fullName}
الجوال: ${next.phone}
الخدمة: ${next.service}
الوقت المفضل: ${next.time}

هذا طلب حجز تم إرساله لفريق العيادة، وسيتواصل معك لتأكيد الموعد.`,
      state: next,
    };
  }

  if (/حجز|احجز|ابغا احجز|موعد/.test(text)) {
    return {
      reply: "أكيد 🤍 يسعدني أساعدك بالحجز. ممكن أعرف اسمك الكامل؟",
      state: { stage: "name" },
    };
  }

  if (/دوام|وقت|ساعات|متى|تفتح/.test(text)) {
    return {
      reply: `أوقات العمل: ${clinic.hours[0]!.days} — ${clinic.hours[0]!.time}، والجمعة مغلق.`,
      state,
    };
  }

  if (/سعر|أسعار|كم|تكلفة/.test(text)) {
    return {
      reply:
        "الأسعار غير معلنة في هذا النموذج، وتُحدد بعد الاستشارة وتقييم الحالة. يسعدني تجهيز طلب حجز استشارة إذا حاب.",
      state,
    };
  }

  if (/خدمة|خدمات|علاج/.test(text)) {
    return {
      reply: `نقدم: ${serviceNames.join("، ")}. أي خدمة تحب تعرف عنها أكثر؟`,
      state,
      options: serviceNames.slice(0, 4),
    };
  }

  if (/موظف|بشري|تواصل|اتصال/.test(text)) {
    return {
      reply: `تقدر تتواصل مع فريق العيادة مباشرة على ${clinic.phone} أو عبر واتساب، خلال أوقات العمل.`,
      state,
    };
  }

  if (/ألم|وجع|نزيف|ورم|طارئ|كسر/.test(text)) {
    return {
      reply:
        "ما أقدر أقدم تشخيصًا طبيًا. إذا كان الألم شديدًا أو مصحوبًا بتورم أو نزيف، الأفضل التواصل مباشرة مع مختص أو أقرب خدمة طوارئ. ويسعدني أجهز لك طلب موعد عاجل.",
      state,
    };
  }

  return {
    reply:
      "يسعدني أساعدك. تحب أساعدك في حجز موعد، أو تعرف أكثر عن الخدمات وأوقات العمل؟ (الرد الحالي من وضع العرض التجريبي)",
    state,
    options: ["حجز موعد", "معرفة الخدمات", "أوقات العمل"],
  };
}
