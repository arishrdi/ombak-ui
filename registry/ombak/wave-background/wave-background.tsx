"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type WaveBackgroundProps = {
  /** Content rendered on top of the waves. */
  children?: ReactNode;
  /** Wave colors from back to front. Any CSS color, including var(--…). */
  colors?: string[];
  /** Animation speed multiplier. Default 1 */
  speed?: number;
  /** Wave height as a fraction of the container height. Default 0.12 */
  amplitude?: number;
  /** Vertical position of the waves' resting line, 0 (top) to 1 (bottom). Default 0.62 */
  baseline?: number;
  /** Waves swell around the cursor. Default true */
  interactive?: boolean;
  /** Soft blur on the back waves for depth, in px. Default 0 */
  blur?: number;
  className?: string;
};

const DEFAULT_COLORS = ["#1d4ed8", "#0ea5e9", "#2dd4bf", "#a7f3d0"];

/**
 * Layered, slowly rolling ocean waves drawn on a canvas. The signature Ombak component.
 * Swells under the cursor, pauses when off-screen, and renders a still frame for reduced-motion users.
 *
 * Performance: with `blur`, the back waves go on their own low-resolution canvas that the browser
 * upscales, which softens them for free; no per-frame canvas filter. Resolution is capped at 1.5x
 * since soft shapes don't gain from more pixels.
 */
export function WaveBackground({
  children,
  colors = DEFAULT_COLORS,
  speed = 1,
  amplitude = 0.12,
  baseline = 0.62,
  interactive = true,
  blur = 0,
  className,
}: WaveBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const back = backRef.current;
    const ctx = canvas?.getContext("2d");
    const bctx = blur > 0 ? back?.getContext("2d") : null;
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let t = Math.random() * 100;
    const pointer = { x: 0.5, strength: 0, target: 0 };

    // resolve CSS variables like var(--surf) into real colors
    const resolved = colors.map((c) => {
      if (!c.startsWith("var(")) return c;
      const name = c.slice(4, -1).trim();
      return getComputedStyle(wrap).getPropertyValue(name).trim() || "#0ea5e9";
    });

    const size = (c: HTMLCanvasElement, c2d: CanvasRenderingContext2D, scale: number) => {
      c.width = Math.max(1, Math.round(w * scale));
      c.height = Math.max(1, Math.round(h * scale));
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      c2d.setTransform(scale, 0, 0, scale, 0, 0);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      size(canvas, ctx, dpr);
      // fewer pixels = softer once upscaled: blur 3 renders the back waves at ~40% resolution
      if (back && bctx) size(back, bctx, Math.max(0.2, 1 / (1 + blur * 0.5)));
      if (reduced) draw();
    };

    const wave = (c2d: CanvasRenderingContext2D, i: number, n: number, color: string) => {
      const depth = (i + 1) / n; // 0..1, front waves are taller and faster
      const amp = h * amplitude * (0.55 + depth * 0.6);
      const yBase = h * baseline + (i - (n - 1) / 2) * h * 0.06;
      const freq = (Math.PI * 2) / (w * (1.1 - depth * 0.45));
      const phase = t * (0.35 + depth * 0.5) + i * 1.7;
      c2d.beginPath();
      c2d.moveTo(0, h);
      for (let x = 0; x <= w + 8; x += 8) {
        const swell = interactive ? Math.exp(-(((x / w - pointer.x) * 4) ** 2)) * pointer.strength * h * 0.08 * depth : 0;
        const y = yBase + Math.sin(x * freq + phase) * amp * 0.6 + Math.sin(x * freq * 2.3 - phase * 1.3) * amp * 0.25 - swell;
        c2d.lineTo(x, y);
      }
      c2d.lineTo(w, h);
      c2d.closePath();
      c2d.fillStyle = color;
      c2d.globalAlpha = 0.55 + depth * 0.45;
      c2d.fill();
    };

    const draw = () => {
      const n = resolved.length;
      ctx.clearRect(0, 0, w, h);
      if (bctx) bctx.clearRect(0, 0, w, h);
      resolved.forEach((color, i) => {
        // with blur, every wave but the front one goes on the soft back layer
        wave(bctx && i < n - 1 ? bctx : ctx, i, n, color);
      });
      ctx.globalAlpha = 1;
      if (bctx) bctx.globalAlpha = 1;
    };

    const loop = () => {
      t += 0.016 * speed;
      pointer.strength += (pointer.target - pointer.strength) * 0.06;
      draw();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.target = 1;
    };
    const onLeave = () => (pointer.target = 0);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf && !reduced) raf = requestAnimationFrame(loop);
    });
    io.observe(wrap);

    if (reduced) draw();
    else raf = requestAnimationFrame(loop);
    if (interactive && !reduced) {
      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [colors, speed, amplitude, baseline, interactive, blur]);

  return (
    <div ref={wrapRef} className={cn("relative isolate overflow-hidden", className)}>
      {blur > 0 && <canvas ref={backRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />}
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />
      {children}
    </div>
  );
}
