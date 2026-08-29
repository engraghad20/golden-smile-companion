import { createFileRoute, Link } from "@tanstack/react-router";

import { FaqAccordion } from "@/components/site/FaqAccordion";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "الأسئلة الشائعة | المدار الذهبي لطب الأسنان" },
      {
        name: "description",
        content:
          "إجابات واضحة عن الحجز أونلاين، الخدمات، الاستشارة، تعديل المواعيد، أوقات العمل، ودور المساعد الذكي.",
      },
      { property: "og:title", content: "الأسئلة الشائعة | المدار الذهبي لطب الأسنان" },
      { property: "og:description", content: "كل ما تحتاج معرفته قبل زيارتك الأولى." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="الأسئلة الشائعة"
        title="إجابات واضحة، بدون تعقيد."
        body="جمعنا أكثر الأسئلة تكرارًا من المرضى. إذا لم تجد إجابتك، فريق العيادة والمساعد الذكي متاحان لمساعدتك."
      />

      <section className="container-x py-16">
        <div className="mx-auto max-w-3xl">
          <FaqAccordion />
          <div className="mt-12 border border-border bg-secondary/50 p-7">
            <h2 className="text-base font-bold text-foreground">سؤالك غير موجود هنا؟</h2>
            <p className="mt-3 text-sm leading-8 text-muted-foreground">
              يمكنك التواصل مع فريق العيادة مباشرة، أو إرسال طلب حجز وسنساعدك في تحديد الخطوة
              المناسبة.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                تواصل معنا
              </Link>
              <Link
                to="/booking"
                className="rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                احجز موعدك
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
