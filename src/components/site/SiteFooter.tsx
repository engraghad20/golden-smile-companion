import { Link } from "@tanstack/react-router";
import { Clock, Instagram, Mail, MapPin, MessageCircle, Phone, Send, Twitter } from "lucide-react";

import logoMark from "@/assets/logo-mark.png";
import { clinic, services } from "@/data/clinic";

const footerLinks = [
  { to: "/about", label: "عن العيادة" },
  { to: "/services", label: "الخدمات" },
  { to: "/doctors", label: "الفريق الطبي" },
  { to: "/experience", label: "تجارب المرضى" },
  { to: "/faq", label: "الأسئلة الشائعة" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

const socials = [
  { label: "إنستغرام", Icon: Instagram },
  { label: "منصة إكس", Icon: Twitter },
  { label: "سناب شات", Icon: Send },
  { label: "واتساب", Icon: MessageCircle },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-background">
      <div className="border-b border-background/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-lg font-bold text-background sm:text-xl">
            بحاجة إلى موعد؟ فريقنا جاهز لاستقبالك.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/booking"
              className="rounded-lg bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-soft"
            >
              احجز موعدك
            </Link>
            <a
              href={`tel:${clinic.phoneDial}`}
              className="rounded-lg border border-background/25 px-6 py-3 text-sm font-semibold text-background transition-colors hover:border-gold hover:text-gold"
            >
              اتصل بنا
            </a>
          </div>
        </div>
      </div>

      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={logoMark} alt="" width={44} height={44} loading="lazy" className="size-11" />
              <div>
                <p className="text-lg font-bold">{clinic.shortNameAr}</p>
                <p className="mt-1 text-[0.7rem] tracking-[0.2em] text-background/55">
                  لـطب الأسنان
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-8 text-background/70">{clinic.tagline}</p>
            <p className="mt-3 text-[0.78rem] tracking-[0.22em] text-gold/85">{clinic.nameEn}</p>
            <ul className="mt-6 flex gap-3">
              {socials.map(({ label, Icon }) => (
                <li key={label}>
                  <a
                    href={`https://wa.me/${clinic.whatsapp}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="inline-flex size-11 items-center justify-center rounded-lg border border-background/15 text-background/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="روابط التذييل">
            <h2 className="text-sm font-bold text-background">روابط سريعة</h2>
            <ul className="mt-5 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-background/70 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="التخصصات">
            <h2 className="text-sm font-bold text-background">التخصصات</h2>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="text-sm text-background/70 transition-colors hover:text-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold text-background">معلومات التواصل</h2>
            <ul className="mt-5 space-y-4 text-sm text-background/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {clinic.address}
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span dir="ltr">{clinic.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {clinic.email}
              </li>
              {clinic.hours.map((slot) => (
                <li key={slot.days} className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    {slot.days} — {slot.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-background/10 pt-6">
          <p className="text-xs leading-7 text-background/45">{clinic.disclaimer}</p>
          <p className="mt-2 text-xs text-background/45">
            © 2026 {clinic.nameAr} — جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
