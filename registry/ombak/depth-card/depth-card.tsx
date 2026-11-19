"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DepthCardProps = {
  /**
   * Card content. Mark any element with data-depth="0.2" … "1" to make it float at that depth:
   * deeper layers move more with the cursor.
   */
  children: ReactNode;
  /** Maximum tilt in degrees. Default 8 */
  tilt?: number;
  /** How far (px) a depth="1" layer shifts. Default 24 */
  shift?: number;
  className?: string;
};

/**
 * A card made of floating layers: tag elements with data-depth and they shift at different
 * speeds as the card tilts, for a real sense of depth. Still for touch and reduced-motion users.
 */
export function DepthCard({ children, tilt = 8, shift = 24, className }: DepthCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));
    const cur = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = 0;

    const apply = () => {
      el.style.transform = `perspective(900px) rotateX(${-cur.y * tilt}deg) rotateY(${cur.x * tilt}deg)`;
      for (const l of layers) {
        const d = Number(l.dataset.depth) || 0;
        l.style.transform = `translate3d(${cur.x * shift * d}px, ${cur.y * shift * d}px, 0)`;
      }
    };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      apply();
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      kick();
    };
    const leave = () => {
      target.x = target.y = 0;
      kick();
    };
    layers.forEach((l) => (l.style.willChange = "transform"));
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [tilt, shift]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden rounded-2xl border bg-card text-card-foreground will-change-transform", className)}>
      {children}
    </div>
  );
}
