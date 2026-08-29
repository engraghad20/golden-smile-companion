import { Link } from "@tanstack/react-router";
import { CalendarCheck, MapPin, Phone, Stethoscope, type LucideIcon } from "lucide-react";

import { clinic } from "@/data/clinic";

type Item = {
  label: string;
  note: string;
  Icon: LucideIcon;
  to?: "/booking" | "/services" | "/contact";
  href?: string;
};

const items: Item[] = [
  { label: "حجز موعد", note: "خلال دقيقة واحدة", Icon: CalendarCheck, to: "/booking" },
  { label: "تخصصاتنا", note: "٨ تخصصات دقيقة", Icon: Stethoscope, to: "/services" },
  { label: "اتصل بنا", note: clinic.phone, Icon: Phone, href: `tel:${clinic.phoneDial}` },
  { label: "موقع العيادة", note: clinic.address, Icon: MapPin, to: "/contact" },
];

export function QuickAccess() {
  return (
    <section aria-label="وصول سريع" className="container-x -mt-12 relative z-10">
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-[var(--shadow-lift)] sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ label, note, Icon, to, href }) => {
          const content = (
            <>
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-soft/70 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" strokeWidth={1.7} />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.95rem] font-bold text-foreground">{label}</span>
                <span className="mt-1 block truncate text-xs text-muted-foreground">{note}</span>
              </span>
            </>
          );

          const className =
            "group flex h-full items-center gap-4 bg-card p-5 transition-colors hover:bg-secondary/60";

          return (
            <li key={label}>
              {to ? (
                <Link to={to} className={className}>
                  {content}
                </Link>
              ) : (
                <a href={href} className={className} dir="auto">
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
