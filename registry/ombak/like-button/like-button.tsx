"use client";

import { useRef, useState, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type LikeButtonProps = {
  /** Starting like count. Default 0 */
  count?: number;
  /** Start in the liked state. Default false */
  defaultLiked?: boolean;
  /** Called with the new state after each toggle. */
  onChange?: (liked: boolean, count: number) => void;
  /** Heart and burst color. Default "#f43f5e" */
  color?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "onChange">;

/**
 * A heart that pops and bursts into tiny particles when liked, with a rolling count.
 * Uses aria-pressed so screen readers know whether it's liked.
 */
export function LikeButton({ count = 0, defaultLiked = false, onChange, color = "#f43f5e", className, ...rest }: LikeButtonProps) {
  const [liked, setLiked] = useState(defaultLiked);
  const [n, setN] = useState(count);
  const heartRef = useRef<HTMLSpanElement>(null);

  const burst = () => {
    const host = heartRef.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    host.animate([{ transform: "scale(1)" }, { transform: "scale(0.7)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }], {
      duration: 450,
      easing: "ease-out",
    });
    for (let i = 0; i < 10; i++) {
      const dot = document.createElement("span");
      const a = (i / 10) * Math.PI * 2;
      Object.assign(dot.style, {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "5px",
        height: "5px",
        margin: "-2.5px",
        borderRadius: "9999px",
        background: i % 2 ? color : "#fbbf24",
        pointerEvents: "none",
      });
      host.appendChild(dot);
      dot
        .animate(
          [
            { transform: "translate(0,0) scale(1)", opacity: 1 },
            { transform: `translate(${Math.cos(a) * 20}px, ${Math.sin(a) * 20}px) scale(0.2)`, opacity: 0 },
          ],
          { duration: 500, easing: "cubic-bezier(.2,.7,.3,1)" },
        )
        .finished.then(() => dot.remove(), () => dot.remove());
    }
  };

  const toggle = () => {
    const next = !liked;
    const nextN = n + (next ? 1 : -1);
    setLiked(next);
    setN(nextN);
    if (next) burst();
    onChange?.(next, nextN);
  };

  return (
    <button
      type="button"
      aria-pressed={liked}
      aria-label={liked ? "Unlike" : "Like"}
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium tabular-nums text-foreground transition-colors hover:bg-muted",
        "outline-none focus-visible:ring-4 focus-visible:ring-ring/50",
        className,
      )}
      {...rest}
    >
      <span ref={heartRef} className="relative inline-grid size-5 place-items-center">
        <svg viewBox="0 0 24 24" className="size-5 transition-colors duration-200" style={{ color: liked ? color : undefined }}>
          <path
            d="M12 21s-7.5-4.6-9.6-9.2C.9 8.6 3 5 6.6 5c2.1 0 3.6 1.2 4.4 2.5C11.8 6.2 13.3 5 15.4 5 19 5 21.1 8.6 19.6 11.8 17.5 16.4 12 21 12 21z"
            fill={liked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="relative inline-block h-5 overflow-hidden">
        <span key={n} className="block animate-[ombak-like-roll_.3s_ease-out]">
          {n.toLocaleString()}
        </span>
      </span>
      <style>{`@keyframes ombak-like-roll{from{transform:translateY(${liked ? "100%" : "-100%"});opacity:0}to{transform:none;opacity:1}}@media (prefers-reduced-motion:reduce){[class*="ombak-like-roll"]{animation:none!important}}`}</style>
    </button>
  );
}
