"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RippleGridProps = {
  /** Content rendered on top of the grid. */
  children?: ReactNode;
  /** Distance between dots in px. Default 22 */
  gap?: number;
  /** Dot radius in px. Default 1.4 */
  dotSize?: number;
  /** Dot color. Any CSS color; defaults to the element's text color. Default "currentColor" */
  color?: string;
  /** Ripples follow the cursor and clicks. Default true */
  interactive?: boolean;
  /** Drop a ripple at a random spot every few seconds. Default true */
  autoRipple?: boolean;
  /** How far dots get pushed by a ripple, in px. Default 6 */
  strength?: number;
  className?: string;
};

type Ripple = { x: number; y: number; t: number; power: number };

/**
 * A calm dot grid that ripples like water: under the cursor, on click, and on its own now and then.
 * Pauses off-screen and draws a still grid for reduced-motion users.
 */
export function RippleGrid({
  children,
  gap = 22,
  dotSize = 1.4,
  color = "currentColor",
  interactive = true,
  autoRipple = true,
  strength = 6,
  className,
}: RippleGridProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fill = color === "currentColor" ? getComputedStyle(wrap).color : color;
    const ripples: Ripple[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let lastMove = 0;
    let lastAuto = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = fill;
      const ox = (w % gap) / 2;
      const oy = (h % gap) / 2;
      for (let x = ox; x <= w; x += gap) {
        for (let y = oy; y <= h; y += gap) {
          let push = 0;
          let dx = 0;
          let dy = 0;
          for (const r of ripples) {
            const age = (now - r.t) / 1000;
            const d = Math.hypot(x - r.x, y - r.y) || 1;
            const ring = Math.exp(-(((d - age * 260) / 34) ** 2)) * Math.max(0, 1 - age / 2.2) * r.power;
            if (ring > 0.01) {
              push += ring;
              dx += ((x - r.x) / d) * ring;
              dy += ((y - r.y) / d) * ring;
            }
          }
          ctx.globalAlpha = Math.min(1, 0.22 + push * 0.8);
          ctx.beginPath();
          ctx.arc(x + dx * strength, y + dy * strength, dotSize * (1 + push * 1.2), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const addRipple = (x: number, y: number, power = 1) => {
      ripples.push({ x, y, t: performance.now(), power });
      if (ripples.length > 8) ripples.shift();
    };

    const loop = (now: number) => {
      while (ripples.length && now - ripples[0].t > 2400) ripples.shift();
      if (autoRipple && now - lastAuto > 3200) {
        lastAuto = now;
        addRipple(Math.random() * w, Math.random() * h, 0.8);
      }
      draw(now);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const local = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top] as const;
    };
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMove < 140) return; // a gentle trail, not a storm
      lastMove = now;
      const [x, y] = local(e);
      addRipple(x, y, 0.55);
    };
    const onDown = (e: PointerEvent) => {
      const [x, y] = local(e);
      addRipple(x, y, 1.4);
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
      wrap.addEventListener("pointerdown", onDown);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
    };
  }, [gap, dotSize, color, interactive, autoRipple, strength]);

  return (
    <div ref={wrapRef} className={cn("relative isolate overflow-hidden text-muted-foreground", className)}>
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10" />
      {children}
    </div>
  );
}
