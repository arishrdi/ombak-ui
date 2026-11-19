import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ProgressRingProps = {
  /** Progress from 0 to 100. Leave undefined for an endless spinner. */
  value?: number;
  /** Diameter in px. Default 64 */
  size?: number;
  /** Ring thickness in px. Default 6 */
  thickness?: number;
  /** Ring color. Default your theme's primary color */
  color?: string;
  /** Content in the middle. Defaults to the percentage when a value is set. */
  children?: ReactNode;
  /** Accessible name. Default "Progress" */
  label?: string;
  className?: string;
};

/**
 * A circular progress indicator. With a value it animates smoothly to it; without one it spins.
 * Exposes role="progressbar" with the current value for screen readers.
 */
export function ProgressRing({ value, size = 64, thickness = 6, color = "var(--primary)", children, label = "Progress", className }: ProgressRingProps) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const determinate = typeof value === "number";
  const v = determinate ? Math.max(0, Math.min(100, value)) : 25;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={determinate ? Math.round(v) : undefined}
      className={cn("relative inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <style>{`@keyframes ombak-ring-spin{to{transform:rotate(360deg)}}`}</style>
      <svg
        width={size}
        height={size}
        className={cn("-rotate-90", !determinate && "[animation:ombak-ring-spin_1s_linear_infinite] motion-reduce:[animation-duration:3s]")}
        aria-hidden
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={thickness} className="stroke-muted" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v / 100)}
          style={{ transition: "stroke-dashoffset 600ms cubic-bezier(.3,.7,.2,1)" }}
        />
      </svg>
      <span className="absolute text-xs font-semibold tabular-nums">{children ?? (determinate ? `${Math.round(v)}%` : null)}</span>
    </div>
  );
}
