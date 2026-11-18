"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export type ParallaxImageProps = {
  /** Image URL. */
  src: string;
  /** Alternative text for the image. */
  alt: string;
  /** How far the image drifts inside its frame, 0–0.5. Default 0.15 */
  speed?: number;
  /** Add a slow zoom-out while scrolling. Default true */
  zoom?: boolean;
  /** Passed to the img loading attribute. Default "lazy" */
  loading?: "lazy" | "eager";
  /** Classes for the frame. Set its size or aspect ratio here, e.g. "aspect-[4/5] rounded-xl". */
  className?: string;
};

/**
 * An image that moves slower than the page inside a masked frame.
 * Uses a plain img tag; swap in next/image if you like, the effect stays the same.
 */
export function ParallaxImage({ src, alt, speed = 0.15, zoom = true, loading = "lazy", className }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!ref.current || !imgRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        imgRef.current,
        { yPercent: -speed * 100, scale: zoom ? 1.15 : 1 },
        {
          yPercent: speed * 100,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: ref, dependencies: [speed, zoom] },
  );

  const pad = `${speed * 100 + 2}%`;
  return (
    <div ref={ref} className={cn("relative aspect-[4/3] overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        className="absolute left-0 w-full object-cover will-change-transform"
        style={{ top: `-${pad}`, height: `calc(100% + ${pad} * 2)` }}
      />
    </div>
  );
}
