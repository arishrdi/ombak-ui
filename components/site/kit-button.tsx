"use client";

import { kit, useKit } from "@/lib/kit-store";
import { cn } from "@/lib/utils";

/**
 * Adds or removes an item from the visitor's kit.
 * `variant="icon"` is a small round button for cards; `"full"` is a labelled pill for page headers.
 */
export function KitButton({ name, title, variant = "full", className }: { name: string; title: string; variant?: "icon" | "full"; className?: string }) {
  const items = useKit();
  const added = items.includes(name);
  const label = added ? `Remove ${title} from your kit` : `Add ${title} to your kit`;

  const icon = (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {added ? <path d="m3.5 8.5 3 3 6-7" /> : <path d="M8 3v10M3 8h10" />}
    </svg>
  );

  if (variant === "icon") {
    return (
      <button
        type="button"
        aria-label={label}
        aria-pressed={added}
        title={added ? "In your kit" : "Add to kit"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          kit.toggle(name);
        }}
        className={cn(
          "grid size-8 place-items-center rounded-full shadow-soft-sm backdrop-blur-md transition duration-300 outline-none focus-visible:ring-4 focus-visible:ring-ring/40 active:scale-90",
          added
            ? "bg-surf text-[#04201a]"
            : "bg-background/80 text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] hover:text-foreground",
          className,
        )}
      >
        {icon}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={added}
      onClick={() => kit.toggle(name)}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full px-4 text-[13px] font-medium transition duration-300 outline-none focus-visible:ring-4 focus-visible:ring-ring/40 active:scale-[0.97]",
        added ? "bg-surf text-[#04201a]" : "surface text-foreground hover:shadow-soft-md",
        className,
      )}
    >
      {icon}
      {added ? "In your kit" : "Add to kit"}
    </button>
  );
}
