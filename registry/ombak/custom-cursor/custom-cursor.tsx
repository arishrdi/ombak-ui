"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export type CustomCursorProps = {
  /** Cursor color. Default "#ffffff" */
  color?: string;
  /** Ring diameter in px. Default 36 */
  size?: number;
  /** Ring diameter over links, buttons and [data-cursor]. Default 64 */
  hoverSize?: number;
  /** Diameter over an element with data-cursor-label. Default 92 */
  labelSize?: number;
  /** Invert against the page using mix-blend-mode: difference. Default true */
  blend?: boolean;
  /** Hide the system cursor. Default false */
  hideNative?: boolean;
  /** Elements that make the ring grow. Default "a, button, [data-cursor]" */
  hoverSelector?: string;
};

/**
 * A dot plus trailing ring that grows over interactive elements and can show a label: add
 * data-cursor-label="View" to any element. Mount it once, e.g. in your root layout.
 * Turns itself off on touch devices and for reduced-motion users.
 */
export function CustomCursor({
  color = "#ffffff",
  size = 36,
  hoverSize = 64,
  labelSize = 92,
  blend = true,
  hideNative = false,
  hoverSelector = "a, button, [data-cursor]",
}: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const root = document.documentElement;
    let hideStyle: HTMLStyleElement | null = null;
    if (hideNative) {
      hideStyle = document.createElement("style");
      hideStyle.textContent = "*, *::before, *::after { cursor: none !important; }";
      document.head.appendChild(hideStyle);
    }
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    let shown = false;

    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as Element;
      const hit = target.closest(`${hoverSelector}, [data-cursor-label]`);
      const text = target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") ?? "";
      const d = text ? labelSize : hit ? hoverSize : size;
      label.textContent = text;
      ring.style.mixBlendMode = text || !blend ? "normal" : "difference";
      gsap.to(ring, { width: d, height: d, backgroundColor: text ? color : "rgba(0,0,0,0)", duration: 0.4, ease: "power3.out" });
      gsap.to(label, { autoAlpha: text ? 1 : 0, duration: 0.2 });
      gsap.to(dot, { scale: hit ? 0 : 1, duration: 0.3 });
    };
    const hide = () => {
      shown = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
    };
    const down = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
    const up = () => gsap.to(ring, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    root.addEventListener("pointerleave", hide);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      hideStyle?.remove();
    };
  }, [color, size, hoverSize, labelSize, blend, hideNative, hoverSelector]);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] grid place-items-center rounded-full opacity-0"
        style={{ width: size, height: size, border: `1.5px solid ${color}`, mixBlendMode: blend ? "difference" : "normal" }}
      >
        <span ref={labelRef} className="text-[13px] font-semibold whitespace-nowrap text-black opacity-0" />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] size-1.5 rounded-full opacity-0"
        style={{ background: color, mixBlendMode: blend ? "difference" : "normal" }}
      />
    </>
  );
}
