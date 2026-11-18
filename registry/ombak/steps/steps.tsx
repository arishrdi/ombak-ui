import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StepItem = {
  /** Step title. */
  title: ReactNode;
  /** Optional detail under the title. */
  description?: ReactNode;
};

export type StepsProps = {
  /** The steps in order. */
  steps: StepItem[];
  /** Index of the current step (0-based). Steps before it show as done. */
  current: number;
  /** Layout direction. Default "horizontal" */
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/**
 * A step indicator for checkouts, onboarding and forms. The connecting line fills up as you move
 * forward, finished steps get a check mark, and the current step is marked with aria-current.
 */
export function Steps({ steps, current, orientation = "horizontal", className }: StepsProps) {
  const vertical = orientation === "vertical";
  return (
    <ol className={cn("flex", vertical ? "flex-col" : "w-full items-start", className)}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === steps.length - 1;
        return (
          <li
            key={i}
            aria-current={active ? "step" : undefined}
            className={cn("relative flex", vertical ? "gap-4 pb-8 last:pb-0" : "flex-1 flex-col items-center text-center")}
          >
            {!last && (
              <span
                aria-hidden
                // runs from this step's circle to the next one's (all steps share the width equally)
                className={cn("absolute bg-border", vertical ? "top-9 bottom-1 left-[15px] w-0.5" : "top-[15px] left-[calc(50%+22px)] h-0.5 w-[calc(100%-44px)]")}
              >
                <span
                  className="absolute inset-0 origin-left bg-primary transition-transform duration-700 ease-out"
                  style={{ transform: vertical ? `scaleY(${done ? 1 : 0})` : `scaleX(${done ? 1 : 0})`, transformOrigin: vertical ? "top" : "left" }}
                />
              </span>
            )}
            <span
              className={cn(
                "relative z-10 grid size-8 shrink-0 place-items-center rounded-full border-2 text-sm font-semibold transition-colors duration-300",
                done && "border-primary bg-primary text-primary-foreground",
                active && "border-primary bg-background text-foreground ring-4 ring-primary/20",
                !done && !active && "border-border bg-background text-muted-foreground",
              )}
            >
              {done ? (
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <span className={cn(vertical ? "pt-1" : "mt-3 px-2")}>
              <span className={cn("block text-sm font-medium", !done && !active && "text-muted-foreground")}>
                {s.title}
                {done && <span className="sr-only"> (completed)</span>}
              </span>
              {s.description && <span className="mt-0.5 block text-xs text-muted-foreground">{s.description}</span>}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
