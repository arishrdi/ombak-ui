"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GradientTextProps = {
  children: ReactNode;
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** Gradient colors. The first one is repeated at the end for a seamless loop. Default ocean blues */
  colors?: string[];
  /** Milliseconds for one full loop. Default 6000 */
  duration?: number;
  /** Gradient angle in degrees. Default 90 */
  angle?: number;
  className?: string;
};

/**
 * Text filled with a gradient that slowly flows through it, like light moving through water.
 * Uses the Web Animations API; holds still for reduced-motion users.
 */
export function GradientText({
  children,
  as: Tag = "span",
  colors = ["#2dd4bf", "#38bdf8", "#818cf8", "#5ef0c8"],
  duration = 6000,
  angle = 90,
  className,
}: GradientTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = el.animate([{ backgroundPosition: "0% 50%" }, { backgroundPosition: "200% 50%" }], {
      duration,
      iterations: Infinity,
    });
    return () => a.cancel();
  }, [duration]);

  return (
    <Tag
      ref={ref}
      className={cn("inline-block bg-clip-text text-transparent [-webkit-background-clip:text]", className)}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${[...colors, colors[0]].join(", ")})`,
        backgroundSize: "200% 100%",
      }}
    >
      {children}
    </Tag>
  );
}
