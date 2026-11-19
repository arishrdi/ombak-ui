import Link from "next/link";
import type { Metadata } from "next";
import { BlockThumb } from "@/components/site/block-frame";
import { templateDocs } from "@/content/templates";
import { getBlock, templateParts, templates } from "@/lib/registry";

export const metadata: Metadata = {
  title: "Templates",
  description: "Complete landing pages built from Ombak UI blocks. Install a whole page with one command and make it yours.",
  openGraph: {
    title: "Templates · Ombak UI",
    description: "Complete landing pages built from Ombak UI blocks. Install a whole page with one command and make it yours.",
    url: "/templates",
    siteName: "Ombak UI",
  },
};

export default function TemplatesIndex() {
  return (
    <div>
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Templates</p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
          Whole pages, <span className="font-serif font-normal tracking-normal italic">one command.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
          Landing pages assembled from Ombak blocks. Install one, swap the copy, and you have a site that moves.
        </p>
      </header>

      <div className="mt-16 space-y-6">
        {templates.map((t, i) => {
          const parts = templateParts(t.name);
          const accent = templateDocs[t.name]?.accent;
          return (
            <Link
              key={t.name}
              href={`/templates/${t.name}`}
              className="surface glow-border group grid overflow-hidden rounded-[28px] outline-none transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-soft-lg focus-visible:ring-4 focus-visible:ring-ring/40 motion-reduce:hover:translate-y-0 lg:grid-cols-[1.7fr_1fr]"
            >
              <div className="m-1.5 overflow-hidden rounded-[22px] shadow-[inset_0_0_0_1px_var(--hairline)] max-lg:aspect-[16/10] lg:mr-0">
                <BlockThumb slug={t.name} title={t.title} renderWidth={1440} fill />
              </div>
              <div className="flex flex-col p-6 lg:p-8">
                <p className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                  <span className="size-2 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
                  Template {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 flex items-center gap-1.5 font-display text-2xl font-semibold tracking-[-0.03em]">
                  {t.title}
                  <svg viewBox="0 0 16 16" className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 11 11 5M6 5h5v5" /></svg>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                <p className="mt-6 font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground/80 uppercase">
                  {parts.blocks.length} blocks{parts.components.length > 0 && ` · ${parts.components.length} extra components`}
                </p>
                <ol className="mt-3 space-y-1.5 text-sm">
                  {parts.blocks.map((b, n) => (
                    <li key={b} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-5 font-mono text-[11px] text-muted-foreground/60">{String(n + 1).padStart(2, "0")}</span>
                      {getBlock(b)?.title}
                    </li>
                  ))}
                </ol>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium">
                  Preview template
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
