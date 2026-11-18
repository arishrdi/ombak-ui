"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export type HoverPreviewItem = {
  title: ReactNode;
  /** Image shown beside the cursor while this row is hovered. */
  image: string;
  href?: string;
  /** Small text on the right, such as a year or category. */
  meta?: ReactNode;
};

export type HoverPreviewProps = {
  /** The rows of the list. */
  items: HoverPreviewItem[];
  /** Preview width in px. Default 280 */
  width?: number;
  /** Tilt the preview with cursor speed. Default true */
  tilt?: boolean;
  className?: string;
  /** Classes for each row. */
  rowClassName?: string;
};

/**
 * A list where hovering a row floats its image beside the cursor, tilting with your speed.
 * Ideal for project lists, articles and menus. A plain list on touch screens.
 */
export function HoverPreview({ items, width = 280, tilt = true, className, rowClassName }: HoverPreviewProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
    const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });
    const rTo = gsap.quickTo(preview, "rotation", { duration: 0.6, ease: "power3.out" });
    let lastX = 0;

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (tilt) rTo(gsap.utils.clamp(-15, 15, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    };
    const enter = (e: PointerEvent) => {
      gsap.set(preview, { x: e.clientX, y: e.clientY });
      lastX = e.clientX;
      gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
    };
    const leave = () => {
      setActive(null);
      gsap.to(preview, { autoAlpha: 0, scale: 0.6, duration: 0.3, ease: "power3.in" });
    };
    list.addEventListener("pointermove", move);
    list.addEventListener("pointerenter", enter);
    list.addEventListener("pointerleave", leave);
    return () => {
      list.removeEventListener("pointermove", move);
      list.removeEventListener("pointerenter", enter);
      list.removeEventListener("pointerleave", leave);
    };
  }, [tilt]);

  return (
    <>
      <ul ref={listRef} className={cn("w-full divide-y border-y", className)}>
        {items.map((item, i) => {
          const Row = item.href ? "a" : "div";
          return (
            <li
              key={i}
              onPointerEnter={() => setActive(i)}
              className={cn("transition-opacity duration-300", active !== null && active !== i && "opacity-35")}
            >
              <Row
                {...(item.href ? { href: item.href } : {})}
                className={cn("flex items-baseline justify-between gap-4 py-5 text-2xl font-semibold tracking-tight md:text-4xl", rowClassName)}
              >
                <span>{item.title}</span>
                {item.meta != null && <span className="text-sm font-normal text-muted-foreground">{item.meta}</span>}
              </Row>
            </li>
          );
        })}
      </ul>
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none invisible fixed top-0 left-0 z-50 overflow-hidden rounded-lg opacity-0 shadow-2xl"
        style={{ width }}
      >
        {items.map((item, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={item.image}
            alt=""
            className={cn("block w-full transition-opacity duration-200", i === 0 ? "relative" : "absolute inset-0")}
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
      </div>
    </>
  );
}
