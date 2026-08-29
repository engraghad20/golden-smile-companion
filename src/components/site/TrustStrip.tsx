import { Award, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { trustPoints } from "@/data/clinic";

const icons = [Stethoscope, HeartPulse, ShieldCheck, Award];

export function TrustStrip() {
  return (
    <section aria-label="مؤشرات الثقة" className="border-y border-border bg-secondary/50">
      <div className="container-x grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((point, index) => {
          const Icon = icons[index] ?? ShieldCheck;
          return (
            <Reveal
              key={point.title}
              delay={index * 70}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-teal-soft/70 text-primary">
                <Icon className="size-5" aria-hidden="true" strokeWidth={1.7} />
              </span>
              <div>
                <h3 className="text-[0.95rem] font-bold text-foreground">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-muted-foreground">{point.note}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
