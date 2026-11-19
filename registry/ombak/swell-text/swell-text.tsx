"use client";

import { useEffect, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

export type SwellTextProps = {
  /** The text. Plain text. */
  text: string;
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** Radius (px) of the swell around the cursor. Default 140 */
  radius?: number;
  /** Maximum scale of a letter right under the cursor. Default 1.5 */
  maxScale?: number;
  /** Also thicken letters (needs a variable font with a weight axis). Default true */
  weight?: boolean;
  className?: string;
};

/**
 * Letters swell like a wave rising under the cursor: the closer a letter is, the bigger (and
 * bolder, with a variable font) it gets. Still for touch and reduced-motion users.
 */
export function SwellText({ text, as: Tag = "span", radius = 140, maxScale = 1.5, weight = true, className }: SwellTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>("[data-char]"));
    const target = chars.map(() => 0);
    const cur = chars.map(() => 0);
    let raf = 0;
    let pointer: { x: number; y: number } | null = null;

    const tick = () => {
      let moving = false;
      chars.forEach((c, i) => {
        if (pointer) {
          const r = c.getBoundingClientRect();
          const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
          target[i] = Math.max(0, 1 - d / radius);
        } else target[i] = 0;
        cur[i] += (target[i] - cur[i]) * 0.18;
        if (Math.abs(target[i] - cur[i]) > 0.002) moving = true;
        const k = (1 - Math.cos(cur[i] * Math.PI)) / 2; // ease
        c.style.transform = `translateY(${-k * 0.12}em) scale(${1 + k * (maxScale - 1)})`;
        // give growing letters room so they don't overlap their neighbours
        c.style.marginInline = `${(k * (maxScale - 1) * 0.28).toFixed(3)}em`;
        if (weight) c.style.fontVariationSettings = `"wght" ${Math.round(400 + k * 500)}`;
      });
      raf = moving || pointer ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [text, radius, maxScale, weight]);

  return (
    <Tag ref={ref} aria-label={text} className={cn("inline-block cursor-default py-[0.2em]", className)}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden data-char className="inline-block origin-bottom will-change-transform">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </Tag>
  );
}
