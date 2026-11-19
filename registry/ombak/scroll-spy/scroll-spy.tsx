"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ScrollSpyItem = {
  /** The id of the section on the page (without #). */
  id: string;
  /** Link text. */
  label: string;
};

export type ScrollSpyProps = {
  /** Sections to track, in page order. */
  items: ScrollSpyItem[];
  /** Use a scrollable element instead of the window, e.g. for demos. */
  scrollContainer?: React.RefObject<HTMLElement | null>;
  /** Heading above the list. Default "On this page" */
  title?: string;
  className?: string;
};

/**
 * A table of contents that follows your reading: a marker glides to the section you're in.
 * The active link gets aria-current="location". Put it in a sticky sidebar.
 */
export function ScrollSpy({ items, scrollContainer, title = "On this page", className }: ScrollSpyProps) {
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLUListElement>(null);
  const [marker, setMarker] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const root = scrollContainer?.current ?? null;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        // the first section (in page order) that is meaningfully on screen wins
        const first = items.find((i) => (visible.get(i.id) ?? 0) > 0.05);
        if (first) setActive(first.id);
      },
      { root, rootMargin: "-10% 0px -55% 0px", threshold: [0, 0.05, 0.25, 0.5, 1] },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items, scrollContainer]);

  useEffect(() => {
    const a = listRef.current?.querySelector<HTMLElement>(`[data-spy="${active}"]`);
    if (a) setMarker({ top: a.offsetTop, height: a.offsetHeight });
  }, [active]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  };

  return (
    <nav aria-label={title} className={cn("text-sm", className)}>
      <p className="mb-3 font-medium">{title}</p>
      <ul ref={listRef} className="relative border-l">
        <span
          aria-hidden
          className="absolute -left-px w-0.5 bg-primary transition-all duration-300 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:transition-none"
          style={{ top: marker.top, height: marker.height }}
        />
        {items.map((i) => (
          <li key={i.id} data-spy={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(i.id);
                history.replaceState(null, "", `#${i.id}`);
              }}
              className={cn(
                "block py-1.5 pl-4 transition-colors outline-none focus-visible:underline",
                active === i.id ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
