"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export type HorizontalScrollProps = {
  /** The panels, laid out in a row. */
  children: ReactNode;
  /** Space between panels, any CSS length. Default "1.5rem" */
  gap?: string;
  /** Below this viewport width (px) it becomes a native swipe row. Default 768 */
  disableBelow?: number;
  /** Scroll smoothing: true, or seconds of lag. Default 1 */
  scrub?: boolean | number;
  className?: string;
};

/**
 * Pins a section and turns vertical scrolling into a horizontal journey. On small screens and
 * for reduced-motion users it falls back to a native, snapping swipe row.
 */
export function HorizontalScroll({ children, gap = "1.5rem", disableBelow = 768, scrub = 1, className }: HorizontalScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      const track = trackRef.current;
      if (!root || !track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const mm = gsap.matchMedia();
      mm.add(`(min-width: ${disableBelow}px)`, () => {
        gsap.set(root, { overflowX: "hidden" });
        const distance = () => track.scrollWidth - root.clientWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: () => `+=${distance()}`, pin: true, scrub, invalidateOnRefresh: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [disableBelow, scrub] },
  );

  return (
    <div ref={ref} className={cn("snap-x snap-mandatory overflow-x-auto", className)}>
      <div ref={trackRef} className="flex w-max *:snap-start" style={{ gap }}>
        {children}
      </div>
    </div>
  );
}
