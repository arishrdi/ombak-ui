"use client";

import Link from "next/link";
import { thumbs } from "@/components/thumbs";
import { cn } from "@/lib/utils";

export type CardItem = { name: string; title: string; description: string; category: string };

/**
 * A component card with a live, playable preview on top.
 * The link is a transparent layer over the whole card; the preview sits above it, so previews can
 * contain real buttons and links (no interactive elements nested inside an <a>).
 */
export function ComponentCard({ item, className, tall }: { item: CardItem; className?: string; tall?: boolean }) {
  const t = thumbs[item.name];
  return (
    <div
      className={cn(
        "surface glow-border group/roll group relative flex flex-col overflow-hidden rounded-[20px] transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-soft-lg motion-reduce:hover:translate-y-0 has-[a:focus-visible]:ring-4 has-[a:focus-visible]:ring-ring/40",
        className,
      )}
    >
      <Link href={`/docs/components/${item.name}`} className="absolute inset-0 z-[1] outline-none" aria-label={item.title} />
      <div
        className={cn(
          "relative z-[2] m-1.5 mb-0 flex items-center justify-center overflow-hidden rounded-[14px] bg-muted/40 shadow-[inset_0_0_0_1px_var(--hairline)]",
          tall ? "h-72" : "h-48",
          !t?.bleed && "p-6",
        )}
      >
        {/* subtle grid backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        />
        <div className={cn("relative flex items-center justify-center", t?.bleed ? "size-full" : "")}>{t && <t.Thumb />}</div>
      </div>
      <div className="pointer-events-none flex flex-1 items-start justify-between gap-4 px-5 pt-4 pb-5">
        <div className="min-w-0">
          <h3 className="flex items-center gap-1.5 font-display text-[15px] font-semibold tracking-[-0.01em]">
            {item.title}
            <svg viewBox="0 0 16 16" className="size-3.5 -translate-x-1 text-muted-foreground opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 11 11 5M6 5h5v5" /></svg>
          </h3>
          <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{item.description}</p>
        </div>
        <span className="mt-0.5 shrink-0 font-mono text-[10px] tracking-[0.12em] text-muted-foreground/80 uppercase">{item.category}</span>
      </div>
    </div>
  );
}
