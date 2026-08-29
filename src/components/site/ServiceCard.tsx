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
    <article className="group relative flex h-full flex-col border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[var(--shadow-soft)]">
      <span
        className="absolute top-0 right-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full"
        aria-hidden="true"
      />
      <Icon className="size-6 text-gold" aria-hidden="true" strokeWidth={1.4} />
      <h3 className="mt-6 text-lg font-bold text-foreground">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-8 text-muted-foreground">{service.short}</p>
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-gold"
      >
        اكتشف الخدمة
        <ArrowLeft
          className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
