import { createFileRoute } from "@tanstack/react-router";

import { BookingForm } from "@/components/site/BookingForm";
import { PageHeader } from "@/components/site/PageHeader";
import { clinic } from "@/data/clinic";

type BookingSearch = { doctor?: string; service?: string };

export const Route = createFileRoute("/booking")({
  validateSearch: (search: Record<string, unknown>): BookingSearch => ({
    ...(typeof search["doctor"] === "string" ? { doctor: search["doctor"] } : {}),
    ...(typeof search["service"] === "string" ? { service: search["service"] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "احجز موعدك | المدار الذهبي لطب الأسنان" },
      {
        name: "description",
        content:
          "اختر الخدمة والطبيب والوقت المناسب، وأرسل طلب حجزك لفريق المدار الذهبي ليتواصل معك للتأكيد.",
      },
      { property: "og:title", content: "احجز موعدك | المدار الذهبي لطب الأسنان" },
      { property: "og:description", content: "طلب حجز بسيط وواضح، وفريق يتابع معك للتأكيد." },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const search = Route.useSearch();

  return (
    <>
      <PageHeader
        eyebrow="الحجز"
        title="احجز موعدك بكل سهولة."
        body="اختر الخدمة والوقت المناسب، وسنتولى الباقي."
      />

      <section className="container-x grid gap-10 py-16 lg:grid-cols-[2fr_1fr]">
        <BookingForm
          {...(search.doctor ? { defaultDoctor: search.doctor } : {})}
          {...(search.service ? { defaultService: search.service } : {})}
        />

        <aside className="h-fit border border-border bg-secondary/50 p-7">
          <h2 className="text-base font-bold text-foreground">قبل أن ترسل الطلب</h2>
          <ul className="mt-5 space-y-4 text-sm leading-8 text-muted-foreground">
            <li>الطلب يصل لفريق العيادة، ثم يتم التواصل معك لتأكيد الموعد النهائي.</li>
            <li>يمكنك تعديل أو إلغاء الطلب بالتواصل معنا قبل الموعد بوقت كافٍ.</li>
            <li>الجمعة يوم إغلاق، ولا تتوفر مواعيد فيه.</li>
          </ul>
          <div className="mt-7 border-t border-border pt-6 text-sm">
            <p className="font-semibold text-foreground">تفضل التواصل المباشر؟</p>
            <a
              href={`tel:${clinic.phoneDial}`}
              dir="ltr"
              className="mt-3 block text-start text-foreground transition-colors hover:text-gold"
            >
              {clinic.phone}
            </a>
            <a
              href={`https://wa.me/${clinic.whatsapp}`}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-2 inline-block text-gold hover:underline"
            >
              محادثة واتساب
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
