"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const MAX_COPIES = 20;

export type MarqueeProps = {
  children: ReactNode;
  /** Pixels per second. Default 80 */
  speed?: number;
  /** Direction of travel. Default "left" */
  direction?: "left" | "right";
  /** Ease to a stop while hovered. Default true */
  pauseOnHover?: boolean;
  /** Speed up with scroll and flip direction when scrolling up. Default true */
  scrollReactive?: boolean;
  /** Fade the left and right edges. Default true */
  fade?: boolean;
  /** Space between items (and between repeated copies), any CSS length. Default "3rem" */
  gap?: string;
  className?: string;
};

/**
 * A seamless infinite marquee. Fills any width, reacts to scroll speed and direction,
 * and eases to a stop on hover. Never stretches its parent, even inside grid or flex.
 */
export function Marquee({
  children,
  speed = 80,
  direction = "left",
  pauseOnHover = true,
  scrollReactive = true,
  fade = true,
  gap = "3rem",
  className,
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const root = rootRef.current;
    const first = firstRef.current;
    if (!root || !first) return;
    const measure = () => {
      const w = first.offsetWidth;
      if (w > 0) setCopies(Math.min(MAX_COPIES, Math.max(2, Math.ceil(root.clientWidth / w) + 1)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    ro.observe(first);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const first = firstRef.current;
    if (!root || !track || !first) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const baseDir = direction === "left" ? -1 : 1;
    let dir = baseDir;
    let x = 0;
    let boost = 0;
    const hover = { v: 1 };
    const setX = gsap.quickSetter(track, "x", "px");

    const tick = (_t: number, deltaMs: number) => {
      const width = first.offsetWidth;
      if (!width) return;
      x = gsap.utils.wrap(-width, 0, x + dir * (speed + boost) * (deltaMs / 1000) * hover.v);
      setX(x);
      boost *= 0.92;
    };
    gsap.ticker.add(tick);

    const st = scrollReactive
      ? ScrollTrigger.create({
          onUpdate(self) {
            boost = Math.min(Math.abs(self.getVelocity()) * 0.3, speed * 6);
            dir = self.direction === 1 ? baseDir : -baseDir;
          },
        })
      : null;

    const enter = () => pauseOnHover && gsap.to(hover, { v: 0, duration: 0.6, ease: "power2.out" });
    const leave = () => gsap.to(hover, { v: 1, duration: 0.6, ease: "power2.in" });
    root.addEventListener("pointerenter", enter);
    root.addEventListener("pointerleave", leave);
    return () => {
      gsap.ticker.remove(tick);
      st?.kill();
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
    };
  }, [speed, direction, pauseOnHover, scrollReactive]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "w-full min-w-0 overflow-hidden [contain:inline-size]",
        fade && "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? firstRef : undefined}
            aria-hidden={i > 0 || undefined}
            className="flex shrink-0 items-center"
            style={{ gap, paddingRight: gap }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
