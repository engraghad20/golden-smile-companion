import { createFileRoute, Link } from "@tanstack/react-router";

import clinicRoom from "@/assets/clinic-room.jpg";
import heroClinic from "@/assets/hero-clinic.jpg";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { journey, stats } from "@/data/clinic";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن العيادة | المدار الذهبي لطب الأسنان" },
      {
        name: "description",
        content:
          "قصة المدار الذهبي لطب الأسنان: فريق متخصص، خطة علاجية واضحة، وتجربة تبدأ من فهم احتياجك وتنتهي بابتسامة تثق بها.",
      },
      { property: "og:title", content: "عن العيادة | المدار الذهبي لطب الأسنان" },
      {
        property: "og:description",
        content: "طب الأسنان عندما تلتقي الدقة بالاهتمام — تعرّف على فلسفة المدار الذهبي.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="عن العيادة"
        title="طب الأسنان… عندما تلتقي الدقة بالاهتمام."
        body="نؤمن أن زيارة طبيب الأسنان لا يجب أن تكون تجربة مقلقة. لذلك صممنا في المدار الذهبي تجربة تبدأ بفهم احتياجك، مرورًا بخطة علاج واضحة، وصولًا إلى رعاية تضع راحتك في كل خطوة."
      />

      <section className="container-x py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={clinicRoom}
              alt="غرفة علاج داخل عيادة المدار الذهبي"
              loading="lazy"
              width={1408}
              height={1008}
              className="w-full rounded-lg border border-border object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="فلسفتنا"
              title="نبدأ من الإنصات، لا من الأدوات."
              body="كل خطة علاجية في المدار الذهبي تبدأ بجلسة تفهم فيها حالتك وأولوياتك. نوضح الخيارات، ونشرح الفروقات، ونترك القرار لك بعد صورة كاملة."
            />
            <ul className="mt-8 space-y-4">
              {[
                "خطة علاجية مكتوبة وواضحة قبل أي إجراء.",
                "بروتوكولات تعقيم صارمة في كل غرفة.",
                "فريق تنسيق مواعيد يتابع معك بعد الزيارة.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-8 text-muted-foreground">
                  <span className="mt-3 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <p className="text-3xl font-bold text-foreground sm:text-4xl">{stat.value}</p>
              <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
            </Reveal>
          ))}
        </div>
        <p className="container-x pb-8 text-xs text-muted-foreground">
          الأرقام أعلاه جزء من نموذج تجريبي لعلامة افتراضية ولا تمثل عيادة حقيقية.
        </p>
      </section>

      <section className="container-x py-20">
        <SectionHeading eyebrow="رحلة المريض" title="تجربة مختلفة تبدأ من أول لحظة." />
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {journey.map((step, index) => (
            <Reveal as="li" key={step.step} delay={index * 90} className="border-t border-border pt-6">
              <span className="text-sm font-bold tracking-[0.2em] text-gold">{step.step}</span>
              <h3 className="mt-4 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-8 text-muted-foreground">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x pb-24">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={heroClinic}
            alt="استقبال عيادة المدار الذهبي"
            loading="lazy"
            width={1600}
            height={1200}
            className="h-72 w-full object-cover sm:h-96"
          />
          <div className="absolute inset-0 bg-ink/70" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="max-w-xl text-lg leading-[2] text-background sm:text-xl">
              رعاية تبدأ بالاستماع، وتنتهي بابتسامة تثق بها.
            </p>
            <Link
              to="/booking"
              className="mt-8 rounded-md bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
            >
              احجز موعدك
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
