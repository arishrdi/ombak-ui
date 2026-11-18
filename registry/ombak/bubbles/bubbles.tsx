"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BubblesProps = {
  /** Content rendered on top of the bubbles. */
  children?: ReactNode;
  /** Number of bubbles. Default 40 */
  count?: number;
  /** Bubble color. Any CSS color; defaults to the element's text color. Default "currentColor" */
  color?: string;
  /** Smallest bubble radius in px. Default 2 */
  minSize?: number;
  /** Largest bubble radius in px. Default 12 */
  maxSize?: number;
  /** Rising speed multiplier. Default 1 */
  speed?: number;
  /** Bubbles drift away from the cursor. Default true */
  interactive?: boolean;
  className?: string;
};

type Bubble = { x: number; y: number; r: number; vy: number; phase: number; wobble: number; px: number };

/**
 * Soft bubbles rising and wobbling like air under water. They drift away from the cursor.
 * Pauses off-screen; shows a still scatter for reduced-motion users.
 */
export function Bubbles({
  children,
  count = 40,
  color = "currentColor",
  minSize = 2,
  maxSize = 12,
  speed = 1,
  interactive = true,
  className,
}: BubblesProps) {
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
    const pointer = { x: -9999, y: -9999 };

    const spawn = (anywhere: boolean): Bubble => {
      const r = minSize + Math.random() ** 2 * (maxSize - minSize);
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + r + Math.random() * 40,
        r,
        vy: 18 + (maxSize - r) * 2.2 + Math.random() * 10,
        phase: Math.random() * Math.PI * 2,
        wobble: 6 + Math.random() * 10,
        px: 0,
      };
    };
    let bubbles: Bubble[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bubbles = Array.from({ length: count }, () => spawn(true));
      draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = stroke;
      ctx.fillStyle = stroke;
      for (const b of bubbles) {
        const x = b.x + Math.sin(t * 1.4 + b.phase) * b.wobble + b.px;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.08;
        ctx.fill();
        // tiny highlight
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(x - b.r * 0.35, b.y - b.r * 0.35, Math.max(0.6, b.r * 0.18), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;
      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        b.y -= b.vy * speed * dt;
        if (interactive) {
          const dx = b.x + b.px - pointer.x;
          const dy = b.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < 110) b.px += (dx / (d || 1)) * (110 - d) * 0.08;
        }
        b.px *= 0.96;
        if (b.y < -b.r * 2) bubbles[i] = spawn(false);
      }
      draw(t);
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
    if (interactive) {
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
  }, [count, color, minSize, maxSize, speed, interactive]);

  return (
    <div ref={wrapRef} className={cn("relative isolate overflow-hidden text-sky-300", className)}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />
      {children}
    </div>
  );
}
