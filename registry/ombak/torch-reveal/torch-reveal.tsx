"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TorchRevealProps = {
  /** What everyone sees. */
  children: ReactNode;
  /** What the torch uncovers, laid exactly on top of the children. */
  reveal: ReactNode;
  /** Torch radius in px. Default 140 */
  radius?: number;
  /** Softness of the torch edge, 0–1. Default 0.45 */
  softness?: number;
  className?: string;
};

/**
 * A torch that uncovers a hidden layer wherever the cursor (or finger) points, like a diver's
 * flashlight in dark water. The hidden layer stays hidden from screen readers.
 */
export function TorchReveal({ children, reveal, radius = 140, softness = 0.45, className }: TorchRevealProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    if (!wrap || !layer) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pos = { x: 0, y: 0, r: 0 };
    const target = { x: 0, y: 0, r: 0 };
    let raf = 0;

    const paint = () => {
      const inner = Math.max(0, pos.r * (1 - softness));
      const mask = `radial-gradient(circle at ${pos.x}px ${pos.y}px, #000 ${inner}px, transparent ${pos.r}px)`;
      layer.style.maskImage = mask;
      layer.style.webkitMaskImage = mask;
    };
    const tick = () => {
      const k = reduced ? 1 : 0.18;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      pos.r += (target.r - pos.r) * (reduced ? 1 : 0.12);
      paint();
      const done = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) + Math.abs(target.r - pos.r) < 0.5;
      raf = done ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
      if (target.r === 0) {
        pos.x = target.x;
        pos.y = target.y;
      }
      target.r = radius;
      kick();
    };
    const onLeave = () => {
      target.r = 0;
      kick();
    };
    paint();
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerdown", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [radius, softness]);

  return (
    <div ref={wrapRef} className={cn("relative touch-none overflow-hidden", className)}>
      {children}
      <div
        ref={layerRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ maskImage: "radial-gradient(circle, transparent 0, transparent 0)" }}
      >
        {reveal}
      </div>
    </div>
  );
}
