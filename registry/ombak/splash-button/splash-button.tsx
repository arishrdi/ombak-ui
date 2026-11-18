"use client";

import { useRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SplashButtonProps = {
  /** Droplet colors. Default ocean blues */
  colors?: string[];
  /** Droplets per click. Default 16 */
  count?: number;
  /** How far droplets fly, in px. Default 90 */
  spread?: number;
  /** Button content. */
  children?: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

/**
 * A button that bursts into a splash of droplets that arc out and fall with gravity.
 * Great for "Subscribe", "Like" or "Done". No splash for reduced-motion users.
 */
export function SplashButton({
  colors = ["#5ef0c8", "#38bdf8", "#2dd4bf", "#e0f2fe"],
  count = 16,
  spread = 90,
  className,
  children,
  onClick,
  ...rest
}: SplashButtonProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  const splash = (x: number, y: number) => {
    const wrap = wrapRef.current;
    if (!wrap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let i = 0; i < count; i++) {
      const drop = document.createElement("span");
      const s = 4 + Math.random() * 6;
      Object.assign(drop.style, {
        position: "absolute",
        left: `${x - s / 2}px`,
        top: `${y - s / 2}px`,
        width: `${s}px`,
        height: `${s * 1.25}px`,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        background: colors[i % colors.length],
        pointerEvents: "none",
        zIndex: "10",
      });
      wrap.appendChild(drop);
      // mostly upwards, fanned out; then gravity pulls it down
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;
      const dist = spread * (0.5 + Math.random() * 0.6);
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const frames = Array.from({ length: 9 }, (_, k) => {
        const t = k / 8;
        return {
          // simple projectile: rises, peaks around 60%, then falls back while fading
          transform: `translate(${dx * t}px, ${dy * 1.8 * t + dist * 1.5 * t * t}px) scale(${1 - t * 0.6})`,
          opacity: t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3,
        };
      });
      drop
        .animate(frames, { duration: 700 + Math.random() * 300, easing: "linear" })
        .finished.then(() => drop.remove(), () => drop.remove());
    }
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    // keyboard clicks have no pointer position: splash from the center
    const x = e.clientX || r.left + r.width / 2;
    const y = e.clientY || r.top + r.height / 2;
    splash(x - r.left, y - r.top);
  };

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <button
        onClick={handleClick}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground",
          "transition-transform duration-150 outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/50 active:scale-95",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    </span>
  );
}
