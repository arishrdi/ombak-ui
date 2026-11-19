"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export type SegmentedControlProps = {
  /** The options. */
  options: string[];
  /** Selected option (controlled). */
  value?: string;
  /** Selected option when uncontrolled. Defaults to the first option */
  defaultValue?: string;
  /** Called with the newly selected option. */
  onChange?: (value: string) => void;
  /** Accessible name for the group. */
  label: string;
  className?: string;
};

/**
 * An iOS-style segmented control: a thumb slides under the selected option.
 * A real radio group for assistive tech; arrow keys move the selection.
 */
export function SegmentedControl({ options, value, defaultValue, onChange, label, className }: SegmentedControlProps) {
  const [inner, setInner] = useState(defaultValue ?? options[0]);
  const selected = value ?? inner;
  const idx = Math.max(0, options.indexOf(selected));
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [thumb, setThumb] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = refs.current[idx];
    if (el) setThumb({ left: el.offsetLeft, width: el.offsetWidth });
  }, [idx, options.length]);

  const choose = (i: number) => {
    const v = options[i];
    if (value === undefined) setInner(v);
    onChange?.(v);
    refs.current[i]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const n = options.length;
    const next = { ArrowRight: (idx + 1) % n, ArrowDown: (idx + 1) % n, ArrowLeft: (idx - 1 + n) % n, ArrowUp: (idx - 1 + n) % n }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    choose(next);
  };

  return (
    <div role="radiogroup" aria-label={label} onKeyDown={onKey} className={cn("relative inline-flex rounded-xl bg-muted p-1", className)}>
      <span
        aria-hidden
        className="absolute inset-y-1 rounded-lg bg-background shadow-sm transition-[left,width] duration-300 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:transition-none"
        style={{ left: thumb.left, width: thumb.width }}
      />
      {options.map((o, i) => (
        <button
          key={o}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={i === idx}
          tabIndex={i === idx ? 0 : -1}
          onClick={() => choose(i)}
          className={cn(
            "relative z-10 min-w-20 rounded-lg px-4 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
            i === idx ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
