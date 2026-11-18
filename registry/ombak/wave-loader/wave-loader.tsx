import { cn } from "@/lib/utils";

export type WaveLoaderProps = {
  /** Number of bars. Default 5 */
  bars?: number;
  /** Bar color. Default your theme's primary color */
  color?: string;
  /** Height in px. Default 28 */
  size?: number;
  /** Seconds for one wave. Default 1.1 */
  duration?: number;
  /** Text for screen readers. Default "Loading" */
  label?: string;
  className?: string;
};

/**
 * Bars that rise and fall one after another, like a wave passing through.
 * Pure CSS; a gentle fade instead of movement for reduced-motion users.
 */
export function WaveLoader({ bars = 5, color = "var(--primary)", size = 28, duration = 1.1, label = "Loading", className }: WaveLoaderProps) {
  return (
    <span role="status" aria-label={label} className={cn("inline-flex items-center gap-[3px]", className)} style={{ height: size }}>
      <style>{`@keyframes ombak-wave-bar{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}@keyframes ombak-wave-fade{0%,100%{opacity:.35}50%{opacity:1}}`}</style>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className="h-full rounded-full motion-reduce:![animation-name:ombak-wave-fade]"
          style={{
            width: Math.max(3, size / 7),
            background: color,
            animation: `ombak-wave-bar ${duration}s ease-in-out ${(i * duration) / (bars * 1.6)}s infinite`,
          }}
        />
      ))}
    </span>
  );
}
