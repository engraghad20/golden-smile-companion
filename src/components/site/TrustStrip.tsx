import { Reveal } from "@/components/site/Reveal";
import { trustPoints } from "@/data/clinic";

export function TrustStrip() {
  return (
    <section aria-label="مؤشرات الثقة" className="border-y border-border bg-card">
      <div className="container-x grid gap-px sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((point, index) => (
          <Reveal
            key={point.title}
            delay={index * 80}
            className="py-8 sm:px-6 lg:border-l lg:border-border lg:last:border-l-0"
          >
            <span className="gold-rule" aria-hidden="true" />
            <h3 className="mt-4 text-[0.95rem] font-semibold text-foreground">{point.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{point.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
