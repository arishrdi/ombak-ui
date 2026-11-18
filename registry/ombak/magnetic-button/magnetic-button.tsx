"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export type MagneticButtonProps<T extends ElementType = "button"> = {
  /** Render as another element, e.g. "a". From a Server Component, pass a tag name (not a component like Link). Default "button" */
  as?: T;
  children: ReactNode;
  /** How far the button follows the cursor, 0–1. Default 0.35 */
  strength?: number;
  /** Extra pull on the inner label for a layered feel, 0–1. Default 0.2 */
  innerStrength?: number;
  /** Extra space in px around the button where the pull starts. Default 30 */
  radius?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * A button that gets pulled toward the cursor, then springs back elastically.
 * Styled with your theme's primary color; acts as a normal button on touch screens.
 */
export function MagneticButton<T extends ElementType = "button">({
  as,
  children,
  strength = 0.35,
  innerStrength = 0.2,
  radius = 30,
  className,
  ...rest
}: MagneticButtonProps<T>) {
  const Tag = (as ?? "button") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const to = (target: Element, prop: "x" | "y") => gsap.quickTo(target, prop, { duration: 0.6, ease: "power3.out" });
    const [xTo, yTo, ixTo, iyTo] = [to(el, "x"), to(el, "y"), to(inner, "x"), to(inner, "y")];
    let active = false;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.abs(dx) < r.width / 2 + radius && Math.abs(dy) < r.height / 2 + radius) {
        active = true;
        xTo(dx * strength);
        yTo(dy * strength);
        ixTo(dx * innerStrength);
        iyTo(dy * innerStrength);
      } else if (active) {
        active = false;
        gsap.to([el, inner], { x: 0, y: 0, duration: 1.1, ease: "elastic.out(1, 0.35)", overwrite: true });
      }
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.set([el, inner], { x: 0, y: 0 });
    };
  }, [strength, innerStrength, radius]);

  return (
    <Tag
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground",
        "outline-none focus-visible:ring-4 focus-visible:ring-ring/50 will-change-transform",
        className,
      )}
      {...rest}
    >
      <span ref={innerRef} className="inline-flex items-center gap-2">
        {children}
      </span>
    </Tag>
  );
}
