import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { templateDocs } from "@/content/templates";
import { BlockPreview } from "@/components/site/block-preview";
import { CodeBlock } from "@/components/site/code-block";
import { PropsTable } from "@/components/site/props-table";
import { KitButton } from "@/components/site/kit-button";
import { getBlock, getItem, getTemplate, getTemplateSource, templateParts, templates } from "@/lib/registry";
import { registryUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.name }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const t = getTemplate((await params).slug);
  if (!t) return {};
  return {
    title: `${t.title} template`,
    description: t.description,
    openGraph: { title: `${t.title} template · Ombak UI`, description: t.description, url: `/templates/${t.name}`, siteName: "Ombak UI" },
  };
}

/** Parses the template's own props type (they are few, so a light parse is enough). */
function templateProps(src: string) {
  const block = src.match(/export type \w+Props = \{([\s\S]*?)\n\};/);
  if (!block) return [];
  const out: { name: string; type: string; required: boolean; description: string; default: string }[] = [];
  let doc = "";
  for (const raw of block[1].split("\n")) {
    const line = raw.trim();
    const d = line.match(/^\/\*\*\s*(.*?)\s*\*\/$/);
    if (d) {
      doc = d[1];
      continue;
    }
    const p = line.match(/^(\w+)(\?)?:\s*(.+?);$/);
    if (p) {
      const def = src.match(new RegExp(`\\b${p[1]} = ([^,\\n]+),`));
      out.push({ name: p[1], required: !p[2], type: p[3], description: doc, default: def ? def[1] : "" });
      doc = "";
    }
  }
  return out;
}

export default async function TemplatePage({ params }: Params) {
  const { slug } = await params;
  const t = getTemplate(slug);
  const doc = templateDocs[slug];
  if (!t || !doc) notFound();

  const source = getTemplateSource(slug);
  const parts = templateParts(slug);
  const index = templates.findIndex((x) => x.name === slug);
  const prev = templates[index - 1];
  const next = templates[index + 1];
  const usage = `// app/page.tsx
import { ${doc.exportName} } from "@/components/${slug}";

export default function Page() {
  return <${doc.exportName} />;
}`;

  return (
    <article className="prose-ombak space-y-14">
      <header>
        <nav className="mb-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
          <Link href="/templates" className="hover:text-foreground">Templates</Link>
          <span className="opacity-40">/</span>
          <span>{t.title}</span>
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{t.title}</h1>
          <KitButton name={t.name} title={t.title} />
        </div>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">{t.description}</p>
      </header>

      <BlockPreview slug={slug} title={t.title} frameHeight={820} code={<CodeBlock code={source} title={`components/${slug}.tsx`} />} />

      <section className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Blocks in this page</h2>
          <ol className="surface divide-y divide-[var(--hairline)] overflow-hidden rounded-2xl">
            {parts.blocks.map((b, n) => (
              <li key={b}>
                <Link href={`/blocks/${b}`} className="flex items-center gap-4 px-5 py-3 text-sm transition-colors hover:bg-muted/40">
                  <span className="font-mono text-[11px] text-muted-foreground">{String(n + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-medium">{getBlock(b)?.title}</span>
                  <span className="text-muted-foreground">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        {parts.components.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Extra components</h2>
            <p className="text-sm text-muted-foreground">Used directly in this template, on top of what the blocks bring.</p>
            <div className="flex flex-wrap gap-2">
              {parts.components.map((c) => (
                <Link key={c} href={`/docs/components/${c}`} className="surface rounded-full px-3 py-1 font-mono text-[11px] text-muted-foreground transition hover:text-foreground">
                  {getItem(c)?.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Installation</h2>
        <p className="text-muted-foreground">Installs the page, every block in it and every component they use.</p>
        <CodeBlock lang="bash" code={`npx shadcn@latest add ${registryUrl(slug)}`} />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Usage</h2>
        <p className="text-muted-foreground">
          Render it as your home page, then edit the copy in <code>components/{slug}.tsx</code>. Each section is a block you can
          reorder, remove or restyle.
        </p>
        <CodeBlock code={usage} />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Props</h2>
        <PropsTable props={templateProps(source)} />
      </section>

      <nav className="grid gap-4 border-t border-hairline pt-10 sm:grid-cols-2">
        {prev ? (
          <Link href={`/templates/${prev.name}`} className="surface glow-border rounded-2xl p-5 transition-shadow duration-500 hover:shadow-soft-md">
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">← Previous</span>
            <span className="mt-1.5 block font-medium tracking-[-0.01em]">{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/templates/${next.name}`} className="surface glow-border rounded-2xl p-5 text-right transition-shadow duration-500 hover:shadow-soft-md">
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Next →</span>
            <span className="mt-1.5 block font-medium tracking-[-0.01em]">{next.title}</span>
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}
