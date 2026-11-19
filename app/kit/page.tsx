import type { Metadata } from "next";
import { KitPage, type KitCatalogItem } from "@/components/site/kit-page";
import { BLOCK_CATEGORY_LABELS, CATEGORY_LABELS, blocks, items, templates } from "@/lib/registry";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your kit",
  description: "Collect Ombak UI components, blocks and templates, then install them all with one command.",
  openGraph: { title: "Your kit · Ombak UI", description: "Collect components, blocks and templates, then install them all with one command.", url: "/kit", siteName: "Ombak UI" },
};

const depNames = (deps: string[] = []) => deps.map((d) => d.match(/\/r\/([\w-]+)\.json$/)?.[1]).filter((n): n is string => !!n);

export default function Kit() {
  const catalog: KitCatalogItem[] = [
    ...items.map((i) => ({
      name: i.name,
      title: i.title,
      kind: "component" as const,
      group: CATEGORY_LABELS[i.categories?.[0] ?? ""] ?? "Component",
      href: `/docs/components/${i.name}`,
      deps: [],
    })),
    ...blocks.map((b) => ({
      name: b.name,
      title: b.title,
      kind: "block" as const,
      group: BLOCK_CATEGORY_LABELS[b.categories?.[0] ?? ""] ?? "Block",
      href: `/blocks/${b.name}`,
      deps: depNames(b.registryDependencies),
    })),
    ...templates.map((t) => ({
      name: t.name,
      title: t.title,
      kind: "template" as const,
      group: "Template",
      href: `/templates/${t.name}`,
      deps: depNames(t.registryDependencies),
    })),
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 pb-28 md:px-6 md:py-16">
      <header className="mb-12 max-w-2xl">
        <p className="eyebrow">Kit builder</p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
          Your kit, <span className="font-serif font-normal tracking-normal italic">one command.</span>
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
          Everything you collected across components, blocks and templates. Anything already included by another pick is left out of
          the command, so nothing installs twice.
        </p>
      </header>
      <KitPage catalog={catalog} registryBase={`${site.url}/r`} />
    </main>
  );
}
