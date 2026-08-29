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
      <section className="relative isolate overflow-hidden bg-ink">
        <img
          src={heroClinic}
          alt="استقبال عيادة المدار الذهبي لطب الأسنان"
          width={1600}
          height={1200}
          fetchPriority="high"
          className="absolute inset-0 -z-10 size-full object-cover opacity-40"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-l from-ink via-ink/90 to-ink/55"
          aria-hidden="true"
        />
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div className="text-background">
            <p className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-4 py-1.5 text-xs font-bold tracking-[0.12em] text-gold backdrop-blur-sm">
              GOLDEN ALMADAR · الرياض
            </p>
            <h1 className="mt-7 max-w-2xl text-3xl leading-[1.45] font-bold text-balance sm:text-4xl lg:text-[3.15rem] lg:leading-[1.35]">
              رعاية طبية متكاملة لأسنانك… بمعايير احترافية.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-[2.1] text-background/80 sm:text-[1.0625rem]">
              فريق استشاري متخصص، تقنيات تشخيص حديثة، وبروتوكولات تعقيم صارمة — لتحصل على تجربة علاج
              واضحة ومريحة من أول زيارة.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/booking"
                className="inline-flex min-h-13 items-center gap-2 rounded-lg bg-gold px-7 text-sm font-bold text-ink transition-all hover:bg-gold-soft"
              >
                <CalendarCheck className="size-4" aria-hidden="true" />
                احجز موعدك الآن
              </Link>
              <Link
                to="/services"
                className="inline-flex min-h-13 items-center gap-2 rounded-lg border border-background/25 bg-background/5 px-7 text-sm font-semibold text-background backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
              >
                تعرّف على التخصصات
              </Link>
            </div>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 border-t border-background/15 pt-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-xl font-bold text-gold sm:text-2xl">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-xs leading-6 text-background/70">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-2xl border border-background/15 bg-background/[0.07] p-7 backdrop-blur-md">
              <p className="text-sm font-bold text-gold">أوقات العمل</p>
              <ul className="mt-5 space-y-4 text-sm text-background/85">
                {clinic.hours.map((slot) => (
                  <li
                    key={slot.days}
                    className="flex items-center justify-between gap-4 border-b border-background/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-semibold">{slot.days}</span>
                    <span className="text-background/70">{slot.time}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`tel:${clinic.phoneDial}`}
                className="mt-7 flex items-center justify-center gap-2 rounded-lg bg-background/10 py-3.5 text-sm font-bold text-background transition-colors hover:bg-background/20"
              >
                <Phone className="size-4 text-gold" aria-hidden="true" />
                <span dir="ltr">{clinic.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <QuickAccess />

      <div className="mt-16">
        <TrustStrip />
      </div>


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
