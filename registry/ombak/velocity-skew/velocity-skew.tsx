"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export type VelocitySkewProps = {
  children: ReactNode;
  /** Maximum skew in degrees. Default 8 */
  max?: number;
  /** How strongly scroll speed turns into skew. Default 1 */
  sensitivity?: number;
  className?: string;
};

/**
 * Leans its content with the speed of the scroll, then settles back, like objects carried by a
 * current. Great on image grids and big headlines. Inactive for reduced-motion users.
 */
export function VelocitySkew({ children, max = 8, sensitivity = 1, className }: VelocitySkewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const skewTo = gsap.quickTo(el, "skewY", { duration: 0.6, ease: "power3.out" });
    const clamp = gsap.utils.clamp(-max, max);
    let settle: gsap.core.Tween | null = null;
    const st = ScrollTrigger.create({
      onUpdate(self) {
        skewTo(clamp((self.getVelocity() / -300) * sensitivity));
        settle?.kill();
        settle = gsap.delayedCall(0.12, () => skewTo(0));
      },
    });
    return () => {
      st.kill();
      settle?.kill();
      gsap.set(el, { skewY: 0 });
    };
  }, [max, sensitivity]);

  return (
    <div ref={ref} className={cn("origin-center will-change-transform", className)}>
      {children}
    </div>
  );
}
