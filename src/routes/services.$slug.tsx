import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";

import clinicRoom from "@/assets/clinic-room.jpg";
import { services } from "@/data/clinic";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((item) => item.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "الخدمة غير متاحة | المدار الذهبي" }, { name: "robots", content: "noindex" }],
      };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} | المدار الذهبي لطب الأسنان` },
        { name: "description", content: service.short },
        { property: "og:title", content: `${service.title} | المدار الذهبي لطب الأسنان` },
        { property: "og:description", content: service.short },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();

  return (
    <>
      <section className="border-b border-border bg-secondary/50">
        <div className="container-x py-16 sm:py-20">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
            كل الخدمات
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">{service.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-[2] text-muted-foreground">{service.long}</p>
          <p className="mt-6 inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm text-foreground">
            <Clock className="size-4 text-gold" aria-hidden="true" />
            مدة الجلسة التقريبية: {service.duration}
          </p>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-foreground">كيف تسير الجلسة؟</h2>
          <ol className="mt-8 space-y-6">
            {service.details.map((detail, index) => (
              <li key={detail} className="flex gap-5 border-b border-border pb-6 last:border-0">
                <span className="text-sm font-bold text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-8 text-muted-foreground">{detail}</p>
              </li>
            ))}
          </ol>
          <Link
            to="/booking"
            search={{ service: service.title }}
            className="mt-10 inline-flex rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-ink-soft"
          >
            احجز موعدًا لهذه الخدمة
          </Link>
        </div>
        <img
          src={clinicRoom}
          alt="غرفة علاج مجهزة داخل عيادة المدار الذهبي"
          loading="lazy"
          width={1408}
          height={1008}
          className="h-full w-full rounded-lg border border-border object-cover"
        />
      </section>
    </>
  );
}
