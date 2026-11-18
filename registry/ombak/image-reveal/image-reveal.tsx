"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export type ImageRevealProps = {
  /** An image, video or anything visual. */
  children: ReactNode;
  /** Direction the wipe travels. Default "up" */
  from?: "up" | "down" | "left" | "right";
  /** Seconds. Default 1.4 */
  duration?: number;
  /** Seconds before starting. Default 0 */
  delay?: number;
  /** Starting zoom of the content. Default 1.3 */
  zoom?: number;
  className?: string;
};

const CLIP = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 0% 0% 100%)",
  right: "inset(0% 100% 0% 0%)",
} as const;

/** A clip-path wipe that uncovers its content on scroll while the content settles from a zoom. */
export function ImageReveal({ children, from = "up", duration = 1.4, delay = 0, zoom = 1.3, className }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top 80%", once: true }, delay })
        .fromTo(el, { clipPath: CLIP[from] }, { clipPath: "inset(0% 0% 0% 0%)", duration, ease: "expo.inOut" })
        .fromTo(innerRef.current, { scale: zoom }, { scale: 1, duration: duration * 1.2, ease: "expo.out" }, "<");
    },
    { scope: ref, dependencies: [from, duration, delay, zoom] },
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div ref={innerRef} className="size-full [&>img]:size-full [&>img]:object-cover [&>video]:size-full [&>video]:object-cover">
        {children}
      </div>
    </div>
  );
}
