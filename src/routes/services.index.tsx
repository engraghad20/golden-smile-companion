import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";
import { services } from "@/data/clinic";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "خدماتنا | المدار الذهبي لطب الأسنان" },
      {
        name: "description",
        content:
          "تنظيف، تبييض، حشوات تجميلية، تقويم، زراعة، عدسات، علاج جذور، وطب أسنان الأطفال — كل ما تحتاجه ابتسامتك في مكان واحد.",
      },
      { property: "og:title", content: "خدماتنا | المدار الذهبي لطب الأسنان" },
      {
        property: "og:description",
        content: "ثماني خدمات متخصصة مع خطة علاجية واضحة لكل حالة.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="الخدمات"
        title="كل ما تحتاجه ابتسامتك… في مكان واحد."
        body="نغطي العناية الوقائية والعلاجية والتجميلية بفريق متخصص، مع شرح واضح للخيارات قبل بدء أي خطة."
      />

      <section className="container-x py-20">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 50} className="bg-card">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-8 text-muted-foreground">
            غير متأكد من الخدمة المناسبة؟ ابدأ باستشارة قصيرة وسنساعدك في تحديد الخطوة الأنسب.
          </p>
          <Link
            to="/booking"
            className="rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ink-soft"
          >
            احجز استشارة
          </Link>
        </div>
      </section>
    </>
  );
}
