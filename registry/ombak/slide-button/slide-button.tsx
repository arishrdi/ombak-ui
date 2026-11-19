"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SlideButtonProps = {
  /** Text on the track. Default "Slide to confirm" */
  label?: ReactNode;
  /** Text after confirming. Default "Confirmed" */
  doneLabel?: ReactNode;
  /** Called when the knob reaches the end. */
  onConfirm?: () => void;
  /** How far (0–1) the knob must travel to confirm. Default 0.9 */
  threshold?: number;
  /** Milliseconds before resetting after confirming. 0 keeps it done. Default 2000 */
  resetAfter?: number;
  className?: string;
};

/**
 * "Slide to confirm": drag the knob to the end of the track to trigger the action, so it can't
 * happen by accident. Keyboard users press Enter or the right arrow on the knob.
 */
export function SlideButton({
  label = "Slide to confirm",
  doneLabel = "Confirmed",
  onConfirm,
  threshold = 0.9,
  resetAfter = 2000,
  className,
}: SlideButtonProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLButtonElement>(null);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(false);
  const startX = useRef(0);

  const max = () => (trackRef.current && knobRef.current ? trackRef.current.clientWidth - knobRef.current.offsetWidth - 8 : 1);

  const confirm = () => {
    setX(max());
    setDone(true);
    onConfirm?.();
    if (resetAfter) {
      window.setTimeout(() => {
        setDone(false);
        setX(0);
      }, resetAfter);
    }
  };

  const onDown = (e: PointerEvent<HTMLButtonElement>) => {
    if (done) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startX.current = e.clientX - x;
    setDragging(true);
  };
  const onMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!dragging) return;
    setX(Math.max(0, Math.min(max(), e.clientX - startX.current)));
  };
  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (x / max() >= threshold) confirm();
    else setX(0);
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (done) return;
    if (e.key === "Enter" || e.key === "ArrowRight" || e.key === "End") {
      e.preventDefault();
      confirm();
    }
  };

  const progress = x / max();

  return (
    <div
      ref={trackRef}
      className={cn("relative h-14 w-72 overflow-hidden rounded-full border bg-muted/60 p-1 select-none touch-none", className)}
    >
      {/* fill behind the knob */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 rounded-full bg-emerald-500/25"
        style={{ width: `calc(${x}px + 3.5rem)`, transition: dragging ? "none" : "width 350ms cubic-bezier(.2,.8,.2,1)" }}
      />
      <span
        className="pointer-events-none absolute inset-0 grid place-items-center pl-10 text-sm font-medium text-muted-foreground"
        style={{ opacity: done ? 1 : 1 - progress * 1.4 }}
      >
        {done ? doneLabel : label}
      </span>
      <button
        ref={knobRef}
        type="button"
        aria-label={typeof label === "string" ? label : "Slide to confirm"}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={onKey}
        className={cn(
          "relative z-10 grid size-12 cursor-grab place-items-center rounded-full bg-primary text-primary-foreground shadow-md outline-none focus-visible:ring-4 focus-visible:ring-ring/50 active:cursor-grabbing",
          done && "bg-emerald-500 text-white",
        )}
        style={{ transform: `translateX(${x}px)`, transition: dragging ? "none" : "transform 350ms cubic-bezier(.2,.8,.2,1), background-color 200ms" }}
      >
        {done ? (
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        )}
      </button>
    </div>
  );
}
