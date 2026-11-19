"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export type ScrollWordsProps = {
  /** The paragraph. Plain text. */
  text: string;
  /** HTML tag to render. Default "p" */
  as?: ElementType;
  /** Opacity of words that haven't been "read" yet. Default 0.18 */
  dim?: number;
  /** ScrollTrigger start. Default "top 80%" */
  start?: string;
  /** ScrollTrigger end. Default "bottom 40%" */
  end?: string;
  /** Use a scrollable element instead of the window, e.g. for demos. */
  scroller?: React.RefObject<HTMLElement | null>;
  className?: string;
};

/**
 * A paragraph that lights up word by word as you scroll through it, like reading along.
 * Tied to the scroll position, so scrolling back dims it again. Fully lit for reduced motion.
 */
export function ScrollWords({ text, as: Tag = "p", dim = 0.18, start = "top 80%", end = "bottom 40%", scroller, className }: ScrollWordsProps) {
  const ref = useRef<HTMLElement>(null);

  // useEffect (not a layout effect) so a scroller ref owned by a parent is already attached
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { opacity: dim },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start, end, scrub: true, scroller: scroller?.current ?? undefined },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [text, dim, start, end, scroller]);

  return (
    <Tag ref={ref} className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(/(\s+)/).map((w, i) => (/\s+/.test(w) ? w : <span key={i} data-word>{w}</span>))}
      </span>
    </Tag>
  );
}
