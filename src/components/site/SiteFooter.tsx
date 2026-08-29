import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Send, Twitter } from "lucide-react";

import logoMark from "@/assets/logo-mark.png";
import { clinic } from "@/data/clinic";

const footerLinks = [
  { to: "/services", label: "الخدمات" },
  { to: "/doctors", label: "الأطباء" },
  { to: "/booking", label: "احجز موعد" },
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
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
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
            <p className="mt-2 text-[0.8rem] tracking-[0.25em] text-gold/80">{clinic.nameEn}</p>
          </div>

          <nav aria-label="روابط التذييل">
            <h2 className="text-sm font-semibold text-background">روابط سريعة</h2>
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

          <div>
            <h2 className="text-sm font-semibold text-background">تواصل</h2>
            <ul className="mt-5 space-y-3 text-sm text-background/70">
              <li>{clinic.address}</li>
              <li dir="ltr" className="text-start">
                {clinic.phone}
              </li>
              <li>{clinic.email}</li>
            </ul>
            <ul className="mt-6 flex gap-3">
              {socials.map(({ label, Icon }) => (
                <li key={label}>
                  <a
                    href={`https://wa.me/${clinic.whatsapp}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="inline-flex size-11 items-center justify-center rounded-md border border-background/15 text-background/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-background/10 pt-6">
          <p className="text-xs leading-7 text-background/45">{clinic.disclaimer}</p>
          <p className="mt-2 text-xs text-background/45">
            © 2026 {clinic.nameAr} — نموذج تجريبي لعرض تجربة رقمية.
          </p>
        </div>
      </div>
    </footer>
  );
}
