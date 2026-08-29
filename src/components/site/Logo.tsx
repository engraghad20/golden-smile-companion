import { Link } from "@tanstack/react-router";

import logoMark from "@/assets/logo-mark.png";
import { clinic } from "@/data/clinic";
import { cn } from "@/lib/utils";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link
      to="/"
      className="group flex items-center gap-3"
      aria-label={`${clinic.shortNameAr} — الصفحة الرئيسية`}
    >
      <img
        src={logoMark}
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 transition-transform duration-500 group-hover:rotate-6"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-lg font-bold tracking-tight",
            tone === "dark" ? "text-background" : "text-foreground",
          )}
        >
          {clinic.shortNameAr}
        </span>
        <span
          className={cn(
            "mt-1.5 text-[0.7rem] tracking-[0.2em]",
            tone === "dark" ? "text-background/60" : "text-muted-foreground",
          )}
        >
          لـطب الأسنان
        </span>
      </span>
    </Link>
  );
}
