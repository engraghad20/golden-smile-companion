import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "start",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        tone === "dark" ? "text-background" : "text-foreground",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="text-2xl leading-[1.45] font-bold text-balance sm:text-3xl md:text-[2.35rem]">
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            "mt-5 text-base leading-[2] sm:text-[1.0625rem]",
            tone === "dark" ? "text-background/70" : "text-muted-foreground",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
