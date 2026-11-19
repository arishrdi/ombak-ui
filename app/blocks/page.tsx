import Link from "next/link";
import type { Metadata } from "next";
import { BlockThumb } from "@/components/site/block-frame";
import { KitButton } from "@/components/site/kit-button";
import { BLOCK_CATEGORY_LABELS, blockComponents, blocks, getItem } from "@/lib/registry";

export const metadata: Metadata = {
  title: "Blocks",
  description: "Ready-made page sections built from Ombak UI components. Install a whole hero, pricing table or FAQ with one command.",
  openGraph: {
    title: "Blocks · Ombak UI",
    description: "Ready-made page sections built from Ombak UI components. Install a whole hero, pricing table or FAQ with one command.",
    url: "/blocks",
    siteName: "Ombak UI",
  },
};

export default function BlocksIndex() {
  return (
    <div>
      <header className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Blocks</p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
          Whole sections, <span className="font-serif font-normal tracking-normal italic">ready to ride.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
          Heroes, pricing, testimonials and more, composed from Ombak components. One command installs the block and
          everything it uses.
        </p>
      </header>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {blocks.map((b, i) => {
          const used = blockComponents(b.name);
          return (
            <div key={b.name} className="group/kit relative">
            <Link
              href={`/blocks/${b.name}`}
              className="surface glow-border group block overflow-hidden rounded-[24px] outline-none transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-0.5 hover:shadow-soft-lg focus-visible:ring-4 focus-visible:ring-ring/40 motion-reduce:hover:translate-y-0"
            >
              <div className="m-1.5 mb-0 overflow-hidden rounded-[18px] shadow-[inset_0_0_0_1px_var(--hairline)]">
                <BlockThumb slug={b.name} title={b.title} />
              </div>
              <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-6">
                <div className="min-w-0">
                  <p className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                    {String(i + 1).padStart(2, "0")} · {BLOCK_CATEGORY_LABELS[b.categories?.[0] ?? ""]}
                  </p>
                  <h2 className="mt-2 flex items-center gap-1.5 font-display text-lg font-semibold tracking-[-0.02em]">
                    {b.title}
                    <svg viewBox="0 0 16 16" className="size-3.5 -translate-x-1 text-muted-foreground opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 11 11 5M6 5h5v5" /></svg>
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 px-6 pb-6">
                {used.map((n) => (
                  <span key={n} className="rounded-full bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground shadow-[inset_0_0_0_1px_var(--hairline)]">
                    {getItem(n)?.title}
                  </span>
                ))}
              </div>
            </Link>
            <KitButton name={b.name} title={b.title} variant="icon" className="absolute top-4 right-4 z-10" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
