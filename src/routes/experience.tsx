import { createFileRoute } from "@tanstack/react-router";

import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Testimonials } from "@/components/site/Testimonials";
import { cases, journey } from "@/data/clinic";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "تجارب المرضى | المدار الذهبي لطب الأسنان" },
      {
        name: "description",
        content:
          "رحلة المريض في المدار الذهبي: استماع، خطة واضحة، ومرافقة بعد العلاج — مع نماذج بصرية قبل وبعد وآراء المرضى.",
      },
      { property: "og:title", content: "تجارب المرضى | المدار الذهبي لطب الأسنان" },
      { property: "og:description", content: "تجربة مختلفة تبدأ من أول لحظة." },
    ],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="تجربة المريض"
        title="تجربة مختلفة تبدأ من أول لحظة."
        body="من أول اتصال حتى ما بعد العلاج، الرحلة مصممة لتكون واضحة ومريحة."
      />

      <section className="container-x py-20">
        <ol className="grid gap-10 md:grid-cols-3">
          {journey.map((step, index) => (
            <Reveal as="li" key={step.step} delay={index * 90} className="border-t border-border pt-6">
              <span className="text-sm font-bold tracking-[0.2em] text-gold">{step.step}</span>
              <h2 className="mt-4 text-lg font-bold text-foreground">{step.title}</h2>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-card py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="قبل وبعد"
            title="فرق تراه… بهدوء وبلا مبالغة."
            body="اسحب الشريط لمقارنة الحالة قبل وبعد. الصور المعروضة لأغراض العرض البصري ضمن النموذج التجريبي للموقع."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {cases.map((item, index) => (
              <Reveal key={item.id} delay={index * 80}>
                <BeforeAfterSlider before={item.before} after={item.after} label={item.title} />
                <h3 className="mt-5 text-base font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.note}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="آراء المرضى" title="ما قالوه عن التجربة." align="center" />
        <div className="mt-14">
          <Testimonials />
        </div>
        <p className="mt-12 text-center text-xs text-muted-foreground">
          التجارب المعروضة نصوص افتراضية أُنشئت لأغراض العرض ضمن هذا النموذج.
        </p>
      </section>
    </>
  );
}
