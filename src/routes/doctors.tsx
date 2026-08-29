import { createFileRoute } from "@tanstack/react-router";

import { DoctorCard } from "@/components/site/DoctorCard";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { doctors } from "@/data/clinic";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "أطباؤنا | المدار الذهبي لطب الأسنان" },
      {
        name: "description",
        content:
          "تعرّف على فريق المدار الذهبي: تخصصات في التجميل والزراعة، التقويم، أسنان الأطفال، وعلاج الجذور.",
      },
      { property: "og:title", content: "أطباؤنا | المدار الذهبي لطب الأسنان" },
      { property: "og:description", content: "فريق متخصص يرافقك من الاستشارة حتى ما بعد العلاج." },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="الفريق الطبي"
        title="فريق يرافقك في كل خطوة."
        body="تخصصات دقيقة تعمل معًا لتقديم خطة علاجية واحدة واضحة، مبنية على حالتك وأولوياتك."
      />

      <section className="container-x py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, index) => (
            <Reveal key={doctor.slug} delay={index * 70}>
              <DoctorCard doctor={doctor} />
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-xs text-muted-foreground">
          الأطباء المعروضون شخصيات افتراضية تم إنشاؤها لأغراض هذا النموذج التجريبي.
        </p>
      </section>
    </>
  );
}
