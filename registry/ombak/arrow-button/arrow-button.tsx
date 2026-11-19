import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ArrowButtonProps<T extends ElementType = "button"> = {
  /** Render as another element, e.g. "a". Default "button" */
  as?: T;
  /** Button content. */
  children: ReactNode;
  /** "slide" swaps the arrow out and in; "grow" draws a stem behind the arrow head. Default "slide" */
  variant?: "slide" | "grow";
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const Arrow = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={cn("size-4", className)} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 3l5 5-5 5" />
  </svg>
);

/**
 * A call-to-action whose arrow moves on hover: it either slides out and back in, or grows a stem.
 * Pure CSS with no JavaScript, so it also works in Server Components.
 */
export function ArrowButton<T extends ElementType = "button">({ as, children, variant = "slide", className, ...rest }: ArrowButtonProps<T>) {
  const Tag = (as ?? "button") as ElementType;
  return (
    <Tag
      className={cn(
        "group/arrow inline-flex items-center gap-2 rounded-full bg-primary py-3.5 pr-5 pl-7 text-sm font-medium text-primary-foreground",
        "outline-none focus-visible:ring-4 focus-visible:ring-ring/50",
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {variant === "slide" ? (
        <span className="relative grid size-6 place-items-center overflow-hidden rounded-full bg-primary-foreground/15">
          <Arrow className="transition-transform duration-300 ease-out group-hover/arrow:translate-x-6 group-focus-visible/arrow:translate-x-6 motion-reduce:transition-none" />
          <Arrow className="absolute -translate-x-6 transition-transform duration-300 ease-out group-hover/arrow:translate-x-0 group-focus-visible/arrow:translate-x-0 motion-reduce:transition-none" />
        </span>
      ) : (
        <svg viewBox="0 0 20 16" className="h-4 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 8h12" className="origin-right scale-x-0 transition-transform duration-300 group-hover/arrow:scale-x-100 group-focus-visible/arrow:scale-x-100" />
          <path d="M10 3l5 5-5 5" className="-translate-x-2 transition-transform duration-300 group-hover/arrow:translate-x-0 group-focus-visible/arrow:translate-x-0" />
        </svg>
      )}
    </Tag>
  );
}
