import { cn } from "@/lib/utils";

export type OrbitSpinnerProps = {
  /** Diameter in px. Default 40 */
  size?: number;
  /** Number of orbiting dots. Default 3 */
  dots?: number;
  /** Dot color. Default your theme's primary color */
  color?: string;
  /** Seconds per orbit. Default 1.4 */
  duration?: number;
  /** Text for screen readers. Default "Loading" */
  label?: string;
  className?: string;
};

/**
 * Small moons chasing each other around an orbit, each one a little slower than the last.
 * Pure CSS; a slow pulse for reduced-motion users.
 */
export function OrbitSpinner({ size = 40, dots = 3, color = "var(--primary)", duration = 1.4, label = "Loading", className }: OrbitSpinnerProps) {
  const dot = Math.max(6, size / 4.5);
  return (
    <span role="status" aria-label={label} className={cn("relative inline-block", className)} style={{ width: size, height: size }}>
      <style>{`@keyframes ombak-orbit{to{transform:rotate(360deg)}}@keyframes ombak-orbit-calm{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
      <span aria-hidden className="absolute rounded-full border-2 border-current opacity-25" style={{ color, inset: dot / 2 - 1 }} />
      {Array.from({ length: dots }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute motion-reduce:![animation-name:ombak-orbit-calm]"
          style={{ inset: dot / 2, animation: `ombak-orbit ${duration + i * 0.25}s cubic-bezier(.5,.1,.5,.9) ${i * -0.15}s infinite` }}
        >
          <span
            className="absolute left-1/2 rounded-full"
            style={{
              width: dot * (1 - i * 0.18),
              height: dot * (1 - i * 0.18),
              top: (-dot * (1 - i * 0.18)) / 2,
              marginLeft: (-dot * (1 - i * 0.18)) / 2,
              background: color,
              opacity: 1 - i * 0.22,
            }}
          />
        </span>
      ))}
    </span>
  );
}
