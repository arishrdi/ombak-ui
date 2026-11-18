import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type LiquidLoaderProps = {
  /** Fill level from 0 to 100. Leave undefined to rise and fall endlessly. */
  value?: number;
  /** Diameter in px. Default 96 */
  size?: number;
  /** Water color. Default your theme's primary color */
  color?: string;
  /** Content in the middle. Defaults to the percentage when a value is set. */
  children?: ReactNode;
  /** Accessible name. Default "Loading" */
  label?: string;
  className?: string;
};

const WAVE = "M0 6 Q 12.5 0 25 6 T 50 6 T 75 6 T 100 6 T 125 6 T 150 6 T 175 6 T 200 6 V 40 H 0 Z";

/**
 * A round flask filling with water: two waves roll across the surface as the level rises.
 * With a value it's a progress indicator (role="progressbar"); without one it's a loader.
 */
export function LiquidLoader({ value, size = 96, color = "var(--primary)", children, label = "Loading", className }: LiquidLoaderProps) {
  const determinate = typeof value === "number";
  const v = determinate ? Math.max(0, Math.min(100, value)) : 50;
  return (
    <div
      role={determinate ? "progressbar" : "status"}
      aria-label={label}
      aria-valuemin={determinate ? 0 : undefined}
      aria-valuemax={determinate ? 100 : undefined}
      aria-valuenow={determinate ? Math.round(v) : undefined}
      className={cn("relative isolate grid place-items-center overflow-hidden rounded-full border-2 bg-muted/40", className)}
      style={{ width: size, height: size, borderColor: color }}
    >
      <style>{`@keyframes ombak-liquid-x{to{transform:translateX(-50%)}}@keyframes ombak-liquid-y{0%,100%{top:78%}50%{top:22%}}`}</style>
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 -z-10 transition-[top] duration-700 ease-[cubic-bezier(.3,.7,.2,1)]",
          !determinate && "[animation:ombak-liquid-y_3.2s_ease-in-out_infinite] motion-reduce:animate-none",
        )}
        style={{ top: `${100 - v}%` }}
      >
        {[0, 1].map((i) => (
          <svg
            key={i}
            viewBox="0 0 200 40"
            preserveAspectRatio="none"
            className="absolute left-0 h-[20px] w-[200%] motion-reduce:!animate-none"
            style={{
              top: -10 - i * 3,
              fill: color,
              opacity: i ? 0.45 : 1,
              animation: `ombak-liquid-x ${i ? 2.6 : 1.8}s linear infinite`,
              animationDirection: i ? "reverse" : "normal",
            }}
          >
            <path d={WAVE} />
          </svg>
        ))}
        <div className="absolute inset-x-0 top-[8px] bottom-0" style={{ background: color }} />
      </div>
      <span className="text-sm font-semibold tabular-nums mix-blend-difference text-white">
        {children ?? (determinate ? `${Math.round(v)}%` : null)}
      </span>
    </div>
  );
}
