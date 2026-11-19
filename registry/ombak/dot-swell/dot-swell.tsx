"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DotSwellProps = {
  /** Content rendered on top. */
  children?: ReactNode;
  /** Dot color. Default "currentColor" (set it with a text-* class) */
  color?: string;
  /** Columns of dots across the surface. Default 48 */
  columns?: number;
  /** Rows of dots from front to back. Default 22 */
  rows?: number;
  /** Wave height in px. Default 26 */
  amplitude?: number;
  /** Animation speed multiplier. Default 1 */
  speed?: number;
  /** The surface bulges up under the cursor. Default true */
  interactive?: boolean;
  className?: string;
};

/**
 * An ocean surface drawn as a field of dots in perspective, rolling with layered swells. Nearer dots
 * are larger and brighter, and the surface lifts toward the cursor. Canvas 2D; pauses off-screen and
 * holds still for reduced-motion users.
 */
export function DotSwell({
  children,
  color = "currentColor",
  columns = 48,
  rows = 22,
  amplitude = 26,
  speed = 1,
  interactive = true,
  className,
}: DotSwellProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fill = color === "currentColor" ? getComputedStyle(wrap).color : color;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const pointer = { x: 0.5, y: 2, on: 0 }; // normalized; y > 1 means "not over the surface"
    let lift = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = fill;
      const horizon = h * 0.28;
      for (let j = 0; j < rows; j++) {
        const z = j / (rows - 1); // 0 = far, 1 = near
        const depth = 0.25 + z * z * 0.75; // perspective scale
        const baseY = horizon + (h - horizon) * (z * z * 0.85 + z * 0.15);
        const spread = w * (0.55 + depth * 0.9);
        for (let i = 0; i < columns; i++) {
          const u = i / (columns - 1);
          const x = w / 2 + (u - 0.5) * spread;
          const wave =
            Math.sin(u * 7 + t * 1.1 + z * 4) * 0.55 + Math.sin(u * 13 - t * 0.7 + z * 9) * 0.25 + Math.sin(z * 6 - t * 1.6) * 0.35;
          const dx = (x / w - pointer.x) * 1.6;
          const dz = (z - pointer.y) * 2.2;
          const bump = Math.exp(-(dx * dx + dz * dz) * 6) * lift;
          const y = baseY - (wave * amplitude + bump * amplitude * 2.2) * depth;
          if (x < -10 || x > w + 10) continue;
          ctx.globalAlpha = 0.15 + depth * 0.7 + bump * 0.3;
          ctx.beginPath();
          ctx.arc(x, y, 0.5 + depth * 1.9 + bump * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      lift += ((pointer.on ? 1 : 0) - lift) * 0.06;
      draw((now / 1000) * speed);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      const horizon = r.height * 0.28;
      const py = e.clientY - r.top;
      pointer.x = (e.clientX - r.left) / r.width;
      // map screen y back to approximate depth on the surface
      const zz = Math.max(0, Math.min(1, (py - horizon) / (r.height - horizon)));
      pointer.y = Math.sqrt(zz);
      pointer.on = py > horizon ? 1 : 0;
    };
    const onLeave = () => {
      pointer.on = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    if (reduced) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
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
  }, [color, columns, rows, amplitude, speed, interactive]);

  return (
    <div ref={wrapRef} className={cn("relative isolate overflow-hidden text-cyan-300", className)}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />
      {children}
    </div>
  );
}
