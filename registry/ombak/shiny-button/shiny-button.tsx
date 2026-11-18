"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ShinyButtonProps = {
  /** Button content. */
  children?: ReactNode;
  /** "loop" shines every few seconds; "hover" shines when hovered. Default "loop" */
  trigger?: "loop" | "hover";
  /** Seconds between shines in loop mode. Default 3 */
  interval?: number;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

/**
 * A button with a band of light that sweeps across it, like sun glinting off wet glass.
 * Pure CSS; no shine for reduced-motion users.
 */
export function ShinyButton({ children, trigger = "loop", interval = 3, className, style, ...rest }: ShinyButtonProps) {
  return (
    <button
      className={cn(
        "group/shiny relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground",
        "transition-transform duration-150 outline-none focus-visible:ring-4 focus-visible:ring-ring/50 active:scale-[0.97]",
        className,
      )}
      style={{ ...style, ["--shine-interval" as string]: `${interval}s` }}
      {...rest}
    >
      <style>{`@keyframes ombak-shine{0%{transform:translateX(-120%) skewX(-20deg)}40%,100%{transform:translateX(320%) skewX(-20deg)}}`}</style>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 -z-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent motion-reduce:hidden",
          trigger === "loop"
            ? "[animation:ombak-shine_var(--shine-interval)_ease-in-out_infinite]"
            : "-translate-x-[120%] group-hover/shiny:[animation:ombak-shine_1s_ease-out_1]",
        )}
      />
      <span className="relative">{children}</span>
    </button>
  );
}
