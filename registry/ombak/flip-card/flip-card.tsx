"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FlipCardProps = {
  /** Front face. */
  front: ReactNode;
  /** Back face. */
  back: ReactNode;
  /** "hover" flips on hover (and focus); "click" flips on click, tap or Enter. Default "hover" */
  trigger?: "hover" | "click";
  /** Flip around the vertical (y) or horizontal (x) axis. Default "y" */
  axis?: "x" | "y";
  /** Milliseconds for the flip. Default 700 */
  duration?: number;
  /** Size the card here, e.g. "h-72 w-56". */
  className?: string;
};

/**
 * A card that turns over in 3D to show its back. Keyboard users can focus it to flip (hover mode)
 * or press Enter/Space (click mode). Fades instead of spinning for reduced-motion users.
 */
export function FlipCard({ front, back, trigger = "hover", axis = "y", duration = 700, className }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const rotate = axis === "y" ? "rotateY(180deg)" : "rotateX(180deg)";
  const click = trigger === "click";

  return (
    <div
      role={click ? "button" : undefined}
      tabIndex={0}
      aria-pressed={click ? flipped : undefined}
      onClick={click ? () => setFlipped((f) => !f) : undefined}
      onKeyDown={(e) => {
        if (click && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      className={cn("group/flip relative h-64 w-52 cursor-pointer rounded-2xl outline-none [perspective:1200px] focus-visible:ring-4 focus-visible:ring-ring/40", className)}
    >
      <div
        className={cn(
          "relative size-full [transform-style:preserve-3d] motion-reduce:!transform-none",
          !click && (axis === "y" ? "group-hover/flip:[transform:rotateY(180deg)] group-focus-visible/flip:[transform:rotateY(180deg)]" : "group-hover/flip:[transform:rotateX(180deg)] group-focus-visible/flip:[transform:rotateX(180deg)]"),
        )}
        style={{
          transition: `transform ${duration}ms cubic-bezier(.3,.7,.2,1)`,
          transform: click && flipped ? rotate : undefined,
        }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl [backface-visibility:hidden]">{front}</div>
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl [backface-visibility:hidden]"
          style={{ transform: rotate }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
