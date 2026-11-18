"use client";

import Link from "next/link";
import { thumbs } from "@/components/thumbs";
import { cn } from "@/lib/utils";

export type CardItem = { name: string; title: string; description: string; category: string };

/** A component card with a live preview on top. */
export function ComponentCard({ item, className, tall }: { item: CardItem; className?: string; tall?: boolean }) {
  const t = thumbs[item.name];
  return (
    <Link
      href={`/docs/components/${item.name}`}
      className={cn(
        "group/roll group flex flex-col overflow-hidden rounded-2xl border bg-card transition-colors hover:border-surf/40",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden border-b bg-muted/30",
          tall ? "h-72" : "h-52",
          !t?.bleed && "p-6",
        )}
      >
        {/* subtle grid backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />
        <div className={cn("relative flex items-center justify-center", t?.bleed ? "size-full" : "")}>{t && <t.Thumb />}</div>
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight">{item.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        </div>
        <span className="mt-1 shrink-0 rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">{item.category}</span>
      </div>
    </Link>
  );
}
