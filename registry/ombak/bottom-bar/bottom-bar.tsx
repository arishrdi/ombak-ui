"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BottomBarItem = {
  /** Label under the icon (and accessible name). */
  label: string;
  /** Icon element. */
  icon: ReactNode;
};

export type BottomBarProps = {
  /** The tabs. */
  items: BottomBarItem[];
  /** Active index (controlled). */
  value?: number;
  /** Active index when uncontrolled. Default 0 */
  defaultValue?: number;
  /** Called with the tapped index. */
  onChange?: (index: number) => void;
  className?: string;
};

/**
 * A mobile tab bar: the active icon hops up into a bubble and its label slides in.
 * Fixed-position is up to you; the bar itself is a plain nav with aria-current on the active tab.
 */
export function BottomBar({ items, value, defaultValue = 0, onChange, className }: BottomBarProps) {
  const [inner, setInner] = useState(defaultValue);
  const active = value ?? inner;
  return (
    <nav className={cn("flex w-full max-w-sm items-stretch justify-around rounded-2xl border bg-card px-2 py-2 shadow-lg", className)}>
      {items.map((it, i) => {
        const on = i === active;
        return (
          <button
            key={it.label}
            type="button"
            aria-current={on ? "page" : undefined}
            onClick={() => {
              if (value === undefined) setInner(i);
              onChange?.(i);
            }}
            className="group/tab relative flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          >
            <span
              className={cn(
                "grid size-10 place-items-center rounded-full transition-all duration-500 ease-[cubic-bezier(.3,1.6,.4,1)] [&>svg]:size-5 motion-reduce:transition-none",
                on ? "-translate-y-1 bg-primary text-primary-foreground shadow-md" : "text-muted-foreground group-hover/tab:text-foreground",
              )}
            >
              {it.icon}
            </span>
            <span
              className={cn(
                "text-[11px] font-medium transition-all duration-300",
                on ? "translate-y-0 text-foreground opacity-100" : "translate-y-1 text-muted-foreground opacity-70",
              )}
            >
              {it.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
