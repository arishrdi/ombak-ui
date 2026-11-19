import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { docs } from "@/content/docs";
import { CodeBlock } from "@/components/site/code-block";
import { PreviewTabs } from "@/components/site/preview-tabs";
import { InstallTabs } from "@/components/site/install-tabs";
import { PropsTable } from "@/components/site/props-table";
import { CATEGORY_LABELS, getItem, getProps, getSource, items } from "@/lib/registry";
import { registryUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return items.map((i) => ({ slug: i.name }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const item = getItem((await params).slug);
  return item ? { title: item.title, description: item.description } : {};
}

export default async function ComponentPage({ params }: Params) {
  const { slug } = await params;
  const item = getItem(slug);
  const doc = docs[slug];
  if (!item || !doc) notFound();

  const source = getSource(slug);
  const deps = item.dependencies ?? [];
  const index = items.findIndex((i) => i.name === slug);
  const prev = items[index - 1];
  const next = items[index + 1];

  return (
    <article className="prose-ombak space-y-14">
      <header>
        <nav className="mb-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
          <a href="/docs/components" className="hover:text-foreground">Components</a>
          <span className="opacity-40">/</span>
          <span>{CATEGORY_LABELS[item.categories?.[0] ?? ""]}</span>
        </nav>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{item.title}</h1>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">{item.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {(deps.length ? deps : ["no dependencies"]).map((d) => (
            <span key={d} className="surface rounded-full px-3 py-1 font-mono text-[11px] text-muted-foreground">
              {d}
            </span>
          ))}
          <span className="rounded-full bg-surf/10 px-3 py-1 font-mono text-[11px] text-surf shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--surf)_30%,transparent)]">MIT · free</span>
        </div>
      </header>

      <PreviewTabs
        stage={doc.stage}
        preview={<doc.Demo />}
        code={<CodeBlock code={doc.usage} title="Usage" />}
      />

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Installation</h2>
        <InstallTabs
          cli={<CodeBlock lang="bash" code={`npx shadcn@latest add ${registryUrl(slug)}`} />}
          manual={
            <div className="space-y-4">
              {deps.length > 0 && (
                <>
                  <p className="text-sm text-muted-foreground">Install the dependencies:</p>
                  <CodeBlock lang="bash" code={`npm install ${deps.join(" ")}`} />
                </>
              )}
              <p className="text-sm text-muted-foreground">
                Copy this into <code>components/{slug}.tsx</code>. It uses <code>cn()</code> from <code>@/lib/utils</code>.
              </p>
              <CodeBlock code={source} title={`components/${slug}.tsx`} />
            </div>
          }
        />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Usage</h2>
        <CodeBlock code={doc.usage} />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Props</h2>
        <PropsTable props={getProps(slug)} />
      </section>

      <nav className="grid gap-4 border-t border-hairline pt-10 sm:grid-cols-2">
        {prev ? (
          <a href={`/docs/components/${prev.name}`} className="surface glow-border group rounded-2xl p-5 transition-shadow duration-500 hover:shadow-soft-md">
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">← Previous</span>
            <span className="mt-1.5 block font-medium tracking-[-0.01em]">{prev.title}</span>
          </a>
        ) : <span />}
        {next ? (
          <a href={`/docs/components/${next.name}`} className="surface glow-border group rounded-2xl p-5 text-right transition-shadow duration-500 hover:shadow-soft-md">
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Next →</span>
            <span className="mt-1.5 block font-medium tracking-[-0.01em]">{next.title}</span>
          </a>
        ) : <span />}
      </nav>
    </article>
  );
}
