import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type SkeletonProps = {
  /** Shape preset. Default "rect" */
  variant?: "rect" | "circle" | "text";
  /** Number of lines for the text variant. The last line is shorter. Default 3 */
  lines?: number;
  /** Size and layout classes, e.g. "h-32 w-full" or "size-12". */
  className?: string;
  style?: CSSProperties;
};

/**
 * A loading placeholder with a soft light sweeping across it. Use it where content will appear:
 * rectangles for images, circles for avatars, and lines for text. Hidden from screen readers.
 */
export function Skeleton({ variant = "rect", lines = 3, className, style }: SkeletonProps) {
  const base =
    "relative overflow-hidden bg-muted before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-foreground/[0.07] before:to-transparent before:[animation:ombak-skeleton_1.6s_ease-in-out_infinite] motion-reduce:before:hidden";
  const keyframes = <style>{`@keyframes ombak-skeleton{to{transform:translateX(100%)}}`}</style>;

  if (variant === "text") {
    return (
      <div aria-hidden className={cn("w-full space-y-2.5", className)} style={style}>
        {keyframes}
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className={cn(base, "h-3.5 rounded-md")} style={{ width: i === lines - 1 && lines > 1 ? "62%" : "100%" }} />
        ))}
      </div>
    );
  }
  return (
    <div aria-hidden className={cn(base, variant === "circle" ? "size-12 rounded-full" : "h-24 w-full rounded-xl", className)} style={style}>
      {keyframes}
    </div>
  );
}
