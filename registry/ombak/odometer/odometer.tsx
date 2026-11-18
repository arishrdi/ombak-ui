"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type OdometerProps = {
  /** The number to show. Change it and the digits roll to the new value. */
  value: number;
  /** Decimal places. Default 0 */
  decimals?: number;
  /** Locale for separators. Default "en-US" */
  locale?: string;
  prefix?: string;
  suffix?: string;
  /** Milliseconds for a digit to roll. Default 1400 */
  duration?: number;
  /** Milliseconds between neighbouring digits. Default 60 */
  stagger?: number;
  /** Roll in from zero when scrolled into view. Default true */
  onView?: boolean;
  className?: string;
};

/**
 * A mechanical counter: every digit rolls on its own wheel to the new value.
 * Screen readers and search engines get the formatted number as plain text.
 */
export function Odometer({
  value,
  decimals = 0,
  locale = "en-US",
  prefix = "",
  suffix = "",
  duration = 1400,
  stagger = 60,
  onView = true,
  className,
}: OdometerProps) {
  const text = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(!onView);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setArmed(true);
      return;
    }
    if (!onView || !ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        requestAnimationFrame(() => setArmed(true));
      }
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [onView]);

  const chars = text.split("");
  const digitCount = chars.filter((c) => /\d/.test(c)).length;
  let digitIndex = 0;

  return (
    <span ref={ref} className={cn("inline-flex items-baseline tabular-nums", className)}>
      <span className="sr-only">{`${prefix}${text}${suffix}`}</span>
      <span aria-hidden className="inline-flex leading-none">
        {prefix}
        {chars.map((c, i) => {
          if (!/\d/.test(c)) return <span key={i}>{c}</span>;
          const d = Number(c);
          const order = digitCount - 1 - digitIndex++; // rightmost digits move first
          return (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden">
              <span
                className="flex flex-col"
                style={{
                  transform: `translateY(${armed ? -d : 0}em)`,
                  transition: still ? "none" : `transform ${duration}ms cubic-bezier(.2,.8,.2,1) ${order * stagger}ms`,
                }}
              >
                {Array.from({ length: 10 }, (_, n) => (
                  <span key={n} className="block h-[1em]">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
        {suffix}
      </span>
    </span>
  );
}
