import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { testimonials } from "@/data/clinic";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const item = testimonials[index]!;

  const go = (direction: number) => setIndex((value) => (value + direction + total) % total);

  return (
    <div className="relative">
      <blockquote
        key={index}
        className="msg-in mx-auto max-w-3xl text-center text-lg leading-[2.2] text-balance text-foreground sm:text-xl"
      >
        <span className="text-gold" aria-hidden="true">
          ”
        </span>
        {item.quote}
      </blockquote>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        — {item.name} · {item.context}
      </p>

      <div className="mt-10 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="التجربة السابقة"
          className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
        <div className="flex gap-2" role="tablist" aria-label="تجارب المرضى">
          {testimonials.map((testimonial, dotIndex) => (
            <button
              key={testimonial.name}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`تجربة ${dotIndex + 1}`}
              onClick={() => setIndex(dotIndex)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                dotIndex === index ? "w-7 bg-gold" : "w-1.5 bg-border",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="التجربة التالية"
          className="inline-flex size-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
