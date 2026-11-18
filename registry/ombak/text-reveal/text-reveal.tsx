"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export type TextRevealProps = {
  children: ReactNode;
  /** HTML tag to render. Default "h2" */
  as?: ElementType;
  /** Split into lines, words or characters. Default "lines" */
  split?: "lines" | "words" | "chars";
  /** "scroll" plays when the text enters the viewport, "load" plays on mount. Default "scroll" */
  trigger?: "scroll" | "load";
  /** Seconds per piece. Default 1 */
  duration?: number;
  /** Seconds between pieces. Default depends on split */
  stagger?: number;
  /** Seconds before starting. Default 0 */
  delay?: number;
  /** Blur-to-sharp while revealing. Default false */
  blur?: boolean;
  /** ScrollTrigger start position. Default "top 85%" */
  start?: string;
  className?: string;
};

const STAGGER = { lines: 0.08, words: 0.04, chars: 0.02 } as const;

/**
 * Masked text reveal: lines, words or letters slide up from behind an invisible mask.
 * Re-splits on resize and after fonts load. Shows plain text for reduced-motion users.
 */
export function TextReveal({
  children,
  as: Tag = "h2",
  split = "lines",
  trigger = "scroll",
  duration = 1,
  stagger,
  delay = 0,
  blur = false,
  start = "top 85%",
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      SplitText.create(el, {
        type: split === "chars" ? "lines,words,chars" : split === "words" ? "lines,words" : "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          const targets = split === "chars" ? self.chars : split === "words" ? self.words : self.lines;
          return gsap.fromTo(
            targets,
            { yPercent: 115, opacity: blur ? 0 : 1, filter: blur ? "blur(8px)" : undefined },
            {
              yPercent: 0,
              opacity: 1,
              filter: blur ? "blur(0px)" : undefined,
              duration,
              delay,
              stagger: stagger ?? STAGGER[split],
              ease: "expo.out",
              scrollTrigger: trigger === "scroll" ? { trigger: el, start, once: true } : undefined,
            },
          );
        },
      });
    },
    { scope: ref, dependencies: [split, trigger, duration, stagger, delay, blur, start] },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
