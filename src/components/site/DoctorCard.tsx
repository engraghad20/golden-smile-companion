import { Link } from "@tanstack/react-router";

import type { Doctor } from "@/data/clinic";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="group flex h-full flex-col border border-border bg-card">
      <div className="aspect-4/5 overflow-hidden bg-secondary">
        <img
          src={doctor.image}
          alt={`صورة ${doctor.name}`}
          loading="lazy"
          width={800}
          height={1000}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{doctor.experience}</p>
        <h3 className="mt-3 text-lg font-bold text-foreground">{doctor.name}</h3>
        <p className="mt-1 text-sm text-gold">{doctor.specialty}</p>
        <p className="mt-4 flex-1 text-sm leading-8 text-muted-foreground">{doctor.bio}</p>
        <Link
          to="/booking"
          search={{ doctor: doctor.name }}
          className="mt-6 inline-flex justify-center border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          احجز موعدًا
        </Link>
      </div>
    </article>
  );
}
