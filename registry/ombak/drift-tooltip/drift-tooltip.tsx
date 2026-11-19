"use client";

import { cloneElement, isValidElement, useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DriftTooltipProps = {
  /** The element that gets the tooltip. Must accept ref-less event props (a button, link, span…). */
  children: ReactElement<Record<string, unknown>>;
  /** Tooltip text or content. */
  content: ReactNode;
  /** Above or below the element. Default "top" */
  side?: "top" | "bottom";
  /** Delay before showing, in ms. Default 120 */
  delay?: number;
  className?: string;
};

/**
 * A tooltip that floats up into place and drifts sideways after the cursor, as if carried by a
 * current, then eases back to center when you leave. Also opens on keyboard focus and is wired with
 * aria-describedby. Holds still for reduced-motion users and skips touch-only hover.
 */
export function DriftTooltip({ children, content, side = "top", delay = 120, className }: DriftTooltipProps) {
  const [open, setOpen] = useState(false);
  const [drift, setDrift] = useState(0);
  const wrap = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const id = useId();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const show = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
    setDrift(0);
  };

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    // -1 … 1 across the element, softened so the tip stays close
    const t = ((e.clientX - r.left) / r.width) * 2 - 1;
    setDrift(Math.max(-1, Math.min(1, t)) * Math.min(r.width / 2, 60));
  };

  const child = isValidElement(children)
    ? cloneElement(children, { "aria-describedby": open ? id : undefined })
    : children;

  return (
    <span
      ref={wrap}
      className="relative inline-flex"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerMove={onMove}
      onPointerLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={(e) => e.key === "Escape" && hide()}
    >
      {child}
      <span
        role="tooltip"
        id={id}
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 w-max max-w-64 rounded-xl bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg",
          "transition-[opacity,translate,transform] duration-300 ease-[cubic-bezier(.3,1.4,.5,1)] motion-reduce:transition-opacity",
          side === "top" ? "bottom-full mb-2.5" : "top-full mt-2.5",
          open ? "opacity-100" : "opacity-0",
          className,
        )}
        style={{
          translate: `calc(-50% + ${drift}px) ${open ? 0 : side === "top" ? 6 : -6}px`,
          transform: open ? "scale(1)" : "scale(.92)",
        }}
      >
        {content}
        <span
          aria-hidden
          className={cn("absolute left-1/2 size-2 -translate-x-1/2 rotate-45 bg-foreground", side === "top" ? "-bottom-1" : "-top-1")}
          style={{ marginLeft: -drift * 0.5 }}
        />
      </span>
    </span>
  );
}
