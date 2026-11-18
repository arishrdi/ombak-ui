import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SonarButtonProps = {
  /** Button content. */
  children?: ReactNode;
  /** Ring color. Default your theme's primary color */
  color?: string;
  /** Number of rings in flight. Default 3 */
  rings?: number;
  /** Seconds for one ring to fade out. Default 2.4 */
  duration?: number;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "color">;

/**
 * A call-to-action that sends out soft sonar rings, so it gets noticed without shouting.
 * Pure CSS; no rings for reduced-motion users.
 */
export function SonarButton({ children, color = "var(--primary)", rings = 3, duration = 2.4, className, ...rest }: SonarButtonProps) {
  return (
    <span className="relative inline-flex">
      <style>{`@keyframes ombak-sonar{from{transform:scale(1);opacity:.55}to{transform:scale(1.9);opacity:0}}`}</style>
      {Array.from({ length: rings }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full motion-reduce:hidden"
          style={{
            border: `2px solid ${color}`,
            animation: `ombak-sonar ${duration}s cubic-bezier(.2,.6,.3,1) ${(i * duration) / rings}s infinite`,
            opacity: 0,
          }}
        />
      ))}
      <button
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground",
          "transition-transform duration-150 outline-none focus-visible:ring-4 focus-visible:ring-ring/50 active:scale-[0.97]",
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    </span>
  );
}
