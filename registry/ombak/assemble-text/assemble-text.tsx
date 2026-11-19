"use client";

import { useEffect, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

export type AssembleTextProps = {
  /** The text. Plain text. */
  text: string;
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** How far (px) letters start from their place. Default 160 */
  scatter?: number;
  /** Milliseconds for the flight. Default 1100 */
  duration?: number;
  /** "view" assembles when scrolled into view; "hover" scatters and re-assembles on each hover. Default "view" */
  trigger?: "view" | "hover";
  className?: string;
};

/**
 * Letters fly in from random spots, spinning, and snap together into the word.
 * Uses the Web Animations API; the text is in place from the start for SEO and reduced motion.
 */
export function AssembleText({ text, as: Tag = "span", scatter = 160, duration = 1100, trigger = "view", className }: AssembleTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>("[data-char]"));
    const play = () =>
      chars.forEach((c, i) => {
        const a = Math.random() * Math.PI * 2;
        const d = scatter * (0.4 + Math.random() * 0.6);
        c.animate(
          [
            { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px) rotate(${(Math.random() - 0.5) * 360}deg) scale(.4)`, opacity: 0 },
            { opacity: 1, offset: 0.4 },
            { transform: "none", opacity: 1 },
          ],
          { duration, delay: i * 25, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" },
        );
      });

    if (trigger === "hover") {
      el.addEventListener("pointerenter", play);
      return () => el.removeEventListener("pointerenter", play);
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        play();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [text, scatter, duration, trigger]);

  return (
    <Tag ref={ref} aria-label={text} className={cn("inline-block", className)}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden data-char className="inline-block will-change-transform">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </Tag>
  );
}
