"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type RangeSliderProps = {
  /** Visible label. */
  label: string;
  /** Current value (controlled). */
  value?: number;
  /** Starting value when uncontrolled. Defaults to the midpoint */
  defaultValue?: number;
  /** Called with the new value. */
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Formats the value for the bubble and the label, e.g. v => `$${v}`. */
  format?: (value: number) => string;
  className?: string;
};

/**
 * A slider built on a real range input (so keyboard, touch and screen readers just work), with a
 * filled track and a value bubble that pops up while you drag.
 */
export function RangeSlider({ label, value, defaultValue, onChange, min = 0, max = 100, step = 1, format = String, className }: RangeSliderProps) {
  const id = useId();
  const [inner, setInner] = useState(defaultValue ?? (min + max) / 2);
  const v = value ?? inner;
  const pct = ((v - min) / (max - min)) * 100;
  return (
    <div className={cn("w-full max-w-sm", className)}>
      <div className="mb-3 flex items-center justify-between text-sm">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        <span className="font-mono text-muted-foreground tabular-nums">{format(v)}</span>
      </div>
      <div className="group/range relative h-6">
        {/* track */}
        <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
        </div>
        {/* bubble */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-9 -translate-x-1/2 scale-75 rounded-lg bg-foreground px-2 py-1 font-mono text-xs text-background opacity-0 transition-[opacity,scale] duration-200 group-focus-within/range:scale-100 group-focus-within/range:opacity-100 group-hover/range:scale-100 group-hover/range:opacity-100"
          style={{ left: `calc(${pct}% + ${(0.5 - pct / 100) * 22}px)` }}
        >
          {format(v)}
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={v}
          aria-valuetext={format(v)}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (value === undefined) setInner(n);
            onChange?.(n);
          }}
          className={cn(
            "absolute inset-0 w-full cursor-pointer appearance-none bg-transparent outline-none",
            "[&::-webkit-slider-thumb]:size-[22px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-110",
            "[&::-moz-range-thumb]:size-[14px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-background",
            "focus-visible:[&::-webkit-slider-thumb]:ring-4 focus-visible:[&::-webkit-slider-thumb]:ring-primary/25",
          )}
        />
      </div>
    </div>
  );
}
