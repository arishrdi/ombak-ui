import { type ElementType } from "react";
import { cn } from "@/lib/utils";

export type GlitchTextProps = {
  /** The text. */
  text: string;
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** "loop" glitches every few seconds; "hover" glitches while hovered. Default "loop" */
  trigger?: "loop" | "hover";
  /** Colors of the two split channels. Default ["#ff2bd6", "#22d3ee"] */
  colors?: [string, string];
  className?: string;
};

/**
 * A glitch effect: two color channels split away and the text tears into horizontal slices,
 * then snaps back. Pure CSS, works in Server Components, and stays still for reduced motion.
 */
export function GlitchText({ text, as: Tag = "span", trigger = "loop", colors = ["#ff2bd6", "#22d3ee"], className }: GlitchTextProps) {
  const layer = "pointer-events-none absolute inset-0 motion-reduce:hidden";
  const run =
    trigger === "loop"
      ? ""
      : "[animation-play-state:paused] group-hover/glitch:[animation-play-state:running]";
  return (
    <Tag className={cn("group/glitch relative inline-block", className)} data-text={text}>
      <style>{`
@keyframes ombak-glitch-a{0%,82%,100%{clip-path:inset(0 0 100% 0);transform:none}84%{clip-path:inset(12% 0 60% 0);transform:translate(-3px,-1px)}87%{clip-path:inset(55% 0 20% 0);transform:translate(3px,1px)}90%{clip-path:inset(30% 0 45% 0);transform:translate(-2px,0)}93%{clip-path:inset(75% 0 5% 0);transform:translate(2px,-1px)}}
@keyframes ombak-glitch-b{0%,82%,100%{clip-path:inset(0 0 100% 0);transform:none}85%{clip-path:inset(65% 0 10% 0);transform:translate(3px,1px)}88%{clip-path:inset(5% 0 75% 0);transform:translate(-3px,0)}91%{clip-path:inset(40% 0 35% 0);transform:translate(2px,1px)}94%{clip-path:inset(20% 0 62% 0);transform:translate(-2px,-1px)}}
@keyframes ombak-glitch-base{0%,82%,100%{transform:none}86%{transform:translate(1px,0) skewX(-4deg)}90%{transform:translate(-1px,0) skewX(3deg)}}`}</style>
      <span className={cn("relative inline-block [animation:ombak-glitch-base_3s_steps(1)_infinite] motion-reduce:animate-none", run)}>{text}</span>
      <span aria-hidden className={cn(layer, "[animation:ombak-glitch-a_3s_steps(1)_infinite]", run)} style={{ color: colors[0], textShadow: `2px 0 ${colors[0]}` }}>
        {text}
      </span>
      <span aria-hidden className={cn(layer, "[animation:ombak-glitch-b_3s_steps(1)_infinite]", run)} style={{ color: colors[1], textShadow: `-2px 0 ${colors[1]}` }}>
        {text}
      </span>
    </Tag>
  );
}
