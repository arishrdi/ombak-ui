"use client";

import { useMemo, useState } from "react";
import { ComponentCard, type CardItem } from "./component-card";
import { cn } from "@/lib/utils";

/** The components gallery: category chips + a search box over live preview cards. */
export function ComponentsGrid({ items }: { items: CardItem[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const shown = items.filter(
    (i) =>
      (cat === "All" || i.category === cat) &&
      `${i.title} ${i.description} ${i.category}`.toLowerCase().includes(q.trim().toLowerCase()),
  );
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((c) => {
            const count = c === "All" ? items.length : items.filter((i) => i.category === c).length;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition",
                  cat === c ? "border-transparent bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {c} <span className="ml-1 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter components…"
          aria-label="Filter components"
          className="h-9 w-full rounded-lg border bg-muted/40 px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50 sm:w-60"
        />
      </div>
      {shown.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">No components match “{q}”.</p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((item) => (
            <ComponentCard key={item.name} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
