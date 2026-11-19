import { type ElementType } from "react";
import { cn } from "@/lib/utils";

export type TideTextProps = {
  /** The text (best with big, bold display type). */
  text: string;
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** Water level from 0 to 100. Default 55 */
  level?: number;
  /** Water color. Default your theme's primary color */
  color?: string;
  /** Raise the water to the top on hover. Default true */
  fillOnHover?: boolean;
  className?: string;
};

/**
 * Outlined display text with water inside it: a wave rolls across the surface and the level
 * rises to the brim on hover. Pure CSS (an SVG wave clipped to the letters).
 */
export function TideText({ text, as: Tag = "span", level = 55, color = "var(--primary)", fillOnHover = true, className }: TideTextProps) {
  const wave = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='400' viewBox='0 0 200 400' preserveAspectRatio='none'><path d='M0 20 Q 25 0 50 20 T 100 20 T 150 20 T 200 20 V 400 H 0 Z' fill='black'/></svg>`,
  );
  // The mask image is twice the element's height, with the wave crest 10% of the way down it.
  // For mask-position-y p (a share of the size difference, -1 × height), the surface sits at
  // (0.1 - p) × height, so to put it at (1 - level) we need p = level - 0.9.
  const y = (l: number) => `${Math.round((l / 100 - 0.9) * 1000) / 10}%`;
  return (
    <Tag
      aria-label={text}
      className={cn("group/tide relative inline-block font-black", className)}
      style={{ ["--tide-color" as string]: color, ["--tide-y" as string]: y(level) }}
    >
      <style>{`@keyframes ombak-tide-text{to{-webkit-mask-position-x:-200px;mask-position-x:-200px}}`}</style>
      {/* the outline */}
      <span aria-hidden className="text-transparent [-webkit-text-stroke:2px_var(--tide-color)]">
        {text}
      </span>
      {/* the water: the text filled with color, masked by a wave that sits at the water level */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 [animation:ombak-tide-text_2.4s_linear_infinite] transition-[-webkit-mask-position-y,mask-position-y] duration-1000 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:animate-none",
          fillOnHover && "group-hover/tide:[--tide-y:40%]",
        )}
        style={{
          color: "var(--tide-color)",
          WebkitMaskImage: `url("data:image/svg+xml,${wave}")`,
          maskImage: `url("data:image/svg+xml,${wave}")`,
          WebkitMaskRepeat: "repeat-x",
          maskRepeat: "repeat-x",
          WebkitMaskSize: "200px 200%",
          maskSize: "200px 200%",
          // mask-position-y isn't in React's style typings yet
          ["WebkitMaskPositionY" as string]: "var(--tide-y)",
          ["maskPositionY" as string]: "var(--tide-y)",
        }}
      >
        {text}
      </span>
    </Tag>
  );
}
