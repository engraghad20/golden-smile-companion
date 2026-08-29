import { useRef, useState } from "react";

export function BeforeAfterSlider({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label: string;
}) {
  const [value, setValue] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-border select-none"
    >
      <img
        src={after}
        alt={`${label} — بعد`}
        loading="lazy"
        width={900}
        height={700}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${value}%` }}>
        <img
          src={before}
          alt={`${label} — قبل`}
          loading="lazy"
          width={900}
          height={700}
          className="absolute inset-y-0 right-0 h-full w-[100vw] max-w-none object-cover"
          style={{ width: containerRef.current?.clientWidth ?? "100%" }}
        />
      </div>

      <span className="absolute top-3 right-3 rounded-full bg-ink/80 px-3 py-1 text-[0.7rem] text-background">
        قبل
      </span>
      <span className="absolute top-3 left-3 rounded-full bg-gold/90 px-3 py-1 text-[0.7rem] font-semibold text-ink">
        بعد
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-background/90"
        style={{ right: `${value}%` }}
        aria-hidden="true"
      >
        <span className="absolute top-1/2 right-1/2 flex size-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-background text-[0.65rem] font-bold text-foreground shadow-[var(--shadow-soft)]">
          ↔
        </span>
      </div>

      <label className="sr-only" htmlFor={`ba-${label}`}>
        مقارنة قبل وبعد لـ {label}
      </label>
      <input
        id={`ba-${label}`}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        aria-valuetext={`${value}٪ من صورة ما قبل العلاج`}
      />
    </div>
  );
}
