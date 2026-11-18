"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-:";

export type SplitFlapProps = {
  /** Text to show. Change it and the board flips to the new value. */
  text: string;
  /** Number of cells. Defaults to the text length. Shorter text is padded with spaces. */
  length?: number;
  /** Characters each cell cycles through, in order. Default " A–Z 0–9 . - :" */
  chars?: string;
  /** Milliseconds per flip. Default 45 */
  flipSpeed?: number;
  /** Milliseconds between neighbouring cells starting. Default 40 */
  stagger?: number;
  /** Start flipping when scrolled into view (true) or straight away (false). Default true */
  onView?: boolean;
  className?: string;
  /** Classes for each cell, e.g. colors. */
  cellClassName?: string;
};

/**
 * An airport-style departures board. Each letter rattles through the alphabet until it lands on
 * the right one. Screen readers get the plain text; reduced-motion users see it instantly.
 */
export function SplitFlap({
  text,
  length,
  chars = DEFAULT_CHARS,
  flipSpeed = 45,
  stagger = 40,
  onView = true,
  className,
  cellClassName,
}: SplitFlapProps) {
  const size = Math.max(length ?? 0, text.length);
  const target = text.toUpperCase().padEnd(size, " ").slice(0, size);
  const [shown, setShown] = useState(target);
  const rootRef = useRef<HTMLDivElement>(null);
  const shownRef = useRef(target);
  const started = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      shownRef.current = target;
      setShown(target);
      return;
    }
    const timers: number[] = [];
    const run = () => {
      started.current = true;
      // first run starts from blanks; later runs start from what's on the board
      const from = shownRef.current === target ? " ".repeat(size) : shownRef.current.padEnd(size, " ");
      const current = from.split("");
      setShown(current.join(""));
      target.split("").forEach((goal, i) => {
        const start = chars.indexOf(current[i]) < 0 ? 0 : chars.indexOf(current[i]);
        const end = chars.indexOf(goal) < 0 ? 0 : chars.indexOf(goal);
        const steps = (end - start + chars.length) % chars.length;
        for (let s = 1; s <= steps; s++) {
          timers.push(
            window.setTimeout(() => {
              current[i] = chars[(start + s) % chars.length];
              shownRef.current = current.join("");
              setShown(shownRef.current);
              const cell = root.querySelectorAll<HTMLElement>("[data-flap]")[i];
              cell?.animate([{ transform: "rotateX(-80deg)" }, { transform: "rotateX(0)" }], { duration: flipSpeed, easing: "ease-out" });
            }, i * stagger + s * flipSpeed),
          );
        }
      });
    };

    if (!onView || started.current) {
      run();
      return () => timers.forEach(clearTimeout);
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        run();
      }
    });
    io.observe(root);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [target, size, chars, flipSpeed, stagger, onView]);

  return (
    <div ref={rootRef} className={cn("inline-flex gap-[0.08em] font-mono font-semibold [perspective:400px]", className)}>
      <span className="sr-only">{text}</span>
      {shown.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "relative grid h-[1.45em] w-[1em] place-items-center overflow-hidden rounded-[0.14em] bg-zinc-900 text-zinc-50 shadow-[inset_0_-0.06em_0_rgba(0,0,0,.4)]",
            cellClassName,
          )}
        >
          <span data-flap className="block origin-center">
            {ch === " " ? " " : ch}
          </span>
          {/* the hinge line */}
          <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/50" />
        </span>
      ))}
    </div>
  );
}
