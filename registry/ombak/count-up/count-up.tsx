"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export type CountUpProps = {
  /** Final number. */
  value: number;
  /** Starting number. Default 0 */
  from?: number;
  /** Decimal places. Default 0 */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Locale for separators. Default "en-US" */
  locale?: string;
  /** Seconds. Default 2 */
  duration?: number;
  /** HTML tag. Default "span" */
  as?: ElementType;
  className?: string;
};

/**
 * Counts up to a number when it scrolls into view.
 * The final value is server-rendered, so it's right for SEO and visitors without JavaScript.
 */
export function CountUp({
  value,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "en-US",
  duration = 2,
  as: Tag = "span",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLElement>(null);
  const fmt = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const format = (n: number) => `${prefix}${fmt.format(n)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const counter = { n: from };
    el.textContent = format(from);
    const tween = gsap.to(counter, {
      n: value,
      duration,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        el.textContent = format(counter.n);
      },
    });
    const st = ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => tween.play() });
    return () => {
      st.kill();
      tween.kill();
      el.textContent = format(value);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, from, decimals, prefix, suffix, locale, duration]);

  return (
    <Tag ref={ref} className={cn("tabular-nums", className)}>
      {format(value)}
    </Tag>
  );
}
