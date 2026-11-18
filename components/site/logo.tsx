import { cn } from "@/lib/utils";

/** Ombak mark: a cresting wave inside a rounded square. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight", className)}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
        <rect width="32" height="32" rx="9" className="fill-surf" />
        <path
          d="M5 20c3.2 0 3.6-6 7.6-6 3.6 0 3.2 5 6.4 5 2.2 0 2.6-2.4 2.2-4.2 2.6.6 4.8 2.8 5.8 5.2V27H5z"
          className="fill-[#0b1f33]"
        />
      </svg>
      Ombak UI
    </span>
  );
}
