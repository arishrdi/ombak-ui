"use client";

import { useRef, type ButtonHTMLAttributes, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RippleButtonProps = {
  /** Ripple color. Any CSS color. Default "rgba(255, 255, 255, 0.45)" */
  rippleColor?: string;
  /** Milliseconds for one ripple. Default 750 */
  duration?: number;
  /** Button content. */
  children?: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

/**
 * A button that sends rings of water out from the exact point you press, plus a soft press-in.
 * Styled with your theme's primary color; works with mouse, touch and keyboard.
 */
export function RippleButton({
  rippleColor = "rgba(255, 255, 255, 0.45)",
  duration = 750,
  className,
  children,
  onPointerDown,
  onKeyDown,
  ...rest
}: RippleButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const ripple = (x: number, y: number) => {
    const btn = ref.current;
    if (!btn || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = btn.getBoundingClientRect();
    const size = Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y)) * 2;
    for (const [delay, alpha] of [
      [0, 1],
      [120, 0.5],
    ]) {
      const ring = document.createElement("span");
      Object.assign(ring.style, {
        position: "absolute",
        left: `${x - size / 2}px`,
        top: `${y - size / 2}px`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "9999px",
        background: rippleColor,
        pointerEvents: "none",
        opacity: "0",
        zIndex: "-1", // behind the label, above the button background
      });
      btn.appendChild(ring);
      ring
        .animate(
          [
            { transform: "scale(0)", opacity: alpha },
            { transform: "scale(1)", opacity: 0 },
          ],
          { duration, delay, easing: "cubic-bezier(.2,.7,.3,1)" },
        )
        .finished.then(() => ring.remove(), () => ring.remove());
    }
  };

  const handleDown = (e: PointerEvent<HTMLButtonElement>) => {
    onPointerDown?.(e);
    const r = e.currentTarget.getBoundingClientRect();
    ripple(e.clientX - r.left, e.clientY - r.top);
  };

  return (
    <button
      ref={ref}
      onPointerDown={handleDown}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Enter" || e.key === " ") {
          const r = e.currentTarget.getBoundingClientRect();
          ripple(r.width / 2, r.height / 2);
        }
      }}
      className={cn(
        "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground",
        "transition-transform duration-150 outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/50 active:scale-[0.97]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
