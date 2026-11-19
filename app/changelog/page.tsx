import Link from "next/link";
import type { Metadata } from "next";
import { releases, type ChangeType } from "@/content/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Everything new in Ombak UI: components, blocks, templates and tools, newest first.",
  openGraph: { title: "Changelog · Ombak UI", description: "Everything new in Ombak UI, newest first.", url: "/changelog", siteName: "Ombak UI" },
  alternates: { types: { "application/rss+xml": "/changelog/rss.xml" } },
};

const TYPE: Record<ChangeType, { label: string; className: string }> = {
  // darker text in light mode keeps the labels readable on white
  new: { label: "New", className: "bg-surf/15 text-teal-700 dark:text-surf" },
  improved: { label: "Improved", className: "bg-sky-400/15 text-sky-700 dark:text-sky-300" },
  fixed: { label: "Fixed", className: "bg-coral/15 text-orange-700 dark:text-coral" },
};

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export default function Changelog() {
  // group releases that shipped on the same day
  const days: { date: string; items: typeof releases }[] = [];
  for (const r of releases) {
    const last = days[days.length - 1];
    if (last?.date === r.date) last.items.push(r);
    else days.push({ date: r.date, items: [r] });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 pb-28 md:px-6 md:py-16">
      <header className="mb-16 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="eyebrow">Changelog</p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
            What&apos;s <span className="font-serif font-normal tracking-normal italic">new.</span>
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
            Every release of Ombak UI, newest first. {releases.length} releases so far.
          </p>
        </div>
        <a
          href="/changelog/rss.xml"
          className="surface inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition hover:shadow-soft-md"
        >
          <svg viewBox="0 0 16 16" className="size-3.5 text-coral" fill="currentColor" aria-hidden>
            <circle cx="3" cy="13" r="2" />
            <path d="M1 6.5a8.5 8.5 0 0 1 8.5 8.5H7.4A6.4 6.4 0 0 0 1 8.6zM1 1.5A13.5 13.5 0 0 1 14.5 15h-2.1A11.4 11.4 0 0 0 1 3.6z" />
          </svg>
          RSS feed
        </a>
      </header>

      <div className="relative">
        {/* the timeline line */}
        <span aria-hidden className="absolute top-2 bottom-0 left-[7px] w-px bg-gradient-to-b from-border via-border to-transparent md:left-[183px]" />

        <div className="space-y-16">
          {days.map((day) => (
            <section key={day.date} className="relative grid gap-6 md:grid-cols-[160px_minmax(0,1fr)] md:gap-12">
              <div className="pl-7 md:sticky md:top-24 md:self-start md:pl-0 md:text-right">
                <time dateTime={day.date} className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                  {formatDate(day.date)}
                </time>
              </div>
              <div className="space-y-6">
                {day.items.map((r) => (
                  <article key={r.id} id={r.id} className="relative scroll-mt-24 pl-7 md:pl-0">
                    <span
                      aria-hidden
                      className="absolute top-[9px] left-[3px] size-[9px] rounded-full bg-surf shadow-[0_0_0_4px_var(--background),0_0_12px_var(--surf)] md:-left-[27px]"
                    />
                    <div className="surface rounded-3xl p-6 md:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em]">
                          <a href={`#${r.id}`} className="hover:underline hover:decoration-border hover:underline-offset-4">
                            {r.title}
                          </a>
                        </h2>
                        {r.href && (
                          <Link href={r.href} className="group inline-flex items-center gap-1 rounded-full bg-muted/60 px-3 py-1 text-[13px] font-medium transition hover:bg-muted">
                            Try it <span className="transition-transform group-hover:translate-x-0.5">→</span>
                          </Link>
                        )}
                      </div>
                      <p className="mt-2 text-muted-foreground">{r.summary}</p>
                      <ul className="mt-5 space-y-2.5">
                        {r.changes.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
                            <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider uppercase ${TYPE[c.type].className}`}>
                              {TYPE[c.type].label}
                            </span>
                            <span>
                              {c.href ? (
                                <Link href={c.href} className="underline decoration-border underline-offset-4 hover:decoration-foreground">
                                  {c.text}
                                </Link>
                              ) : (
                                c.text
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
