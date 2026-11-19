"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

export type CurvedMarqueeProps = {
  /** Text to loop along the curve. A separator like " ✦ " at the end keeps it readable. */
  text: string;
  /** Pixels per second. Default 60 */
  speed?: number;
  /** How tall the wave is (0 = straight line). Default 40 */
  curve?: number;
  /** Font size in px (in the 1000-wide drawing). Default 44 */
  fontSize?: number;
  /** Reverse direction. Default false */
  reverse?: boolean;
  className?: string;
};

/**
 * Text that flows along a wave-shaped line, endlessly. A banner that feels like water.
 * Pauses off-screen; stands still for reduced-motion users.
 */
export function CurvedMarquee({ text, speed = 60, curve = 40, fontSize = 44, reverse = false, className }: CurvedMarqueeProps) {
  const id = `ombak-curve-${useId().replace(/:/g, "")}`;
  const tpRef = useRef<SVGTextPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const H = 120 + curve * 2;
  const mid = H / 2;
  const d = `M -1000 ${mid} Q -875 ${mid - curve} -750 ${mid} T -500 ${mid} T -250 ${mid} T 0 ${mid} T 250 ${mid} T 500 ${mid} T 750 ${mid} T 1000 ${mid} T 1250 ${mid} T 1500 ${mid} T 1750 ${mid} T 2000 ${mid}`;

  useEffect(() => {
    const tp = tpRef.current;
    const m = measureRef.current;
    const svg = svgRef.current;
    if (!tp || !m || !svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const unit = m.getComputedTextLength() || 600; // width of one copy of the text
    let offset = 0;
    let last = performance.now();
    let raf = 0;
    let visible = true;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      offset = (offset + (reverse ? 1 : -1) * speed * dt) % unit;
      tp.setAttribute("startOffset", String(offset));
      raf = visible ? requestAnimationFrame(loop) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    io.observe(svg);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [text, speed, reverse, fontSize]);

  // enough copies to cover the visible part of the path at any offset
  const repeated = Array.from({ length: 12 }, () => text).join("");

  return (
    <svg ref={svgRef} viewBox={`0 0 1000 ${H}`} className={cn("w-full overflow-visible", className)} role="img" aria-label={text}>
      <defs>
        <path id={id} d={d} />
      </defs>
      {/* hidden measuring text, same style as the visible one */}
      <text ref={measureRef} className="fill-current font-bold" style={{ fontSize }} opacity={0} aria-hidden>
        {text}
      </text>
      <text className="fill-current font-bold" style={{ fontSize }} aria-hidden>
        <textPath ref={tpRef} href={`#${id}`} startOffset={0}>
          {repeated}
        </textPath>
      </text>
    </svg>
  );
}
