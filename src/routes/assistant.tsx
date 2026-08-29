import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock, Clock, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { openAssistant } from "@/lib/assistant-bus";

const capabilities = [
  {
    Icon: Sparkles,
    title: "شرح الخدمات",
    body: "يوضح لك ما تشمله كل خدمة، ومتى تكون مناسبة، دون أي تشخيص طبي.",
  },
  {
    Icon: CalendarClock,
    title: "تجهيز طلب حجز",
    body: "يجمع اسمك ورقم جوالك والخدمة والوقت المفضل، ثم يلخّص الطلب قبل إرساله.",
  },
  {
    Icon: Clock,
    title: "أوقات العمل والتواصل",
    body: "يجيب عن ساعات العمل وطرق التواصل المباشر مع فريق العيادة.",
  },
  {
    Icon: ShieldCheck,
    title: "حدود واضحة",
    body: "لا يقدم تشخيصًا ولا أسعارًا غير معلنة، ويوجّهك لمختص في الحالات العاجلة.",
  },
];

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "مساعد المدار الذكي | المدار الذهبي لطب الأسنان" },
      {
        name: "description",
        content:
          "مساعد رقمي تابع لعيادة المدار الذهبي: يشرح الخدمات، يوضح أوقات العمل، ويساعدك في تجهيز طلب حجز موعدك.",
      },
      { property: "og:title", content: "مساعد المدار الذكي | المدار الذهبي لطب الأسنان" },
      { property: "og:description", content: "معك للإجابة، والمساعدة، وحجز موعدك." },
    ],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  return (
    <>
      <PageHeader
        eyebrow="مساعد المدار الذكي"
        title="معك للإجابة، والمساعدة، وحجز موعدك."
        body="موظف استقبال رقمي مصمم لعيادة المدار الذهبي. يعمل بالعربية، ويعرف خدمات العيادة وأوقات عملها، ويساعدك في تجهيز طلب حجز واضح."
      />

      <section className="container-x py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ Icon, title, body }, index) => (
            <Reveal key={title} delay={index * 70} className="border border-border bg-card p-7">
              <Icon className="size-6 text-gold" strokeWidth={1.4} aria-hidden="true" />
              <h2 className="mt-6 text-base font-bold text-foreground">{title}</h2>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">{body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-6 border border-border bg-secondary/50 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">جرّب المساعد الآن</h2>
            <p className="mt-2 max-w-lg text-sm leading-8 text-muted-foreground">
              يفتح المساعد في أي صفحة من الموقع. إذا لم يكن مزوّد الذكاء الاصطناعي متاحًا مؤقتًا،
              يعمل المساعد في وضع عرض تجريبي بردود محاكاة.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openAssistant}
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              ابدأ المحادثة
            </button>
            <Link
              to="/booking"
              className="inline-flex min-h-12 items-center rounded-md border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              الحجز عبر النموذج
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs leading-7 text-muted-foreground">
          المساعد لا يقدم استشارات أو تشخيصات طبية، ولا يؤكد المواعيد. طلب الحجز يصل لفريق العيادة
          الذي يتواصل معك للتأكيد.
        </p>
      </section>
    </>
  );
}
