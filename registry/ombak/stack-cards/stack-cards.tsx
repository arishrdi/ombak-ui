"use client";

import { Children, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export type StackCardsProps = {
  /** Each direct child becomes one card. */
  children: ReactNode;
  /** Where cards stick, measured from the top of the viewport. Any CSS length. Default "12vh" */
  top?: string;
  /** Extra offset per card so earlier cards peek out, in px. Default 16 */
  peek?: number;
  /** How much each covered card shrinks. Default 0.05 */
  scaleStep?: number;
  /** Darken covered cards. Default true */
  dim?: boolean;
  className?: string;
};

/**
 * Cards that stick and pile up while you scroll, the covered ones shrinking back.
 * Built on CSS sticky, so scrolling stays smooth.
 */
export function StackCards({ children, top = "12vh", peek = 16, scaleStep = 0.05, dim = true, className }: StackCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root);
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const depth = cards.length - 1 - i;
        gsap.fromTo(
          card.firstElementChild,
          { scale: 1, filter: dim ? "brightness(1)" : undefined },
          {
            scale: 1 - scaleStep * depth,
            filter: dim ? `brightness(${1 - 0.12 * depth})` : undefined,
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              endTrigger: cards[cards.length - 1],
              end: `top ${top}`,
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref, dependencies: [items.length, top, scaleStep, dim] },
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      {items.map((child, i) => (
        <div
          key={i}
          data-stack-card
          className="sticky"
          style={{ top: `calc(${top} + ${i * peek}px)`, marginBottom: i === items.length - 1 ? 0 : "8vh" }}
        >
          <div className="origin-top will-change-transform">{child}</div>
        </div>
      ))}
    </div>
  );
}
