"use client";

import { useEffect, useId, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

export type MorphingTextProps = {
  /** Words or short phrases to morph between. */
  words: string[];
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** Seconds a word stays readable. Default 1.6 */
  hold?: number;
  /** Seconds the melt between two words takes. Default 1 */
  morph?: number;
  className?: string;
};

/**
 * Words that melt into one another like ink in water: the old word blurs out while the new one
 * blurs in, sharpened by an SVG threshold filter so they read as a single liquid shape.
 * Screen readers get the full list; reduced-motion users get a simple cross-fade.
 */
export function MorphingText({ words, as: Tag = "span", hold = 1.6, morph = 1, className }: MorphingTextProps) {
  const aRef = useRef<HTMLSpanElement>(null);
  const bRef = useRef<HTMLSpanElement>(null);
  const gooRef = useRef<HTMLSpanElement>(null);
  const filterId = `ombak-morph-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b || words.length < 2) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // the liquid threshold filter only makes sense while blurring; skip it for reduced motion
    if (gooRef.current) gooRef.current.style.filter = reduced ? "none" : `url(#${filterId})`;
    let i = 0;
    let phase: "hold" | "morph" = "hold";
    let start = performance.now();
    let raf = 0;
    a.textContent = words[0];
    b.textContent = words[1];

    const set = (el: HTMLElement, t: number) => {
      // t: 0 = gone, 1 = fully visible
      const blur = reduced ? 0 : Math.min(8 / Math.max(t, 0.001) - 8, 100);
      el.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
      el.style.opacity = String(Math.pow(t, reduced ? 1 : 0.4));
    };

    const frame = (now: number) => {
      const elapsed = (now - start) / 1000;
      if (phase === "hold") {
        set(a, 1);
        set(b, 0);
        if (elapsed >= hold) {
          phase = "morph";
          start = now;
        }
      } else {
        const t = Math.min(1, elapsed / morph);
        set(a, 1 - t);
        set(b, t);
        if (t >= 1) {
          i = (i + 1) % words.length;
          a.textContent = words[i];
          b.textContent = words[(i + 1) % words.length];
          phase = "hold";
          start = now;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [words, hold, morph, filterId]);

  return (
    <Tag className={cn("relative inline-grid", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <svg aria-hidden className="absolute size-0">
        <filter id={filterId}>
          <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
        </filter>
      </svg>
      <span ref={gooRef} aria-hidden className="col-start-1 row-start-1 grid">
        <span ref={aRef} className="col-start-1 row-start-1 whitespace-nowrap">
          {words[0]}
        </span>
        <span ref={bRef} className="col-start-1 row-start-1 whitespace-nowrap opacity-0">
          {words[1]}
        </span>
      </span>
    </Tag>
  );
}
