import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type AuroraProps = {
  /** Content rendered on top. */
  children?: ReactNode;
  /** Three to five blob colors. Default sea-glass greens and blues */
  colors?: string[];
  /** Seconds for one full drift cycle; lower is faster. Default 18 */
  duration?: number;
  /** Blur radius in px; higher is softer. Default 80 */
  blur?: number;
  /** Blob opacity, 0–1. Default 0.55 */
  opacity?: number;
  className?: string;
};

/**
 * Soft blobs of colored light drifting slowly behind your content, like the glow under a calm
 * evening sea. Pure CSS, so it works in Server Components; the blobs hold still for
 * reduced-motion users.
 */
export function Aurora({
  children,
  colors = ["#3fd1b0", "#0ea5e9", "#6366f1", "#14b8a6"],
  duration = 18,
  blur = 80,
  opacity = 0.55,
  className,
}: AuroraProps) {
  // each blob gets its own size, start position and path so the motion never lines up
  const blobs = [
    { size: "55%", top: "-10%", left: "-5%", path: "a" },
    { size: "45%", top: "20%", left: "45%", path: "b" },
    { size: "50%", top: "45%", left: "5%", path: "c" },
    { size: "40%", top: "-5%", left: "60%", path: "a" },
    { size: "35%", top: "55%", left: "60%", path: "b" },
  ].slice(0, Math.max(3, Math.min(5, colors.length)));

  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <style>{`
@keyframes ombak-aurora-a{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(18%,12%) scale(1.15)}66%{transform:translate(-8%,18%) scale(.9)}}
@keyframes ombak-aurora-b{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-20%,8%) scale(.9)}66%{transform:translate(10%,-14%) scale(1.2)}}
@keyframes ombak-aurora-c{0%,100%{transform:translate(0,0) scale(1.1)}50%{transform:translate(22%,-10%) scale(.85)}}`}</style>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ filter: `blur(${blur}px)`, opacity }}>
        {blobs.map((b, i) => (
          <span
            key={i}
            className="absolute aspect-square rounded-full mix-blend-normal will-change-transform motion-reduce:!animate-none"
            style={
              {
                width: b.size,
                top: b.top,
                left: b.left,
                background: `radial-gradient(circle at 50% 50%, ${colors[i % colors.length]}, transparent 70%)`,
                animation: `ombak-aurora-${b.path} ${duration * (1 + i * 0.17)}s ease-in-out ${-i * 3}s infinite`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      {children}
    </div>
  );
}
