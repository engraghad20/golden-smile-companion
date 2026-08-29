import { Link } from "@tanstack/react-router";
import {
  Anchor,
  ArrowLeft,
  Gem,
  Heart,
  Ruler,
  Shield,
  Sparkles,
  Stethoscope,
  Sun,
  type LucideIcon,
} from "lucide-react";

import type { Service } from "@/data/clinic";

const icons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  sun: Sun,
  shield: Shield,
  align: Ruler,
  anchor: Anchor,
  gem: Gem,
  stethoscope: Stethoscope,
  heart: Heart,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon] ?? Sparkles;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-7 transition-all duration-400 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[var(--shadow-lift)]">
      <span
        className="absolute inset-x-0 top-0 h-1 origin-right scale-x-0 bg-gradient-to-l from-teal to-gold transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />
      <span className="inline-flex size-13 items-center justify-center rounded-xl bg-teal-soft/70 text-primary transition-colors duration-400 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-6" aria-hidden="true" strokeWidth={1.6} />
      </span>
      <h3 className="mt-6 text-lg font-bold text-foreground">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-8 text-muted-foreground">{service.short}</p>
      <span className="mt-5 inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-[0.72rem] font-semibold text-muted-foreground">
        المدة: {service.duration}
      </span>
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors group-hover:text-teal"
      >
        تفاصيل الخدمة
        <ArrowLeft
          className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
