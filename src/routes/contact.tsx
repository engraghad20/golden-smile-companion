import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { clinic } from "@/data/clinic";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | المدار الذهبي لطب الأسنان" },
      {
        name: "description",
        content:
          "الرياض، المملكة العربية السعودية — هاتف، واتساب، وبريد العيادة، مع أوقات العمل من السبت إلى الخميس.",
      },
      { property: "og:title", content: "تواصل معنا | المدار الذهبي لطب الأسنان" },
      { property: "og:description", content: "نحن هنا للإجابة على أسئلتك وحجز موعدك." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="تواصل"
        title="نحن هنا… في كل سؤال قبل الموعد وبعده."
        body="اختر الطريقة الأنسب لك للتواصل مع فريق المدار الذهبي خلال أوقات العمل."
      />

      <section className="container-x grid gap-10 py-16 lg:grid-cols-2">
        <Reveal className="space-y-8">
          <div className="border border-border bg-card p-7">
            <h2 className="text-base font-bold text-foreground">{clinic.nameAr}</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex gap-4">
                <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span className="text-muted-foreground">{clinic.address}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`tel:${clinic.phoneDial}`}
                  dir="ltr"
                  className="text-start text-foreground transition-colors hover:text-gold"
                >
                  {clinic.phone}
                </a>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`mailto:${clinic.email}`}
                  className="text-foreground transition-colors hover:text-gold"
                >
                  {clinic.email}
                </a>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <div className="space-y-1 text-muted-foreground">
                  {clinic.hours.map((entry) => (
                    <p key={entry.days}>
                      <span className="text-foreground">{entry.days}:</span> {entry.time}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <a
              href={`https://wa.me/${clinic.whatsapp}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              واتساب
            </a>
            <a
              href={`tel:${clinic.phoneDial}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Phone className="size-4" aria-hidden="true" />
              اتصال
            </a>
            <a
              href="https://maps.google.com/?q=Riyadh"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Navigation className="size-4" aria-hidden="true" />
              الاتجاهات
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div
            className="flex h-full min-h-80 flex-col items-center justify-center border border-border bg-secondary p-10 text-center"
            role="img"
            aria-label="عنصر بصري يمثل موقع العيادة"
          >
            <div
              className="grid w-full max-w-sm grid-cols-6 gap-1 opacity-40"
              aria-hidden="true"
            >
              {Array.from({ length: 36 }).map((_, index) => (
                <span
                  key={index}
                  className="aspect-square rounded-[2px] bg-border"
                  style={{ opacity: (index % 5) / 6 + 0.25 }}
                />
              ))}
            </div>
            <p className="mt-8 text-sm font-semibold text-foreground">الرياض — المملكة العربية السعودية</p>
            <p className="mt-2 max-w-xs text-xs leading-7 text-muted-foreground">
              الموقع الجغرافي غير مرتبط بمكان حقيقي، لأن العيادة علامة افتراضية ضمن نموذج تجريبي.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
