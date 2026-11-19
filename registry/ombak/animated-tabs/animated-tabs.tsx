"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TabItem = {
  /** Tab label. */
  label: ReactNode;
  /** Panel content shown when this tab is active. */
  content: ReactNode;
};

export type AnimatedTabsProps = {
  /** The tabs, in order. */
  tabs: TabItem[];
  /** Index of the tab that starts active. Default 0 */
  defaultIndex?: number;
  /** Called with the new index when the active tab changes. */
  onChange?: (index: number) => void;
  /** "pill" slides a filled pill; "underline" slides a line. Default "pill" */
  variant?: "pill" | "underline";
  className?: string;
};

/**
 * Tabs with an indicator that glides to the active tab, and panels that fade in.
 * Follows the WAI-ARIA tabs pattern: arrow keys, Home and End move between tabs.
 */
export function AnimatedTabs({ tabs, defaultIndex = 0, onChange, variant = "pill", className }: AnimatedTabsProps) {
  const [active, setActive] = useState(defaultIndex);
  const [rect, setRect] = useState({ left: 0, width: 0, ready: false });
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();

  const measure = () => {
    const el = tabRefs.current[active];
    if (el) setRect({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  };
  useLayoutEffect(measure, [active, tabs.length]);
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const select = (i: number) => {
    setActive(i);
    onChange?.(i);
    tabRefs.current[i]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const n = tabs.length;
    const next = { ArrowRight: (active + 1) % n, ArrowLeft: (active - 1 + n) % n, Home: 0, End: n - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
  };

  const pill = variant === "pill";
  return (
    <div className={cn("w-full", className)}>
      <div
        ref={listRef}
        role="tablist"
        onKeyDown={onKey}
        className={cn("relative inline-flex", pill ? "rounded-full bg-muted p-1" : "gap-1 border-b")}
      >
        <span
          aria-hidden
          className={cn(
            "absolute transition-[left,width] duration-300 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:transition-none",
            pill ? "inset-y-1 rounded-full bg-background shadow-sm" : "-bottom-px h-0.5 bg-primary",
            !rect.ready && "opacity-0",
          )}
          style={{ left: rect.left, width: rect.width }}
        />
        {tabs.map((t, i) => (
          <button
            key={i}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            className={cn(
              "relative z-10 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
              pill ? "rounded-full" : "rounded-t-md",
              active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="mt-5 outline-none [animation:ombak-tab-in_.35s_ease-out] motion-reduce:animate-none"
        >
          {t.content}
        </div>
      ))}
      <style>{`@keyframes ombak-tab-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
