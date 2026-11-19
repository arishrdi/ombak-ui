"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ShimmerTextProps = {
  children: ReactNode;
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** Resting text color. Default a muted version of your theme's foreground */
  baseColor?: string;
  /** Color of the moving sheen. Default your theme's foreground */
  shimmerColor?: string;
  /** Milliseconds for one sweep. Default 2400 */
  duration?: number;
  /** Width of the sheen, in % of the text width. Default 20 */
  spread?: number;
  className?: string;
};

/**
 * A light sheen that glides across the text over and over. Perfect for "thinking…" states,
 * badges and quiet calls to action. Uses your theme's foreground color by default.
 */
export function ShimmerText({
  children,
  as: Tag = "span",
  baseColor = "color-mix(in oklab, var(--foreground, #111) 45%, transparent)",
  shimmerColor = "var(--foreground, #111)",
  duration = 2400,
  spread = 20,
  className,
}: ShimmerTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = el.animate([{ backgroundPosition: "150% 0" }, { backgroundPosition: "-50% 0" }], {
      duration,
      iterations: Infinity,
      easing: "ease-in-out",
    });
    return () => a.cancel();
  }, [duration]);

  const half = spread / 2;
  return (
    <Tag
      ref={ref}
      className={cn("inline-block bg-clip-text text-transparent [-webkit-background-clip:text]", className)}
      style={{
        backgroundImage: `linear-gradient(110deg, ${baseColor} ${50 - half}%, ${shimmerColor} 50%, ${baseColor} ${50 + half}%)`,
        backgroundSize: "250% 100%",
        backgroundPosition: "150% 0",
      }}
    >
      {children}
    </Tag>
  );
}
