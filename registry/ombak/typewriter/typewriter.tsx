"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { cn } from "@/lib/utils";

export type TypewriterProps = {
  /** Words or phrases to cycle through. */
  words: string[];
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** Milliseconds per typed character. Default 70 */
  typeSpeed?: number;
  /** Milliseconds per deleted character. Default 35 */
  deleteSpeed?: number;
  /** Milliseconds to hold a finished word. Default 1600 */
  pause?: number;
  /** Keep cycling forever; when false, stops on the last word. Default true */
  loop?: boolean;
  /** Show a blinking caret. Default true */
  cursor?: boolean;
  className?: string;
  /** Classes for the caret, e.g. a color. */
  cursorClassName?: string;
};

/**
 * Types a word, pauses, deletes it, and types the next. The first word is rendered on the
 * server for SEO; screen readers get the full list once. Static for reduced-motion users.
 */
export function Typewriter({
  words,
  as: Tag = "span",
  typeSpeed = 70,
  deleteSpeed = 35,
  pause = 1600,
  loop = true,
  cursor = true,
  className,
  cursorClassName,
}: TypewriterProps) {
  const [text, setText] = useState(words[0] ?? "");
  const caretRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let index = 0;
    let shown = words[0];
    let deleting = true;
    let timer = window.setTimeout(step, pause);

    function step() {
      const target = words[index];
      if (deleting) {
        shown = shown.slice(0, -1);
        setText(shown);
        if (!shown) {
          deleting = false;
          index = (index + 1) % words.length;
        }
        timer = window.setTimeout(step, shown ? deleteSpeed : typeSpeed * 3);
        return;
      }
      shown = target.slice(0, shown.length + 1);
      setText(shown);
      if (shown === target) {
        if (!loop && index === words.length - 1) return;
        deleting = true;
        timer = window.setTimeout(step, pause);
      } else {
        timer = window.setTimeout(step, typeSpeed);
      }
    }
    return () => window.clearTimeout(timer);
  }, [words, typeSpeed, deleteSpeed, pause, loop]);

  useEffect(() => {
    const caret = caretRef.current;
    if (!caret || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = caret.animate([{ opacity: 1 }, { opacity: 1, offset: 0.5 }, { opacity: 0, offset: 0.51 }, { opacity: 0 }], {
      duration: 1000,
      iterations: Infinity,
    });
    return () => a.cancel();
  }, []);

  return (
    <Tag className={cn("inline-block", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden>{text}</span>
      {cursor && (
        <span
          ref={caretRef}
          aria-hidden
          className={cn("ml-[0.06em] inline-block w-[0.08em] translate-y-[0.1em] self-stretch bg-current", cursorClassName)}
          style={{ height: "1em" }}
        />
      )}
    </Tag>
  );
}
