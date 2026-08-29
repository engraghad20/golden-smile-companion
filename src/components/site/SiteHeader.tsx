import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/site/Logo";
import { navLinks } from "@/data/clinic";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/80 bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-background",
      )}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="relative rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/booking"
            className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-ink-soft hover:shadow-[var(--shadow-soft)] sm:inline-flex"
          >
            احجز موعدك
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            className="inline-flex size-11 items-center justify-center rounded-md border border-border text-foreground lg:hidden"
          >
            {open ? <Menu className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-400 lg:hidden",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="التنقل للجوال" className="container-x flex flex-col py-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="border-b border-border/60 py-3.5 text-[0.95rem] text-muted-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 pb-4">
            <Link
              to="/booking"
              className="rounded-md bg-primary px-5 py-3.5 text-center text-sm font-semibold text-primary-foreground"
            >
              احجز موعدك
            </Link>
          </div>
        </nav>
      </div>

      <button
        type="button"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
        className={cn("fixed inset-0 -z-10", open ? "block lg:hidden" : "hidden")}
      >
        <span className="sr-only">إغلاق</span>
        <X className="hidden" />
      </button>
    </header>
  );
}
