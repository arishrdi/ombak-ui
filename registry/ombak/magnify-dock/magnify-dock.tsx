"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DockItem = {
  /** Shown as a tooltip and used as the accessible name. */
  label: string;
  /** Icon or image. It's sized to fill the item. */
  icon: ReactNode;
  /** Renders a link when set, otherwise a button. */
  href?: string;
  onClick?: () => void;
};

export type MagnifyDockProps = {
  /** The dock items. */
  items: DockItem[];
  /** Resting item size in px. Default 44 */
  size?: number;
  /** Size of the item right under the cursor in px. Default 76 */
  magnified?: number;
  /** How far (px) the magnification spreads to neighbours. Default 140 */
  range?: number;
  className?: string;
  /** Classes for each item, e.g. colors. */
  itemClassName?: string;
};

/**
 * A dock whose icons swell as the cursor glides over them, neighbours included, then ease back.
 * Keyboard and touch friendly: items are real links or buttons with labels.
 */
export function MagnifyDock({ items, size = 44, magnified = 76, range = 140, className, itemClassName }: MagnifyDockProps) {
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const els = Array.from(dock.querySelectorAll<HTMLElement>("[data-dock-item]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const current = els.map(() => size);
    const target = els.map(() => size);
    let raf = 0;

    const tick = () => {
      let moving = false;
      els.forEach((el, i) => {
        current[i] += (target[i] - current[i]) * (reduced ? 1 : 0.22);
        if (Math.abs(target[i] - current[i]) > 0.1) moving = true;
        el.style.width = el.style.height = `${current[i]}px`;
      });
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(e.clientX - (r.left + r.width / 2));
        const k = Math.max(0, 1 - d / range);
        target[i] = size + (magnified - size) * (1 - Math.cos(k * Math.PI)) * 0.5;
      });
      kick();
    };
    const onLeave = () => {
      target.fill(size);
      kick();
    };
    dock.addEventListener("pointermove", onMove);
    dock.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      dock.removeEventListener("pointermove", onMove);
      dock.removeEventListener("pointerleave", onLeave);
    };
  }, [items.length, size, magnified, range]);

  return (
    <div
      ref={dockRef}
      className={cn("inline-flex items-end gap-2.5 rounded-2xl border bg-card/80 px-3 pt-3 pb-2.5 shadow-xl backdrop-blur", className)}
      style={{ height: magnified + 24 }}
    >
      {items.map((item) => {
        const Tag = item.href ? "a" : "button";
        return (
          <Tag
            key={item.label}
            data-dock-item
            aria-label={item.label}
            {...(item.href ? { href: item.href } : { type: "button" as const, onClick: item.onClick })}
            className={cn(
              "group relative grid shrink-0 place-items-center rounded-[28%] bg-muted text-foreground outline-none focus-visible:ring-4 focus-visible:ring-ring/50 [&>svg]:size-1/2",
              itemClassName,
            )}
            style={{ width: size, height: size }}
          >
            {item.icon}
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {item.label}
            </span>
          </Tag>
        );
      })}
    </div>
  );
}
