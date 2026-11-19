"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PlanktonProps = {
  /** Content rendered on top. */
  children?: ReactNode;
  /** Number of specks. Default 140 */
  count?: number;
  /** Glow color. Default "#5ef0c8" */
  color?: string;
  /** Radius in px around the cursor where specks light up. Default 140 */
  radius?: number;
  /** Drift speed multiplier. Default 1 */
  speed?: number;
  className?: string;
};

type Speck = { x: number; y: number; vx: number; vy: number; r: number; base: number; glow: number; phase: number };

/**
 * Bioluminescent plankton drifting in dark water. Specks twinkle faintly on their own and flare up
 * as the cursor (or a finger) passes, leaving a fading trail of light. Canvas 2D; pauses off-screen
 * and shows a still field for reduced-motion users.
 */
export function Plankton({ children, count = 140, color = "#5ef0c8", radius = 140, speed = 1, className }: PlanktonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let last = performance.now();
    const pointer = { x: -9999, y: -9999 };
    let specks: Speck[] = [];

    const make = (): Speck => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 6 - 2,
      r: 0.6 + Math.random() * 1.6,
      base: 0.12 + Math.random() * 0.25,
      glow: 0,
      phase: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      specks = Array.from({ length: count }, make);
      draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      for (const s of specks) {
        const twinkle = s.base * (0.6 + 0.4 * Math.sin(t * 1.3 + s.phase));
        const a = Math.min(1, twinkle + s.glow);
        ctx.globalAlpha = a;
        ctx.shadowBlur = 4 + s.glow * 18;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * (1 + s.glow * 1.4), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (const s of specks) {
        s.x += s.vx * speed * dt;
        s.y += s.vy * speed * dt;
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        if (s.y > h + 10) s.y = -10;
        const d = Math.hypot(s.x - pointer.x, s.y - pointer.y);
        if (d < radius) s.glow = Math.min(1, s.glow + (1 - d / radius) * dt * 6);
        s.glow *= Math.pow(0.25, dt); // fade over ~1s
      }
      draw(now / 1000);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
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
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [count, color, radius, speed]);

  return (
    <div ref={wrapRef} className={cn("relative isolate overflow-hidden bg-[#03101c]", className)}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />
      {children}
    </div>
  );
}
