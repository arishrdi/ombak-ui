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
    let t = Math.random() * 100;
    const pointer = { x: 0.5, strength: 0, target: 0 };

    // resolve CSS variables like var(--surf) into real colors
    const resolved = colors.map((c) => {
      if (!c.startsWith("var(")) return c;
      const name = c.slice(4, -1).trim();
      return getComputedStyle(wrap).getPropertyValue(name).trim() || "#0ea5e9";
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
      if (reduced) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const n = resolved.length;
      resolved.forEach((color, i) => {
        const depth = (i + 1) / n; // 0..1, front waves are taller and faster
        const amp = h * amplitude * (0.55 + depth * 0.6);
        const yBase = h * baseline + (i - (n - 1) / 2) * h * 0.06;
        const freq = (Math.PI * 2) / (w * (1.1 - depth * 0.45));
        const phase = t * (0.35 + depth * 0.5) + i * 1.7;
        ctx.save();
        if (blur > 0 && i < n - 1) ctx.filter = `blur(${blur * (1 - depth)}px)`;
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w + 8; x += 8) {
          const swell = interactive ? Math.exp(-(((x / w - pointer.x) * 4) ** 2)) * pointer.strength * h * 0.08 * depth : 0;
          const y =
            yBase +
            Math.sin(x * freq + phase) * amp * 0.6 +
            Math.sin(x * freq * 2.3 - phase * 1.3) * amp * 0.25 -
            swell;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.55 + depth * 0.45;
        ctx.fill();
        ctx.restore();
      });
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
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />
      {children}
    </div>
  );
}
