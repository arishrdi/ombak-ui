import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type LightRaysProps = {
  /** Content rendered on top. */
  children?: ReactNode;
  /** Color of the rays. Default "#bff7ff" */
  color?: string;
  /** Number of rays, 4–14. Default 9 */
  count?: number;
  /** Brightness of the rays, 0–1. Default 0.5 */
  intensity?: number;
  /** Seconds for one sway; lower is faster. Default 9 */
  duration?: number;
  className?: string;
};

/**
 * Shafts of sunlight slanting down through the water, each one swaying and breathing on its own
 * rhythm. Pure CSS gradients and a mask, so it is cheap and works in Server Components; the rays
 * hold still for reduced-motion users.
 */
export function LightRays({ children, color = "#bff7ff", count = 9, intensity = 0.5, duration = 9, className }: LightRaysProps) {
  const n = Math.max(4, Math.min(14, Math.round(count)));
  // deterministic pseudo-random so server and client render the same rays
  const rand = (i: number, s: number) => {
    const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };

  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <style>{`
@keyframes ombak-ray-sway{0%,100%{transform:rotate(var(--r)) scaleX(1)}50%{transform:rotate(calc(var(--r) + 4deg)) scaleX(1.25)}}
@keyframes ombak-ray-breathe{0%,100%{opacity:var(--o)}50%{opacity:calc(var(--o) * .35)}}`}</style>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen"
        style={{ maskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 90%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 90%)" }}
      >
        {Array.from({ length: n }, (_, i) => {
          const left = 5 + (i / (n - 1)) * 90 + (rand(i, 1) - 0.5) * 8;
          const width = 3 + rand(i, 2) * 9;
          const rot = -18 + rand(i, 3) * 14;
          const o = (0.35 + rand(i, 4) * 0.65) * intensity;
          return (
            <span
              key={i}
              className="absolute -top-[10%] h-[130%] origin-top blur-md motion-reduce:!animate-none"
              style={
                {
                  left: `${left}%`,
                  width: `${width}%`,
                  background: `linear-gradient(to bottom, ${color}, transparent 85%)`,
                  "--r": `${rot}deg`,
                  "--o": o,
                  opacity: o,
                  transform: `rotate(${rot}deg)`,
                  animation: `ombak-ray-sway ${duration * (0.8 + rand(i, 5) * 0.6)}s ease-in-out ${-rand(i, 6) * duration}s infinite, ombak-ray-breathe ${duration * (0.6 + rand(i, 7) * 0.8)}s ease-in-out ${-rand(i, 8) * duration}s infinite`,
                } as CSSProperties
              }
            />
          );
        })}
      </div>
      {children}
    </div>
  );
}
