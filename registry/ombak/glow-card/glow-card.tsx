"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GlowCardProps = {
  children: ReactNode;
  /** Glow color. Any CSS color. Default "rgba(94, 240, 200, 0.9)" */
  color?: string;
  /** Glow radius in px. Default 320 */
  size?: number;
  /** Also light up the card's surface, not just its border. Default true */
  surface?: boolean;
  className?: string;
};

/**
 * A card whose border lights up where the cursor is, like sunlight catching the edge of a wave.
 * The glow follows the cursor even from outside the card, so a grid of cards glows together.
 */
export function GlowCard({ children, color = "rgba(94, 240, 200, 0.9)", size = 320, surface = true, className }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        // fade out as the cursor gets far from the card
        const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
        const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
        const near = Math.max(0, 1 - Math.hypot(dx, dy) / (size * 0.8));
        el.style.setProperty("--glow-x", `${x}px`);
        el.style.setProperty("--glow-y", `${y}px`);
        el.style.setProperty("--glow-o", near.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [size]);

  const glow = `radial-gradient(${size}px circle at var(--glow-x, -999px) var(--glow-y, -999px), ${color}, transparent 70%)`;

  return (
    <div ref={ref} className={cn("group relative rounded-xl bg-border p-px", className)}>
      {/* border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{ background: glow, opacity: "var(--glow-o, 0)" }}
      />
      <div className="relative h-full overflow-hidden rounded-[calc(var(--radius,0.75rem)+3px)] bg-card text-card-foreground">
        {surface && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-[0.12]"
            style={{ background: glow }}
          />
        )}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
