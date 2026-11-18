"use client";

import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BorderBeamProps = {
  /** The content that gets the moving border. */
  children: ReactNode;
  /** Beam colors, from tail to head. Default ["transparent", "#2dd4bf", "#a5f3fc"] */
  colors?: string[];
  /** Seconds for one lap. Default 4 */
  duration?: number;
  /** Border thickness in px. Default 1.5 */
  width?: number;
  /** Length of the beam as a share of the lap, 0–1. Default 0.25 */
  length?: number;
  className?: string;
};

/**
 * A beam of light that travels around the border of any box. Wrap a card, an input or a CTA.
 * Pure CSS (a rotating conic gradient); a still beam for reduced-motion users.
 */
export function BorderBeam({
  children,
  colors = ["transparent", "#2dd4bf", "#a5f3fc"],
  duration = 4,
  width = 1.5,
  length = 0.25,
  className,
}: BorderBeamProps) {
  const deg = Math.round(length * 360);
  const stops = colors.map((c, i) => `${c} ${Math.round((i / (colors.length - 1)) * deg)}deg`).join(", ");
  const style = {
    "--beam": `conic-gradient(from var(--beam-angle), ${stops}, transparent ${deg}deg)`,
    "--beam-duration": `${duration}s`,
    padding: width,
  } as CSSProperties;

  return (
    <div className={cn("relative isolate overflow-hidden rounded-xl bg-border", className)} style={style}>
      <style>{`@property --beam-angle{syntax:'<angle>';inherits:false;initial-value:0deg}
@keyframes ombak-beam{to{--beam-angle:360deg}}`}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [animation:ombak-beam_var(--beam-duration)_linear_infinite] [background:var(--beam)] motion-reduce:animate-none"
      />
      <div className="relative h-full rounded-[inherit] bg-card text-card-foreground">{children}</div>
    </div>
  );
}
