"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CurrentLinesProps = {
  /** Content rendered on top of the lines. */
  children?: ReactNode;
  /** Line color. Any CSS color; defaults to the element's text color. Default "currentColor" */
  color?: string;
  /** Particles per 10,000 px² of area. Default 1.4 */
  density?: number;
  /** Flow speed multiplier. Default 1 */
  speed?: number;
  /** How long trails linger, 0–1. Higher means longer trails. Default 0.92 */
  trail?: number;
  /** The cursor stirs a whirlpool into the current. Default true */
  interactive?: boolean;
  className?: string;
};

type P = { x: number; y: number; life: number };

/**
 * Thousands of fine lines drifting along an invisible ocean current, leaving soft trails.
 * Move the cursor to stir a whirlpool. Pauses off-screen; static for reduced-motion users.
 */
export function CurrentLines({
  children,
  color = "currentColor",
  density = 1.4,
  speed = 1,
  trail = 0.92,
  interactive = true,
  className,
}: CurrentLinesProps) {
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
    let t = Math.random() * 100;
    let ps: P[] = [];
    const pointer = { x: -1e4, y: -1e4, on: 0 };

    // a smooth pseudo-noise flow field built from layered sines
    const angle = (x: number, y: number) =>
      Math.sin(x * 0.0035 + t * 0.12) * 1.6 +
      Math.cos(y * 0.004 - t * 0.09) * 1.4 +
      Math.sin((x + y) * 0.0018 + t * 0.05) * 1.2;

    const spawn = (): P => ({ x: Math.random() * w, y: Math.random() * h, life: 60 + Math.random() * 180 });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ps = Array.from({ length: Math.round(((w * h) / 10000) * density) }, spawn);
      if (reduced) {
        // pre-run the field so the still frame shows trails
        for (let i = 0; i < 90; i++) step();
      }
    };

    const step = () => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${1 - trail})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      for (const p of ps) {
        let a = angle(p.x, p.y);
        if (pointer.on > 0.01) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < 160) a = a * (d / 160) + (Math.atan2(dy, dx) + Math.PI / 2) * (1 - d / 160) * pointer.on;
        }
        const nx = p.x + Math.cos(a) * 1.6 * speed;
        const ny = p.y + Math.sin(a) * 1.6 * speed;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        p.x = nx;
        p.y = ny;
        if (--p.life < 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) Object.assign(p, spawn());
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
      t += 0.016 * speed;
    };

    const loop = () => {
      pointer.on += ((pointer.x > -1e3 ? 1 : 0) - pointer.on) * 0.05;
      step();
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
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
  }, [color, density, speed, trail, interactive]);

  return (
    <div ref={wrapRef} className={cn("relative isolate overflow-hidden text-sky-300/80", className)}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />
      {children}
    </div>
  );
}
