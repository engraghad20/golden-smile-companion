import { Link } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";

import type { Doctor } from "@/data/clinic";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-4/5 overflow-hidden bg-secondary">
        <img
          src={doctor.image}
          alt={`صورة ${doctor.name}`}
          loading="lazy"
          width={800}
          height={1000}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <span className="absolute top-4 right-4 rounded-full bg-background/90 px-3 py-1 text-[0.72rem] font-bold text-primary backdrop-blur-sm">
          {doctor.experience}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-foreground">{doctor.name}</h3>
        <p className="mt-1.5 text-sm font-semibold text-teal">{doctor.specialty}</p>
        <p className="mt-4 flex-1 text-sm leading-8 text-muted-foreground">{doctor.bio}</p>
        <Link
          to="/booking"
          search={{ doctor: doctor.name }}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <CalendarCheck className="size-4" aria-hidden="true" />
          احجز مع الطبيب
        </Link>
      </div>
    </article>
  );
}
