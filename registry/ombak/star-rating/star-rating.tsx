"use client";

import { useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export type StarRatingProps = {
  /** Accessible name for the group, e.g. "Rate this product". */
  label: string;
  /** Rating (controlled). */
  value?: number;
  /** Starting rating when uncontrolled. Default 0 */
  defaultValue?: number;
  /** Called with the new rating. */
  onChange?: (value: number) => void;
  /** Number of stars. Default 5 */
  max?: number;
  /** Star size in px. Default 28 */
  size?: number;
  /** Star color. Default "#fbbf24" */
  color?: string;
  /** Show the rating but don't allow changes. Default false */
  readOnly?: boolean;
  className?: string;
};

const STAR = "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z";

/**
 * A star rating: hovering previews the score, choosing one makes the star pop. It's a radio group,
 * so arrow keys change the rating and screen readers hear "3 of 5 stars".
 */
export function StarRating({ label, value, defaultValue = 0, onChange, max = 5, size = 28, color = "#fbbf24", readOnly = false, className }: StarRatingProps) {
  const [inner, setInner] = useState(defaultValue);
  const [hover, setHover] = useState<number | null>(null);
  const [popped, setPopped] = useState<number | null>(null);
  const v = value ?? inner;
  const shown = hover ?? v;

  const choose = (n: number) => {
    if (readOnly) return;
    if (value === undefined) setInner(n);
    setPopped(n);
    onChange?.(n);
  };
  const onKey = (e: KeyboardEvent) => {
    if (readOnly) return;
    setHover(null); // keyboard wins over a stale hover preview
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      choose(Math.min(max, v + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      choose(Math.max(1, v - 1));
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-readonly={readOnly || undefined}
      onKeyDown={onKey}
      onPointerLeave={() => setHover(null)}
      className={cn("inline-flex gap-1", className)}
    >
      <style>{`@keyframes ombak-star-pop{40%{transform:scale(1.35) rotate(-8deg)}}`}</style>
      {Array.from({ length: max }, (_, k) => {
        const n = k + 1;
        const filled = n <= shown;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={v === n}
            aria-label={`${n} of ${max} stars`}
            tabIndex={readOnly ? -1 : (v || 1) === n ? 0 : -1}
            disabled={readOnly}
            onClick={() => choose(n)}
            onPointerEnter={() => !readOnly && setHover(n)}
            className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-default"
          >
            <svg
              key={popped === n ? `pop-${v}` : "still"}
              viewBox="0 0 24 24"
              width={size}
              height={size}
              aria-hidden
              className={cn("transition-[color,transform] duration-150", !readOnly && "hover:scale-110", popped === n && "[animation:ombak-star-pop_.4s_ease-out] motion-reduce:animate-none")}
              style={{ color: filled ? color : "var(--muted-foreground)", opacity: filled ? 1 : 0.35 }}
            >
              <path d={STAR} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
