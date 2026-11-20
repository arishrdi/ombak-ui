"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";

// one shared download for every card on the page
let thumbsModule: Promise<typeof import("@/components/thumbs")> | null = null;
const loadThumbs = () => (thumbsModule ??= import("@/components/thumbs"));

/**
 * A card's live preview, loaded only when the card comes near the viewport. Keeps the ~100
 * preview components (and GSAP) out of the page's initial JavaScript.
 */
export function LazyThumb({ name, bleed }: { name: string; bleed: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [Thumb, setThumb] = useState<ComponentType | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        loadThumbs().then((m) => !cancelled && setThumb(() => m.thumbs[name]?.Thumb ?? null));
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [name]);

  return (
    <div ref={ref} className={cn("relative flex items-center justify-center", bleed && "size-full")}>
      {Thumb ? (
        <Thumb />
      ) : (
        <span aria-hidden className={cn("block animate-pulse rounded-full bg-muted/70", bleed ? "size-full rounded-none bg-muted/30" : "h-9 w-28")} />
      )}
    </div>
  );
}
