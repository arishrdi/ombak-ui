"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Watches the block root inside a same-origin /view iframe and reports its height.
 * Works whether the iframe finished loading before or after hydration.
 */
function useBlockHeight(ref: React.RefObject<HTMLIFrameElement | null>, deps: unknown[]) {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    let ro: ResizeObserver | undefined;
    let timer: number | undefined;

    const attach = () => {
      const root = frame.contentDocument?.getElementById("block-root");
      if (!root) return false;
      const measure = () => setHeight(Math.ceil(root.getBoundingClientRect().height));
      measure();
      ro?.disconnect();
      ro = new ResizeObserver(measure);
      ro.observe(root);
      return true;
    };

    const onLoad = () => attach();
    frame.addEventListener("load", onLoad);
    // The iframe may already be loaded (cached / fast) before this effect ran.
    if (!attach()) {
      let tries = 0;
      timer = window.setInterval(() => {
        if (attach() || ++tries > 40) window.clearInterval(timer);
      }, 150);
    }
    return () => {
      frame.removeEventListener("load", onLoad);
      window.clearInterval(timer);
      ro?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return height;
}

/** An iframe of /view/<slug> that grows to fit the block inside it. */
export function BlockFrame({
  slug,
  title,
  width,
  reloadKey = 0,
  className,
}: {
  slug: string;
  title: string;
  /** CSS width of the frame (e.g. "100%" or 390). */
  width: number | string;
  reloadKey?: number;
  className?: string;
}) {
  const ref = useRef<HTMLIFrameElement>(null);
  const height = useBlockHeight(ref, [reloadKey]);

  return (
    <iframe
      key={reloadKey}
      ref={ref}
      src={`/view/${slug}`}
      title={title}
      style={{ width, height: height ?? 600 }}
      className={cn(
        "mx-auto block max-w-full bg-background transition-opacity duration-500 ease-out-expo",
        height ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}

/**
 * A static thumbnail: the block rendered at desktop width, scaled down to fit the card
 * and centered vertically. Not interactive; the card around it is the link.
 */
export function BlockThumb({ slug, title, maxHeight = 340, renderWidth = 1280 }: { slug: string; title: string; maxHeight?: number; renderWidth?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [width, setWidth] = useState(0);
  const scale = width / renderWidth;
  // roughly 16:9, capped so wide cards don't get too tall
  const height = width ? Math.min(maxHeight, Math.round(width * 0.56)) : maxHeight;
  const blockHeight = useBlockHeight(frame, [scale > 0]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const frameHeight = scale ? height / scale : 0;
  const top = blockHeight && scale ? Math.max(0, (height - blockHeight * scale) / 2) : 0;

  return (
    <div ref={wrap} className="relative w-full overflow-hidden bg-background" style={{ height }} aria-hidden>
      {scale > 0 && (
        <iframe
          ref={frame}
          src={`/view/${slug}`}
          title={title}
          tabIndex={-1}
          className={cn(
            "pointer-events-none absolute left-0 origin-top-left transition-opacity duration-700",
            blockHeight ? "opacity-100" : "opacity-0",
          )}
          style={{ top, width: renderWidth, height: frameHeight, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}
