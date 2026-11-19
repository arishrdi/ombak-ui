import { cn } from "@/lib/utils";

/** Ombak mark: a cresting wave inside a rounded square. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-[-0.02em]", className)}>
      <svg viewBox="0 0 32 32" className="size-7 drop-shadow-[0_2px_8px_color-mix(in_oklch,var(--surf)_35%,transparent)]" aria-hidden>
        <defs>
          <linearGradient id="ombak-logo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="oklch(0.92 0.12 170)" />
            <stop offset="1" stopColor="oklch(0.74 0.14 200)" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="url(#ombak-logo)" />
        <rect x=".5" y=".5" width="31" height="31" rx="8.5" fill="none" stroke="white" strokeOpacity=".35" />
        <path
          d="M5 20c3.2 0 3.6-6 7.6-6 3.6 0 3.2 5 6.4 5 2.2 0 2.6-2.4 2.2-4.2 2.6.6 4.8 2.8 5.8 5.2V27H5z"
          className="fill-[#0b1f33]"
        />
      </svg>
      <span>
        Ombak<span className="text-muted-foreground"> UI</span>
      </span>
    </span>
  );
}
