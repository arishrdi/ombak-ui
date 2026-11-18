"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export type TiltCardProps = {
  children: ReactNode;
  /** Maximum tilt in degrees. Default 10 */
  max?: number;
  /** Scale while hovered. Default 1.03 */
  scale?: number;
  /** Glossy highlight that follows the cursor. Default true */
  glare?: boolean;
  /** CSS perspective in px. Default 900 */
  perspective?: number;
  className?: string;
};

/** A card that leans toward the cursor in 3D, with a glare highlight and an elastic return. */
export function TiltCard({ children, max = 10, scale = 1.03, glare = true, perspective = 900, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * 2 * max);
      rx(-(py - 0.5) * 2 * max);
      glareRef.current?.style.setProperty("--gx", `${px * 100}%`);
      glareRef.current?.style.setProperty("--gy", `${py * 100}%`);
    };
    const enter = () => {
      gsap.to(el, { scale, duration: 0.4, ease: "power3.out" });
      if (glareRef.current) gsap.to(glareRef.current, { opacity: 1, duration: 0.3 });
    };
    const leave = () => {
      gsap.to(el, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" });
      if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.3 });
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max, scale]);

  return (
    <div style={{ perspective }}>
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl border bg-card text-card-foreground [transform-style:preserve-3d] will-change-transform",
          className,
        )}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay [background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),rgba(255,255,255,.45),transparent_55%)]"
          />
        )}
      </div>
    </div>
  );
}
