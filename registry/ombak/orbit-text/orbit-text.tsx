import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type OrbitTextProps = {
  /** Text placed around the circle. A trailing separator like " • " makes the loop seamless. */
  text: string;
  /** Diameter in px. Default 160 */
  size?: number;
  /** Seconds per full turn; negative spins the other way. Default 14 */
  duration?: number;
  /** Something in the middle, e.g. an icon or logo. */
  children?: ReactNode;
  /** Pause while hovered. Default true */
  pauseOnHover?: boolean;
  className?: string;
};

/**
 * Text set around a circle that slowly turns, the classic "scroll down" or "available for work"
 * badge. Pure SVG and CSS; it stops turning for reduced-motion users.
 */
export function OrbitText({ text, size = 160, duration = 14, children, pauseOnHover = true, className }: OrbitTextProps) {
  const id = `ombak-orbit-text-${useId().replace(/:/g, "")}`;
  const r = 40; // in the 100×100 viewBox
  return (
    <div className={cn("group/orbit relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <style>{`@keyframes ombak-orbit-text{to{transform:rotate(360deg)}}`}</style>
      <svg
        viewBox="0 0 100 100"
        aria-label={text}
        role="img"
        className={cn(
          "absolute inset-0 size-full motion-reduce:!animate-none",
          pauseOnHover && "group-hover/orbit:[animation-play-state:paused]",
        )}
        style={{ animation: `ombak-orbit-text ${Math.abs(duration)}s linear infinite`, animationDirection: duration < 0 ? "reverse" : "normal" }}
      >
        <defs>
          <path id={id} d={`M50,50 m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`} />
        </defs>
        <text className="fill-current text-[9.4px] font-semibold tracking-[0.22em] uppercase">
          <textPath href={`#${id}`} textLength={2 * Math.PI * r - 1} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}
