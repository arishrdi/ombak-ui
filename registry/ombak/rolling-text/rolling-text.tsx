import { type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/utils";

export type RollingTextProps = {
  /** Plain text to roll. */
  text: string;
  /** HTML tag to render. Default "span" */
  as?: ElementType;
  /** Milliseconds between letters. Default 18 */
  stagger?: number;
  /** Milliseconds per letter. Default 450 */
  duration?: number;
  className?: string;
};

/**
 * Letters roll up one after another on hover, revealing a copy underneath.
 * Pure CSS with no JavaScript, so it also works in Server Components. To roll when a parent
 * link or button is hovered, give that parent the Tailwind class `group/roll`.
 */
export function RollingText({ text, as: Tag = "span", stagger = 18, duration = 450, className }: RollingTextProps) {
  return (
    <Tag aria-label={text} className={cn("group/roll inline-flex overflow-hidden align-bottom leading-[1.15]", className)}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block [text-shadow:0_1.15em_currentColor] transition-transform ease-[cubic-bezier(.7,0,.2,1)] group-hover/roll:-translate-y-[1.15em] group-focus-visible/roll:-translate-y-[1.15em] motion-reduce:transition-none"
          style={{ transitionDuration: `${duration}ms`, transitionDelay: `${i * stagger}ms` } as CSSProperties}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </Tag>
  );
}
