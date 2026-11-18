"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HoldButtonProps = {
  /** Button content while idle. */
  children?: ReactNode;
  /** Content shown after the action is confirmed. Default "Done" */
  doneLabel?: ReactNode;
  /** Milliseconds the button must be held. Default 1200 */
  holdTime?: number;
  /** Called once the hold completes. */
  onConfirm?: () => void;
  /** Milliseconds before the button resets after confirming. 0 keeps it done. Default 1800 */
  resetAfter?: number;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "onClick">;

/**
 * Hold-to-confirm for destructive or important actions: a fill rises while you hold, and the
 * action fires only when it's full. Works with mouse, touch, and Space/Enter held down.
 */
export function HoldButton({
  children,
  doneLabel = "Done",
  holdTime = 1200,
  onConfirm,
  resetAfter = 1800,
  className,
  ...rest
}: HoldButtonProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const raf = useRef(0);
  const startAt = useRef(0);
  const holding = useRef(false);

  const stop = () => {
    holding.current = false;
    cancelAnimationFrame(raf.current);
    if (!done) setProgress(0);
  };
  const start = () => {
    if (done || holding.current) return;
    holding.current = true;
    startAt.current = performance.now();
    const tick = (now: number) => {
      if (!holding.current) return;
      const p = Math.min(1, (now - startAt.current) / holdTime);
      setProgress(p);
      if (p >= 1) {
        holding.current = false;
        setDone(true);
        onConfirm?.();
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (!done || !resetAfter) return;
    const id = window.setTimeout(() => {
      setDone(false);
      setProgress(0);
    }, resetAfter);
    return () => window.clearTimeout(id);
  }, [done, resetAfter]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <button
      type="button"
      aria-live="polite"
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      onKeyDown={(e) => {
        if ((e.key === " " || e.key === "Enter") && !e.repeat) {
          e.preventDefault();
          start();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === " " || e.key === "Enter") stop();
      }}
      onContextMenu={(e) => e.preventDefault()}
      className={cn(
        "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border bg-background px-7 py-3.5 text-sm font-medium text-foreground select-none touch-none",
        "outline-none focus-visible:ring-4 focus-visible:ring-ring/50",
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 bg-red-500/90"
        style={{ width: `${progress * 100}%`, transition: progress === 0 ? "width 300ms ease-out" : "none" }}
      />
      <span className={cn("relative transition-colors", progress > 0.5 || done ? "text-white" : "")}>{done ? doneLabel : children}</span>
    </button>
  );
}
