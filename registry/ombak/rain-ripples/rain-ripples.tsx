"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RainRipplesProps = {
  /** Content rendered on top. */
  children?: ReactNode;
  /** Raindrops per second. Default 6 */
  rate?: number;
  /** Ring color. Default "currentColor" (set it with a text-* class) */
  color?: string;
  /** Largest ring radius in px. Default 70 */
  maxRadius?: number;
  /** Tilt of the water surface; 1 is seen from above, lower flattens the rings. Default 0.45 */
  tilt?: number;
  /** Clicking or tapping drops a bigger ripple. Default true */
  interactive?: boolean;
  className?: string;
};

type Ring = { x: number; y: number; r: number; max: number; life: number };

/**
 * Rain falling on still water: drops land at random and spread into flattened rings, each one
 * echoed by a fainter second ring. Click to drop your own. Canvas 2D; pauses off-screen and shows a
 * few still rings for reduced-motion users.
 */
export function RainRipples({ children, rate = 6, color = "currentColor", maxRadius = 70, tilt = 0.45, interactive = true, className }: RainRipplesProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stroke = color === "currentColor" ? getComputedStyle(wrap).color : color;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    let pending = 0;
    let rings: Ring[] = [];

    const drop = (x: number, y: number, big = false) => {
      rings.push({ x, y, r: 0, max: (big ? 1.8 : 0.5 + Math.random() * 0.5) * maxRadius, life: 1 });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) {
        rings = Array.from({ length: 8 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 0, max: maxRadius, life: 1 }));
        rings.forEach((g) => {
          g.r = g.max * (0.3 + Math.random() * 0.6);
          g.life = 1 - g.r / g.max;
        });
      }
      draw();
    };

    const ellipse = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * tilt, 0, 0, Math.PI * 2);
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = stroke;
      for (const g of rings) {
        const a = g.life * g.life;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = a;
        ellipse(g.x, g.y, g.r);
        if (g.r > 10) {
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = a * 0.55;
          ellipse(g.x, g.y, g.r * 0.62);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      pending += rate * dt;
      while (pending >= 1) {
        drop(Math.random() * w, Math.random() * h);
        pending -= 1;
      }
      for (const g of rings) {
        g.r += (g.max - g.r) * dt * 1.6 + 8 * dt;
        g.life = Math.max(0, 1 - g.r / g.max);
      }
      rings = rings.filter((g) => g.life > 0.01);
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onDown = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      drop(e.clientX - r.left, e.clientY - r.top, true);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    if (reduced) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(wrap);
    raf = requestAnimationFrame(loop);
    if (interactive) wrap.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointerdown", onDown);
    };
  }, [rate, color, maxRadius, tilt, interactive]);

  return (
    <div ref={wrapRef} className={cn("relative isolate overflow-hidden text-sky-200", className)}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />
      {children}
    </div>
  );
}
