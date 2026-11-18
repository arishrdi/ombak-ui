"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ScratchCardProps = {
  /** The prize underneath. */
  children: ReactNode;
  /** Color of the scratch-off layer. Default "#94a3b8" */
  coverColor?: string;
  /** Text printed on the cover. Default "Scratch here" */
  coverLabel?: string;
  /** Brush radius in px. Default 22 */
  brush?: number;
  /** Share of the card (0–1) that must be cleared to reveal it all. Default 0.5 */
  revealAt?: number;
  /** Called once the card is fully revealed. */
  onReveal?: () => void;
  /** Size classes. Default "h-40 w-72" */
  className?: string;
};

/**
 * A scratch-off card: rub the cover with a mouse or finger to uncover the prize. Once enough is
 * cleared, the rest fades away. Keyboard and screen-reader users get a "Reveal" button.
 */
export function ScratchCard({
  children,
  coverColor = "#94a3b8",
  coverLabel = "Scratch here",
  brush = 22,
  revealAt = 0.5,
  onReveal,
  className,
}: ScratchCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  // keep the latest callback without re-painting the cover when it changes
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!wrap || !canvas || !ctx || revealed) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    // paint the cover: base color, a little sparkle, and the label
    ctx.fillStyle = coverColor;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 140; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.25})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
    ctx.fillStyle = "rgba(255,255,255,.9)";
    ctx.font = "600 15px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(coverLabel, w / 2, h / 2);

    let drawing = false;
    let last: [number, number] | null = null;
    let strokes = 0;

    const cleared = () => {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      for (let i = 3; i < data.length; i += 4 * 16) if (data[i] === 0) clear++;
      return clear / (data.length / (4 * 16));
    };
    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round";
      ctx.lineWidth = brush * 2;
      ctx.beginPath();
      if (last) ctx.moveTo(...last);
      else ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
      last = [x, y];
      if (++strokes % 8 === 0 && cleared() >= revealAt) finish();
    };
    const finish = () => {
      drawing = false;
      canvas.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: "forwards" }).finished.then(() => {
        setRevealed(true);
        onRevealRef.current?.();
      });
    };
    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top] as const;
    };
    const down = (e: PointerEvent) => {
      drawing = true;
      last = null;
      canvas.setPointerCapture(e.pointerId);
      scratch(...pos(e));
    };
    const move = (e: PointerEvent) => drawing && scratch(...pos(e));
    const up = () => {
      drawing = false;
      last = null;
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, [coverColor, coverLabel, brush, revealAt, revealed]);

  return (
    <div ref={wrapRef} className={cn("relative h-40 w-72 touch-none overflow-hidden rounded-2xl border bg-card text-card-foreground select-none", className)}>
      <div className="grid size-full place-items-center">{children}</div>
      {!revealed && (
        <>
          <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full cursor-crosshair" />
          <button
            type="button"
            onClick={() => {
              setRevealed(true);
              onRevealRef.current?.();
            }}
            className="sr-only focus:not-sr-only focus:absolute focus:right-2 focus:bottom-2 focus:rounded-md focus:bg-background focus:px-2 focus:py-1 focus:text-xs"
          >
            Reveal
          </button>
        </>
      )}
    </div>
  );
}
