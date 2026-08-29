import { Link, useRouterState } from "@tanstack/react-router";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/site/Logo";
import { clinic, navLinks } from "@/data/clinic";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Main bar */}
      <div
        className={cn(
          "border-b bg-background/95 backdrop-blur-md transition-shadow duration-300",
          scrolled ? "border-border shadow-[var(--shadow-card)]" : "border-border/70",
        )}
      >
        <div className="container-x flex h-18 items-center justify-between gap-6 lg:h-20">
          <Logo />

          <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="relative rounded-lg px-3.5 py-2 text-[0.9rem] font-medium text-muted-foreground transition-colors after:absolute after:inset-x-3.5 after:bottom-0.5 after:h-0.5 after:origin-right after:scale-x-0 after:rounded-full after:bg-teal after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100"
                activeProps={{
                  className: "text-primary font-bold after:scale-x-100",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${clinic.phoneDial}`}
              aria-label="اتصل بالعيادة"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-primary transition-colors hover:border-teal hover:bg-teal-soft/60 lg:hidden"
            >
              <Phone className="size-4.5" aria-hidden="true" />
            </a>
            <Link
              to="/booking"
              className="hidden items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-card)] transition-all hover:bg-teal-deep sm:inline-flex"
            >
              <CalendarCheck className="size-4" aria-hidden="true" />
              احجز موعدك
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-b border-border bg-background transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="التنقل للجوال" className="container-x flex flex-col py-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="border-b border-border/60 py-3.5 text-[0.95rem] text-muted-foreground"
              activeProps={{ className: "text-primary font-bold" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 py-4">
            <Link
              to="/booking"
              className="rounded-lg bg-primary px-5 py-3.5 text-center text-sm font-bold text-primary-foreground"
            >
              احجز موعدك
            </Link>
            <a
              href={`https://wa.me/${clinic.whatsapp}`}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-border px-5 py-3.5 text-center text-sm font-medium text-foreground"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
