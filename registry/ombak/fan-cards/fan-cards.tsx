import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FanCardsProps = {
  /** Each direct child becomes a card in the hand. */
  children: ReactNode;
  /** Total spread angle in degrees when fanned. Default 40 */
  spread?: number;
  /** Horizontal distance (px) between fanned cards. Default 56 */
  offset?: number;
  /** Card size classes. Default "h-56 w-40" */
  cardClassName?: string;
  className?: string;
};

/**
 * A neat stack of cards that fans out like a hand of playing cards on hover or focus; the card
 * under the cursor pops up. Pure CSS, so it also works in Server Components.
 */
export function FanCards({ children, spread = 40, offset = 56, cardClassName = "h-56 w-40", className }: FanCardsProps) {
  const cards = Children.toArray(children);
  const n = cards.length;
  return (
    <div className={cn("group/fan relative grid place-items-center outline-none", className)} tabIndex={0} aria-label={`${n} cards`}>
      {cards.map((card, i) => {
        const mid = (n - 1) / 2;
        const t = n > 1 ? (i - mid) / mid : 0; // -1 … 1
        return (
          <div
            key={i}
            className={cn(
              "col-start-1 row-start-1 origin-bottom transition-transform duration-500 ease-[cubic-bezier(.3,.7,.2,1)] hover:z-50 motion-reduce:transition-none",
              "[transform:translateX(0)_rotate(var(--rest))] group-hover/fan:[transform:translateX(var(--x))_rotate(var(--r))] group-focus-visible/fan:[transform:translateX(var(--x))_rotate(var(--r))]",
              "hover:![transform:translateX(var(--x))_translateY(-18px)_rotate(var(--r))]",
              cardClassName,
            )}
            style={{
              zIndex: i,
              ["--x" as string]: `${(i - mid) * offset}px`,
              ["--r" as string]: `${(t * spread) / 2}deg`,
              ["--rest" as string]: `${(i - mid) * 2}deg`,
            }}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
