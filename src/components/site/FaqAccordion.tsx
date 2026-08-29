import { Plus } from "lucide-react";
import { useState } from "react";

import { faqs } from "@/data/clinic";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items = faqs }: { items?: typeof faqs }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                aria-controls={`faq-panel-${index}`}
                className="flex w-full items-center justify-between gap-4 py-6 text-right"
              >
                <span className="text-[0.98rem] font-semibold text-foreground">{item.q}</span>
                <Plus
                  className={cn(
                    "size-5 shrink-0 text-gold transition-transform duration-300",
                    open && "rotate-45",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              className={cn(
                "grid transition-all duration-400",
                open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <p className="overflow-hidden text-sm leading-8 text-muted-foreground">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
