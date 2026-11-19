import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type WaveCardProps = {
  children: ReactNode;
  /** Wave colors from back to front. Default ocean blues */
  colors?: string[];
  /** Wave height as a share of the card height, 0–1. Default 0.35 */
  level?: number;
  /** Raise the water when hovered. Default true */
  riseOnHover?: boolean;
  className?: string;
};

const PATH = "M0 10 Q 25 0 50 10 T 100 10 T 150 10 T 200 10 V 40 H 0 Z";

/**
 * A card with gently rolling waves along its bottom edge that rise when you hover it.
 * Pure CSS and SVG; still waves for reduced-motion users.
 */
export function WaveCard({ children, colors = ["#1d4ed8", "#0ea5e9", "#5ef0c8"], level = 0.35, riseOnHover = true, className }: WaveCardProps) {
  return (
    <div className={cn("group/wave relative isolate overflow-hidden rounded-2xl border bg-card text-card-foreground", className)}>
      <style>{`@keyframes ombak-wave-card{to{transform:translateX(-50%)}}`}</style>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 -z-10 transition-[height] duration-700 ease-out",
          riseOnHover && "group-hover/wave:!h-[calc(var(--level)+12%)]",
        )}
        style={{ height: `${level * 100}%`, ["--level" as string]: `${level * 100}%` }}
      >
        {colors.map((c, i) => (
          <svg
            key={i}
            viewBox="0 0 200 40"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 h-full w-[200%] motion-reduce:!animate-none"
            style={{
              fill: c,
              opacity: 0.55 + (i / colors.length) * 0.45,
              bottom: `${-i * 6}%`,
              animation: `ombak-wave-card ${9 - i * 2.2}s linear infinite`,
              animationDirection: i % 2 ? "reverse" : "normal",
            }}
          >
            <path d={PATH} />
          </svg>
        ))}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
