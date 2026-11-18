"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export type HighlightTextProps = {
  children: ReactNode;
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** Marker color. Any CSS color. Default "rgba(250, 204, 21, 0.4)" */
  color?: string;
  /** Tie the sweep to the scroll position instead of playing once. Default false */
  scrub?: boolean;
  /** Seconds for the sweep when not scrubbing. Default 1.1 */
  duration?: number;
  /** Seconds before starting. Default 0 */
  delay?: number;
  /** ScrollTrigger start position. Default "top 80%" */
  start?: string;
  /** How much of the line height the marker covers, 0–1. Default 0.4 */
  thickness?: number;
  className?: string;
};

/**
 * A marker stroke that sweeps across the text as it scrolls into view. Wraps nicely across
 * multiple lines. The text is fully highlighted for reduced-motion users.
 */
export function HighlightText({
  children,
  as: Tag = "span",
  color = "rgba(250, 204, 21, 0.4)",
  scrub = false,
  duration = 1.1,
  delay = 0,
  start = "top 80%",
  thickness = 0.4,
  className,
}: HighlightTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        el,
        { backgroundSize: `0% ${thickness * 100}%` },
        {
          backgroundSize: `100% ${thickness * 100}%`,
          ease: scrub ? "none" : "power2.inOut",
          duration,
          delay,
          scrollTrigger: scrub ? { trigger: el, start, end: "bottom 45%", scrub: true } : { trigger: el, start, once: true },
        },
      );
    },
    { scope: ref, dependencies: [scrub, duration, delay, start, thickness] },
  );

  return (
    <Tag
      ref={ref}
      className={cn("[box-decoration-break:clone] [-webkit-box-decoration-break:clone]", className)}
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 88%",
        backgroundSize: `100% ${thickness * 100}%`,
      }}
    >
      {children}
    </Tag>
  );
}
