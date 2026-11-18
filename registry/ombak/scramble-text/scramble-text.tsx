"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export type ScrambleTextProps = {
  /** The final text. */
  text: string;
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** Scramble when entering the viewport, on hover, or both. Default "both" */
  trigger?: "view" | "hover" | "both";
  /** Characters shown while scrambling. Default uppercase letters and digits */
  chars?: string;
  /** Seconds. Default 1 */
  duration?: number;
  className?: string;
};

/** Text that decodes itself when it scrolls into view, and again on every hover. */
export function ScrambleText({
  text,
  as: Tag = "span",
  trigger = "both",
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  duration = 1,
  className,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tween: gsap.core.Tween | null = null;
    const play = () => {
      tween?.kill();
      tween = gsap.to(el, { duration, ease: "none", scrambleText: { text, chars, speed: 0.6, revealDelay: duration * 0.25 } });
    };
    const st = trigger !== "hover" ? ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: play }) : null;
    if (trigger !== "view") el.addEventListener("pointerenter", play);
    return () => {
      st?.kill();
      tween?.kill();
      el.removeEventListener("pointerenter", play);
      el.textContent = text;
    };
  }, [text, trigger, chars, duration]);

  return (
    <Tag ref={ref} aria-label={text} className={cn("font-mono", className)}>
      {text}
    </Tag>
  );
}
