import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FillButtonProps = {
  /** Button content. */
  children?: ReactNode;
  /** Water color. Default your theme's primary color */
  color?: string;
  /** Text color once filled. Default your theme's primary-foreground color */
  fillTextColor?: string;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "color">;

/**
 * An outline button that fills with water on hover: the level rises with a rolling wave on top.
 * Pure CSS and SVG; fills instantly for reduced-motion users.
 */
export function FillButton({
  children,
  color = "var(--primary)",
  fillTextColor = "var(--primary-foreground)",
  className,
  style,
  ...rest
}: FillButtonProps) {
  return (
    <button
      className={cn(
        "group/fill relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border-2 bg-transparent px-7 py-3 text-sm font-semibold text-foreground",
        "transition-colors duration-500 outline-none focus-visible:ring-4 focus-visible:ring-ring/50",
        "hover:text-[var(--fill-text)] focus-visible:text-[var(--fill-text)]",
        className,
      )}
      style={{ ...style, borderColor: color, ["--fill" as string]: color, ["--fill-text" as string]: fillTextColor }}
      {...rest}
    >
      <style>{`@keyframes ombak-fill-wave{to{transform:translateX(-50%)}}`}</style>
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[260%] translate-y-full transition-transform duration-700 ease-[cubic-bezier(.3,.7,.3,1)] group-hover/fill:translate-y-[62%] group-focus-visible/fill:translate-y-[62%] motion-reduce:duration-0"
      >
        {/* rolling wave on the water surface */}
        <svg
          viewBox="0 0 240 20"
          preserveAspectRatio="none"
          className="absolute -top-[9px] left-0 h-[10px] w-[200%] [animation:ombak-fill-wave_1.6s_linear_infinite] motion-reduce:animate-none"
          style={{ fill: "var(--fill)" }}
        >
          <path d="M0 10 Q 15 0 30 10 T 60 10 T 90 10 T 120 10 T 150 10 T 180 10 T 210 10 T 240 10 V 20 H 0 Z" />
        </svg>
        <span className="absolute inset-0" style={{ background: "var(--fill)" }} />
      </span>
      <span className="relative">{children}</span>
    </button>
  );
}
