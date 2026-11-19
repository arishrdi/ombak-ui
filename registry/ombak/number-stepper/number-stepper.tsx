"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type NumberStepperProps = {
  /** Visible label. */
  label: string;
  /** Value (controlled). */
  value?: number;
  /** Starting value when uncontrolled. Default 1 */
  defaultValue?: number;
  /** Called with the new value. */
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

/**
 * A quantity stepper: − and + buttons with a number that rolls up or down as it changes.
 * The value is a real spinbutton, so arrow keys, Home and End work and it's announced properly.
 */
export function NumberStepper({ label, value, defaultValue = 1, onChange, min = 0, max = 99, step = 1, className }: NumberStepperProps) {
  const id = useId();
  const [inner, setInner] = useState(defaultValue);
  const [dir, setDir] = useState<1 | -1>(1);
  const v = value ?? inner;
  const set = (n: number) => {
    const next = Math.max(min, Math.min(max, n));
    if (next === v) return;
    setDir(next > v ? 1 : -1);
    if (value === undefined) setInner(next);
    onChange?.(next);
  };
  const btn = "grid size-10 place-items-center rounded-lg text-lg outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/60 disabled:opacity-30 disabled:hover:bg-transparent";
  return (
    <div className={cn("inline-flex flex-col gap-1.5", className)}>
      <span id={`${id}-label`} className="text-sm font-medium">
        {label}
      </span>
      <div className="inline-flex items-center gap-1 rounded-xl border bg-background p-1">
        <button type="button" aria-label="Decrease" disabled={v <= min} onClick={() => set(v - step)} className={btn}>
          −
        </button>
        <div
          role="spinbutton"
          tabIndex={0}
          aria-labelledby={`${id}-label`}
          aria-valuenow={v}
          aria-valuemin={min}
          aria-valuemax={max}
          onKeyDown={(e) => {
            const map: Record<string, number> = { ArrowUp: v + step, ArrowRight: v + step, ArrowDown: v - step, ArrowLeft: v - step, Home: min, End: max };
            if (e.key in map) {
              e.preventDefault();
              set(map[e.key]);
            }
          }}
          className="relative h-10 w-12 overflow-hidden rounded-md text-center font-mono text-lg leading-10 font-semibold tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <style>{`@keyframes ombak-step-up{from{transform:translateY(100%);opacity:0}}@keyframes ombak-step-down{from{transform:translateY(-100%);opacity:0}}`}</style>
          <span
            key={v}
            className="block motion-reduce:!animate-none"
            style={{ animation: `${dir === 1 ? "ombak-step-up" : "ombak-step-down"} .28s cubic-bezier(.2,.8,.2,1)` }}
          >
            {v}
          </span>
        </div>
        <button type="button" aria-label="Increase" disabled={v >= max} onClick={() => set(v + step)} className={btn}>
          +
        </button>
      </div>
    </div>
  );
}
