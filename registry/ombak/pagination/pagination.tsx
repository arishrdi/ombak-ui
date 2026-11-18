"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type PaginationProps = {
  /** Total number of pages. */
  total: number;
  /** Current page, 1-based (controlled). */
  page?: number;
  /** Starting page when uncontrolled. Default 1 */
  defaultPage?: number;
  /** Called with the new page. */
  onChange?: (page: number) => void;
  /** Pages shown on each side of the current one before ellipses. Default 1 */
  siblings?: number;
  className?: string;
};

type Slot = number | "…";

function slots(total: number, page: number, siblings: number): Slot[] {
  const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
  if (total <= 5 + siblings * 2) return range(1, total);
  const left = Math.max(2, page - siblings);
  const right = Math.min(total - 1, page + siblings);
  return [1, ...(left > 2 ? ["…" as const] : []), ...range(left, right), ...(right < total - 1 ? ["…" as const] : []), total];
}

/**
 * Pagination with a bubble that glides to the current page, smart ellipses for long ranges, and
 * previous/next buttons. Marks the current page with aria-current="page".
 */
export function Pagination({ total, page, defaultPage = 1, onChange, siblings = 1, className }: PaginationProps) {
  const [inner, setInner] = useState(defaultPage);
  const current = page ?? inner;
  const refs = useRef(new Map<number, HTMLButtonElement>());
  const [bubble, setBubble] = useState({ left: 0, width: 0 });

  const go = (p: number) => {
    const next = Math.max(1, Math.min(total, p));
    if (page === undefined) setInner(next);
    onChange?.(next);
  };

  const list = slots(total, current, siblings);
  useLayoutEffect(() => {
    const el = refs.current.get(current);
    if (el) setBubble({ left: el.offsetLeft, width: el.offsetWidth });
  }, [current, total, list.join()]);

  const btn = "grid h-9 min-w-9 place-items-center rounded-full px-2 text-sm font-medium tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring/60";
  return (
    <nav aria-label="Pagination" className={cn("inline-flex items-center gap-1", className)}>
      <button type="button" aria-label="Previous page" disabled={current === 1} onClick={() => go(current - 1)} className={cn(btn, "text-muted-foreground hover:bg-muted disabled:opacity-40")}>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
      </button>
      <span className="relative inline-flex items-center gap-1">
        <span
          aria-hidden
          className="absolute inset-y-0 rounded-full bg-primary transition-all duration-300 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:transition-none"
          style={{ left: bubble.left, width: bubble.width }}
        />
        {list.map((s, i) =>
          s === "…" ? (
            <span key={`e${i}`} aria-hidden className="grid h-9 min-w-6 place-items-center text-sm text-muted-foreground">
              …
            </span>
          ) : (
            <button
              key={s}
              ref={(el) => {
                if (el) refs.current.set(s, el);
                else refs.current.delete(s);
              }}
              type="button"
              aria-label={`Page ${s}`}
              aria-current={s === current ? "page" : undefined}
              onClick={() => go(s)}
              className={cn(btn, "relative z-10 transition-colors", s === current ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
            >
              {s}
            </button>
          ),
        )}
      </span>
      <button type="button" aria-label="Next page" disabled={current === total} onClick={() => go(current + 1)} className={cn(btn, "text-muted-foreground hover:bg-muted disabled:opacity-40")}>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
      </button>
    </nav>
  );
}
