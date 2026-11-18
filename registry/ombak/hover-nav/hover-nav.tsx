"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type HoverNavLink = { label: string; href: string };

export type HoverNavProps = {
  /** The links. */
  links: HoverNavLink[];
  /** href of the current page; it gets an underline and aria-current. */
  current?: string;
  className?: string;
};

/**
 * Navigation links with a soft highlight that glides between them as the cursor (or keyboard
 * focus) moves, then fades out when you leave. The current page is marked with aria-current.
 */
export function HoverNav({ links, current, className }: HoverNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [hl, setHl] = useState({ left: 0, width: 0, visible: false });

  const show = (el: HTMLElement) => setHl({ left: el.offsetLeft, width: el.offsetWidth, visible: true });

  return (
    <nav
      ref={navRef}
      onPointerLeave={() => setHl((h) => ({ ...h, visible: false }))}
      onBlur={(e) => {
        if (!navRef.current?.contains(e.relatedTarget as Node)) setHl((h) => ({ ...h, visible: false }));
      }}
      className={cn("relative inline-flex items-center gap-1", className)}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 rounded-full bg-muted transition-all duration-300 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:transition-none"
        style={{ left: hl.left, width: hl.width, opacity: hl.visible ? 1 : 0 }}
      />
      {links.map((l) => {
        const isCurrent = current === l.href;
        return (
          <a
            key={l.href}
            href={l.href}
            aria-current={isCurrent ? "page" : undefined}
            onPointerEnter={(e) => show(e.currentTarget)}
            onFocus={(e) => show(e.currentTarget)}
            className={cn(
              "relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors outline-none",
              isCurrent ? "text-foreground" : "text-muted-foreground hover:text-foreground focus-visible:text-foreground",
            )}
          >
            {l.label}
            {isCurrent && <span aria-hidden className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary" />}
          </a>
        );
      })}
    </nav>
  );
}
