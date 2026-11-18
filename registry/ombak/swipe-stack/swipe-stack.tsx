"use client";

import { Children, useRef, useState, type PointerEvent as RPointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SwipeStackProps = {
  /** Each direct child becomes a card. */
  children: ReactNode;
  /** How far (px) a card must be dragged to fly away. Default 110 */
  threshold?: number;
  /** Number of cards visible behind the top one. Default 3 */
  visible?: number;
  /** Called after a card is swiped away, with its original index and direction. */
  onSwipe?: (index: number, direction: "left" | "right") => void;
  className?: string;
};

/**
 * A deck of cards you can drag and fling away. Swiped cards go to the back, so the deck never
 * runs out. Arrow keys work too when the deck is focused.
 */
export function SwipeStack({ children, threshold = 110, visible = 3, onSwipe, className }: SwipeStackProps) {
  const cards = Children.toArray(children);
  const [order, setOrder] = useState(() => cards.map((_, i) => i));
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [flying, setFlying] = useState<"left" | "right" | null>(null);
  const start = useRef({ x: 0, y: 0 });

  // keep order in sync if the number of children changes
  if (order.length !== cards.length) setOrder(cards.map((_, i) => i));

  const fling = (dir: "left" | "right") => {
    if (flying) return;
    setFlying(dir);
    const swiped = order[0];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        onSwipe?.(swiped, dir);
        setOrder((o) => [...o.slice(1), o[0]]);
        setFlying(null);
        setDrag({ x: 0, y: 0, active: false });
      },
      reduced ? 0 : 320,
    );
  };

  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (flying) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, active: true });
  };
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (!drag.active) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y, active: true });
  };
  const onUp = () => {
    if (!drag.active) return;
    if (Math.abs(drag.x) > threshold) fling(drag.x > 0 ? "right" : "left");
    else setDrag({ x: 0, y: 0, active: false });
  };

  return (
    <div
      tabIndex={0}
      role="group"
      aria-roledescription="card deck"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") fling("left");
        if (e.key === "ArrowRight") fling("right");
      }}
      className={cn("relative grid touch-none outline-none select-none focus-visible:ring-4 focus-visible:ring-ring/40 rounded-2xl", className)}
    >
      {order
        .slice(0, visible + 1)
        .map((cardIndex, depth) => {
          const top = depth === 0;
          let transform = `translateY(${depth * 14}px) scale(${1 - depth * 0.05})`;
          if (top && flying) transform = `translate(${flying === "right" ? 140 : -140}%, ${drag.y}px) rotate(${flying === "right" ? 24 : -24}deg)`;
          else if (top) transform = `translate(${drag.x}px, ${drag.y * 0.3}px) rotate(${drag.x * 0.06}deg)`;
          return (
            <div
              key={cardIndex}
              onPointerDown={top ? onDown : undefined}
              onPointerMove={top ? onMove : undefined}
              onPointerUp={top ? onUp : undefined}
              onPointerCancel={top ? onUp : undefined}
              aria-hidden={!top}
              className={cn("col-start-1 row-start-1 origin-bottom", top ? "cursor-grab active:cursor-grabbing" : "pointer-events-none")}
              style={{
                transform,
                zIndex: 10 - depth,
                opacity: depth === visible ? 0 : 1,
                transition: top && drag.active && !flying ? "none" : "transform 320ms cubic-bezier(.2,.8,.2,1), opacity 320ms",
              }}
            >
              {cards[cardIndex]}
            </div>
          );
        })
        .reverse()}
    </div>
  );
}
