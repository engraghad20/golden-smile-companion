import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";

import clinicRoom from "@/assets/clinic-room.jpg";
import heroClinic from "@/assets/hero-clinic.jpg";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { DoctorCard } from "@/components/site/DoctorCard";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { Testimonials } from "@/components/site/Testimonials";
import { TrustStrip } from "@/components/site/TrustStrip";
import { cases, doctors, faqs, journey, services, stats } from "@/data/clinic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "المدار الذهبي لطب الأسنان | ابتسامتك تبدأ من عناية تعرف الفرق" },
      {
        name: "description",
        content:
          "عيادة المدار الذهبي لطب الأسنان في الرياض: خبرة طبية متخصصة، تقنيات حديثة، ورعاية تضع راحتك أولًا. احجز موعدك أو تحدث مع المساعد الذكي.",
      },
      {
        property: "og:title",
        content: "المدار الذهبي لطب الأسنان | ابتسامتك تبدأ من عناية تعرف الفرق",
      },
      {
        property: "og:description",
        content: "خبرة طبية، تقنيات حديثة، ورعاية تبدأ بالاستماع. احجز موعدك اليوم.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-x grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          <div>
            <p className="eyebrow">GOLDEN ALMADAR · الرياض</p>
            <h1 className="mt-6 text-3xl leading-[1.5] font-bold text-balance text-foreground sm:text-4xl lg:text-[3.1rem] lg:leading-[1.4]">
              ابتسامتك… تبدأ من عناية تعرف الفرق.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-[2.1] text-muted-foreground sm:text-[1.0625rem]">
              في المدار الذهبي لطب الأسنان، نجمع بين الخبرة الطبية، التقنيات الحديثة، والعناية التي
              تضع راحتك في المقام الأول.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="inline-flex min-h-13 items-center rounded-md bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all hover:bg-ink-soft hover:shadow-[var(--shadow-soft)]"
              >
                احجز موعدك
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-13 items-center gap-2 rounded-md border border-border px-7 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                تواصل معنا
              </Link>
            </div>
            <p className="mt-10 flex items-center gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <span className="gold-rule" aria-hidden="true" />
              رعاية تبدأ بالاستماع، وتنتهي بابتسامة تثق بها.
            </p>
          </div>

          <div className="relative">
            <img
              src={heroClinic}
              alt="استقبال عيادة المدار الذهبي لطب الأسنان"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="w-full rounded-lg border border-border object-cover"
            />
            <div className="absolute -bottom-6 right-6 hidden max-w-[15rem] border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:block">
              <p className="text-2xl font-bold text-foreground">98%</p>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                رضا المرضى ضمن بيانات النموذج التجريبي للعيادة.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* About */}
      <section className="container-x py-20 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="عن العيادة"
              title="طب الأسنان… عندما تلتقي الدقة بالاهتمام."
              body="نؤمن أن زيارة طبيب الأسنان لا يجب أن تكون تجربة مقلقة. لذلك صممنا في المدار الذهبي تجربة تبدأ بفهم احتياجك، مرورًا بخطة علاج واضحة، وصولًا إلى رعاية تضع راحتك في كل خطوة."
            />
            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-2xl font-bold text-foreground">{stat.value}</span>
                    <span className="mt-2 block text-sm text-muted-foreground">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-gold"
            >
              تعرف على العيادة
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={120} className="overflow-hidden rounded-lg border border-border">
            <img
              src={clinicRoom}
              alt="غرفة علاج داخل عيادة المدار الذهبي"
              loading="lazy"
              width={1408}
              height={1008}
              className="w-full object-cover transition-transform duration-[900ms] hover:scale-[1.03]"
            />
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-border bg-secondary/40 py-20 lg:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="الخدمات" title="كل ما تحتاجه ابتسامتك… في مكان واحد." />
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-gold"
            >
              كل الخدمات
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 45} className="bg-card">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Assistant */}
      <section className="bg-ink py-20 text-background lg:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="مساعد المدار الذكي"
              tone="dark"
              title="معك للإجابة، والمساعدة، وحجز موعدك."
              body="مساعد رقمي تابع للعيادة يجيبك عن الخدمات وأوقات العمل، ويساعدك في تجهيز طلب حجز خلال دقيقة. لا يقدم تشخيصًا طبيًا، بل معلومات عامة ومساعدة في الحجز."
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="inline-flex min-h-13 items-center gap-2 rounded-md bg-gold px-7 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                احجز موعدك
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-13 items-center rounded-md border border-background/20 px-7 text-sm font-medium text-background transition-colors hover:border-gold hover:text-gold"
              >
                تواصل معنا
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120} className="rounded-xl border border-background/10 bg-background/[0.04] p-6">
            <div className="space-y-3 text-sm">
              <p className="w-fit rounded-xl rounded-bl-sm bg-background/10 px-4 py-3 leading-7">
                ابغا احجز
              </p>
              <p className="mr-auto w-fit rounded-xl rounded-br-sm bg-background px-4 py-3 leading-7 text-foreground">
                أكيد 🤍 يسعدني أساعدك بالحجز. ممكن أعرف اسمك الكامل؟
              </p>
              <p className="w-fit rounded-xl rounded-bl-sm bg-background/10 px-4 py-3 leading-7">
                سارة العتيبي
              </p>
              <p className="mr-auto w-fit rounded-xl rounded-br-sm bg-background px-4 py-3 leading-7 text-foreground">
                شكرًا لك. ما رقم الجوال للتواصل معك؟
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Doctors */}
      <section className="container-x py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="الفريق الطبي" title="أطباء تختارهم بثقة." />
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-gold"
          >
            كل الأطباء
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, index) => (
            <Reveal key={doctor.slug} delay={index * 60}>
              <DoctorCard doctor={doctor} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-border bg-card py-20">
        <div className="container-x">
          <SectionHeading eyebrow="رحلة المريض" title="تجربة مختلفة تبدأ من أول لحظة." />
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {journey.map((step, index) => (
              <Reveal as="li" key={step.step} delay={index * 90} className="border-t border-border pt-6">
                <span className="text-sm font-bold tracking-[0.2em] text-gold">{step.step}</span>
                <h3 className="mt-4 text-lg font-bold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Before & after */}
      <section className="container-x py-20 lg:py-28">
        <SectionHeading
          eyebrow="قبل وبعد"
          title="فرق تراه… بهدوء وبلا مبالغة."
          body="الصور المعروضة لأغراض العرض البصري ضمن النموذج التجريبي للموقع."
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
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-secondary/40 py-20">
        <div className="container-x">
          <SectionHeading eyebrow="آراء المرضى" title="ما قالوه عن التجربة." align="center" />
          <div className="mt-14">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="الأسئلة الشائعة"
            title="إجابات واضحة، بدون تعقيد."
            body="إذا لم تجد إجابتك، المساعد الذكي أو فريق العيادة جاهز لمساعدتك."
          />
          <div>
            <FaqAccordion items={faqs.slice(0, 4)} />
            <Link
              to="/faq"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-gold"
            >
              كل الأسئلة
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
