"use client";

import { CountUp } from "@/registry/ombak/count-up/count-up";
import { cn } from "@/lib/utils";

export type Stat = { value: number; label: string; prefix?: string; suffix?: string; decimals?: number };

export type StatsBandProps = {
  /** Small label above the title. */
  eyebrow?: string;
  /** Section title. */
  title?: string;
  /** Up to four numbers. They count up when scrolled into view. */
  stats?: Stat[];
  className?: string;
};

const DEFAULT_STATS: Stat[] = [
  { value: 12480, suffix: "+", label: "sites riding the wave" },
  { value: 99.98, decimals: 2, suffix: "%", label: "uptime over the last year" },
  { value: 48, suffix: "ms", label: "median response time" },
  { value: 4.9, decimals: 1, prefix: "★ ", label: "average rating from teams" },
];

/** A row of headline numbers that count up on scroll, split by hairline dividers. */
export function StatsBand({
  eyebrow = "By the numbers",
  title = "Small details, measurable results.",
  stats = DEFAULT_STATS,
  className,
}: StatsBandProps) {
  return (
    <section className={cn("bg-background px-6 py-20 md:py-28", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{title}</h2>
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse items-center px-4 text-center md:border-l md:first:border-l-0">
              <dt className="mt-3 max-w-[18ch] text-sm leading-snug text-muted-foreground">{s.label}</dt>
              <dd>
                <CountUp
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  className="text-4xl font-semibold tracking-[-0.04em] tabular-nums md:text-6xl"
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
