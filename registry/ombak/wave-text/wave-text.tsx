"use client";

import { useEffect, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

export type WaveTextProps = {
  /** Plain text to animate. */
  text: string;
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** "always" keeps the wave rolling; "hover" sends one wave through on each hover. Default "always" */
  trigger?: "always" | "hover";
  /** How high letters rise, any CSS length. Default "0.25em" */
  amplitude?: string;
  /** Milliseconds for one full bob. Default 1600 */
  duration?: number;
  /** Milliseconds between neighbouring letters. Default 70 */
  stagger?: number;
  className?: string;
};

/**
 * Letters bob up and down one after another, like a wave rolling through the word.
 * Uses the Web Animations API, so it needs no CSS setup. Still for reduced-motion users.
 */
export function WaveText({
  text,
  as: Tag = "span",
  trigger = "always",
  amplitude = "0.25em",
  duration = 1600,
  stagger = 70,
  className,
}: WaveTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>("[data-wave-char]"));
    const frames = [
      { transform: "translateY(0)" },
      { transform: `translateY(calc(${amplitude} * -1))`, offset: 0.25 },
      { transform: "translateY(0)", offset: 0.5 },
      { transform: "translateY(0)" },
    ];
    let anims: Animation[] = [];

    const play = (iterations: number) => {
      anims.forEach((a) => a.cancel());
      anims = chars.map((c, i) =>
        c.animate(frames, { duration, delay: i * stagger, iterations, easing: "ease-in-out" }),
      );
    };

    if (trigger === "always") {
      play(Infinity);
      return () => anims.forEach((a) => a.cancel());
    }
    const onEnter = () => play(1);
    el.addEventListener("pointerenter", onEnter);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      anims.forEach((a) => a.cancel());
    };
  }, [text, trigger, amplitude, duration, stagger]);

  return (
    <Tag ref={ref} aria-label={text} className={cn("inline-block", className)}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden data-wave-char className="inline-block will-change-transform">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </Tag>
  );
}
