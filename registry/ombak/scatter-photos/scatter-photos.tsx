"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ScatterPhoto = {
  /** Image URL. */
  src: string;
  /** Handwritten-style caption under the photo. */
  caption?: ReactNode;
  /** Alternative text. */
  alt?: string;
};

export type ScatterPhotosProps = {
  /** The photos to scatter. */
  photos: ScatterPhoto[];
  /** Photo width in px. Default 160 */
  size?: number;
  /** Area size classes. Default "h-[420px] w-full" */
  className?: string;
};

/**
 * Polaroid photos scattered on a table: drag them around and fling them, they glide to a stop and
 * stay inside the area. The photo you touch comes to the top. Keyboard users can tab through them.
 */
export function ScatterPhotos({ photos, size = 160, className }: ScatterPhotosProps) {
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(area.querySelectorAll<HTMLElement>("[data-photo]"));
    let z = els.length;
    const state = els.map((el, i) => {
      const W = area.clientWidth - el.offsetWidth;
      const H = area.clientHeight - el.offsetHeight;
      // deterministic-looking scatter: spread across the area with a little randomness
      const cols = Math.ceil(Math.sqrt(els.length * (area.clientWidth / Math.max(area.clientHeight, 1))));
      const cx = ((i % cols) + 0.5) / cols;
      const cy = (Math.floor(i / cols) + 0.5) / Math.ceil(els.length / cols);
      return {
        x: Math.max(0, Math.min(W, cx * W + (Math.random() - 0.5) * 60)),
        y: Math.max(0, Math.min(H, cy * H + (Math.random() - 0.5) * 40)),
        r: (Math.random() - 0.5) * 16,
        vx: 0,
        vy: 0,
      };
    });
    const place = (i: number) => {
      const s = state[i];
      els[i].style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.r}deg)`;
    };
    els.forEach((_, i) => place(i));

    let raf = 0;
    const glide = () => {
      let moving = false;
      state.forEach((s, i) => {
        if (Math.abs(s.vx) + Math.abs(s.vy) < 0.05) return;
        const el = els[i];
        const W = area.clientWidth - el.offsetWidth;
        const H = area.clientHeight - el.offsetHeight;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0 || s.x > W) (s.vx *= -0.5), (s.x = Math.max(0, Math.min(W, s.x)));
        if (s.y < 0 || s.y > H) (s.vy *= -0.5), (s.y = Math.max(0, Math.min(H, s.y)));
        s.vx *= 0.88;
        s.vy *= 0.88;
        place(i);
        moving = true;
      });
      raf = moving ? requestAnimationFrame(glide) : 0;
    };

    const cleanups = els.map((el, i) => {
      let start: { px: number; py: number; x: number; y: number } | null = null;
      let lastMove = { x: 0, y: 0, t: 0 };
      const down = (e: PointerEvent) => {
        el.setPointerCapture(e.pointerId);
        el.style.zIndex = String(++z);
        state[i].vx = state[i].vy = 0;
        start = { px: e.clientX, py: e.clientY, x: state[i].x, y: state[i].y };
        lastMove = { x: e.clientX, y: e.clientY, t: performance.now() };
        el.style.cursor = "grabbing";
      };
      const move = (e: PointerEvent) => {
        if (!start) return;
        const W = area.clientWidth - el.offsetWidth;
        const H = area.clientHeight - el.offsetHeight;
        state[i].x = Math.max(0, Math.min(W, start.x + e.clientX - start.px));
        state[i].y = Math.max(0, Math.min(H, start.y + e.clientY - start.py));
        const now = performance.now();
        const dt = Math.max(1, now - lastMove.t) / 16;
        const clampV = (v: number) => Math.max(-24, Math.min(24, v));
        state[i].vx = clampV((e.clientX - lastMove.x) / dt);
        state[i].vy = clampV((e.clientY - lastMove.y) / dt);
        lastMove = { x: e.clientX, y: e.clientY, t: now };
        place(i);
      };
      const up = () => {
        if (!start) return;
        start = null;
        el.style.cursor = "";
        if (!reduced && !raf) raf = requestAnimationFrame(glide);
      };
      const key = (e: KeyboardEvent) => {
        const step = e.shiftKey ? 40 : 12;
        const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
        if (!d) return;
        e.preventDefault();
        const W = area.clientWidth - el.offsetWidth;
        const H = area.clientHeight - el.offsetHeight;
        state[i].x = Math.max(0, Math.min(W, state[i].x + d[0]));
        state[i].y = Math.max(0, Math.min(H, state[i].y + d[1]));
        el.style.zIndex = String(++z);
        place(i);
      };
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      el.addEventListener("keydown", key);
      return () => {
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
        el.removeEventListener("keydown", key);
      };
    });
    return () => {
      cancelAnimationFrame(raf);
      cleanups.forEach((c) => c());
    };
  }, [photos.length, size]);

  return (
    <div ref={areaRef} className={cn("relative h-[420px] w-full touch-none overflow-hidden rounded-2xl", className)}>
      {photos.map((p, i) => (
        <figure
          key={i}
          data-photo
          tabIndex={0}
          aria-label={typeof p.caption === "string" ? `Photo: ${p.caption}. Use arrow keys to move.` : "Photo. Use arrow keys to move."}
          className="absolute top-0 left-0 cursor-grab bg-white p-2 pb-3 shadow-[0_10px_25px_-8px_rgba(0,0,0,.45)] outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/50"
          style={{ width: size }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.alt ?? ""} draggable={false} className="pointer-events-none aspect-square w-full object-cover" />
          {p.caption && <figcaption className="mt-2 text-center font-mono text-xs text-zinc-700">{p.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
