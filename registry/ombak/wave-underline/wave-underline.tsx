import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type WaveUnderlineProps = {
  /** Link text. */
  children: ReactNode;
  /** Underline color. Default your theme's primary color */
  color?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "children" | "className" | "color">;

/**
 * A link whose straight underline turns into a rolling wave on hover or focus.
 * Pure CSS and SVG, so it works in Server Components; a still wave for reduced motion.
 */
export function WaveUnderline({ children, color = "var(--primary)", className, ...rest }: WaveUnderlineProps) {
  const wave = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='6' viewBox='0 0 20 6'><path d='M0 3 Q 5 0 10 3 T 20 3' fill='none' stroke='black' stroke-width='1.6'/></svg>`,
  );
  return (
    <a className={cn("group/wu relative inline-block pb-1.5 font-medium outline-none", className)} {...rest}>
      <style>{`@keyframes ombak-wu{to{background-position-x:-20px}}`}</style>
      {children}
      {/* straight line */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left rounded-full transition-transform duration-300 group-hover/wu:scale-x-0 group-focus-visible/wu:scale-x-0"
        style={{ background: color }}
      />
      {/* wave, drawn with a mask so it takes the color */}
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-[2px] h-[6px] scale-x-0 opacity-0 transition-all duration-300 group-hover/wu:scale-x-100 group-hover/wu:opacity-100 group-hover/wu:[animation:ombak-wu_.6s_linear_infinite] group-focus-visible/wu:scale-x-100 group-focus-visible/wu:opacity-100 motion-reduce:!animate-none"
        style={{
          background: color,
          WebkitMaskImage: `url("data:image/svg+xml,${wave}")`,
          maskImage: `url("data:image/svg+xml,${wave}")`,
          WebkitMaskRepeat: "repeat-x",
          maskRepeat: "repeat-x",
          WebkitMaskSize: "20px 6px",
          maskSize: "20px 6px",
        }}
      />
    </a>
  );
}
