import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DepthGridProps = {
  /** Each direct child becomes a cell. */
  children: ReactNode;
  /** How far the other cells recede, 0–1. Default 0.5 */
  depth?: number;
  /** Blur the cells that recede. Default true */
  blur?: boolean;
  /** Grid classes, e.g. "grid-cols-3 gap-4". Default "grid-cols-2 gap-4 md:grid-cols-3" */
  className?: string;
};

/**
 * A grid where the hovered (or focused) item lifts toward you while the rest sink back into the
 * water. Pure CSS using :has(), so it also works in Server Components.
 */
export function DepthGrid({ children, depth = 0.5, blur = true, className }: DepthGridProps) {
  return (
    <div
      className={cn("group/depth grid grid-cols-2 gap-4 md:grid-cols-3", className)}
      style={{ ["--recede-scale" as string]: 1 - depth * 0.08, ["--recede-opacity" as string]: 1 - depth * 0.7, ["--recede-blur" as string]: blur ? `${depth * 4}px` : "0px" }}
    >
      {Children.toArray(children).map((child, i) => (
        <div
          key={i}
          className={cn(
            "transition-[transform,opacity,filter] duration-500 ease-out motion-reduce:transition-none",
            // when any cell is hovered/focused, everything recedes...
            "group-has-[>div:hover]/depth:scale-[var(--recede-scale)] group-has-[>div:hover]/depth:opacity-[var(--recede-opacity)] group-has-[>div:hover]/depth:blur-[var(--recede-blur)]",
            "group-has-[>div:focus-within]/depth:scale-[var(--recede-scale)] group-has-[>div:focus-within]/depth:opacity-[var(--recede-opacity)] group-has-[>div:focus-within]/depth:blur-[var(--recede-blur)]",
            // ...except the one under the cursor, which lifts
            "hover:!scale-[1.03] hover:!opacity-100 hover:!blur-none focus-within:!scale-[1.03] focus-within:!opacity-100 focus-within:!blur-none",
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
