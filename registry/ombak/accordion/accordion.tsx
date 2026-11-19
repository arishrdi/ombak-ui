"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  /** The question or heading. */
  title: ReactNode;
  /** The answer or panel content. */
  content: ReactNode;
};

export type AccordionProps = {
  /** The items. */
  items: AccordionItem[];
  /** Allow several items open at once. Default false */
  multiple?: boolean;
  /** Indexes open at first. Default [] */
  defaultOpen?: number[];
  className?: string;
};

/**
 * An accordion whose panels open and close with a smooth height animation (CSS grid rows, no
 * measuring) and a rotating plus sign. Buttons expose aria-expanded and control their panels.
 */
export function Accordion({ items, multiple = false, defaultOpen = [], className }: AccordionProps) {
  const [open, setOpen] = useState<number[]>(defaultOpen);
  const id = useId();
  const toggle = (i: number) =>
    setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : multiple ? [...o, i] : [i]));

  return (
    <div className={cn("w-full divide-y rounded-2xl border bg-card", className)}>
      {items.map((it, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={i}>
            <h3>
              <button
                type="button"
                id={`${id}-h-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p-${i}`}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium outline-none hover:bg-muted/40 focus-visible:bg-muted/60"
              >
                {it.title}
                <span aria-hidden className="relative size-4 shrink-0">
                  <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 rounded-full bg-current" />
                  <span
                    className={cn(
                      "absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 rounded-full bg-current transition-transform duration-300",
                      isOpen ? "rotate-0" : "rotate-90",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-p-${i}`}
              role="region"
              aria-labelledby={`${id}-h-${i}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:transition-none",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{it.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
