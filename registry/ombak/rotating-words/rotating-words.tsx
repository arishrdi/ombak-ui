"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";

export type RotatingWordsProps = {
  /** Words to cycle through. */
  words: string[];
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** Milliseconds each word stays. Default 2200 */
  interval?: number;
  className?: string;
};

/**
 * One word slot that rolls to the next word: the old word slides up and out while the new one
 * rises in. The slot resizes to fit each word. Screen readers get the full list once.
 */
export function RotatingWords({ words, as: Tag = "span", interval = 2200, className }: RotatingWordsProps) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const current = useRef(0);

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const cur = current.current;
      const next = (cur + 1) % words.length;
      current.current = next;
      setPrev(cur);
      setI(next);
    }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <Tag className={cn("relative inline-grid overflow-hidden align-bottom", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <style>{`@keyframes ombak-rw-in{from{transform:translateY(100%);opacity:0}}@keyframes ombak-rw-out{to{transform:translateY(-100%);opacity:0}}`}</style>
      {/* invisible sizer keeps the slot as wide as the current word */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {words[i]}
      </span>
      {prev !== null && (
        <span
          key={`out-${prev}-${i}`}
          aria-hidden
          className="col-start-1 row-start-1 whitespace-nowrap [animation:ombak-rw-out_.5s_cubic-bezier(.6,0,.4,1)_forwards]"
        >
          {words[prev]}
        </span>
      )}
      <span
        key={`in-${i}`}
        aria-hidden
        className={cn("col-start-1 row-start-1 whitespace-nowrap", prev !== null && "[animation:ombak-rw-in_.5s_cubic-bezier(.2,.8,.2,1)]")}
      >
        {words[i]}
      </span>
    </Tag>
  );
}
