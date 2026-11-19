import { cn } from "@/lib/utils";

export type TideProgressProps = {
  /** Progress from 0 to 100. */
  value: number;
  /** Bar height in px. Default 14 */
  height?: number;
  /** Water color. Default your theme's primary color */
  color?: string;
  /** Show the percentage at the end. Default false */
  showValue?: boolean;
  /** Accessible name. Default "Progress" */
  label?: string;
  className?: string;
};

/**
 * A progress bar filled with water: the leading edge rolls like a little wave as it moves.
 * Pure CSS and SVG; exposes role="progressbar" with the current value.
 */
export function TideProgress({ value, height = 14, color = "var(--primary)", showValue = false, label = "Progress", className }: TideProgressProps) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("flex w-full items-center gap-3", className)}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(v)}
        className="relative w-full overflow-hidden rounded-full bg-muted"
        style={{ height }}
      >
        <style>{`@keyframes ombak-tide{to{transform:translateY(-50%)}}`}</style>
        <div
          className="absolute inset-y-0 left-0 transition-[width] duration-700 ease-[cubic-bezier(.3,.7,.2,1)]"
          style={{ width: `${v}%`, background: color }}
        >
          {/* the rolling wave on the water's front edge */}
          <svg
            viewBox="0 0 10 40"
            preserveAspectRatio="none"
            aria-hidden
            className="absolute top-0 left-full h-[200%] w-[7px] [animation:ombak-tide_1.2s_linear_infinite] motion-reduce:animate-none"
            style={{ fill: color }}
          >
            <path d="M0 0 Q 10 5 0 10 T 0 20 T 0 30 T 0 40 Z" />
          </svg>
        </div>
      </div>
      {showValue && <span className="w-10 text-right text-sm font-medium tabular-nums">{Math.round(v)}%</span>}
    </div>
  );
}
