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
    <article className="space-y-12">
      <header>
        <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/docs/components" className="hover:text-foreground">Components</a>
          <span>/</span>
          <span>{CATEGORY_LABELS[item.categories?.[0] ?? ""]}</span>
        </nav>
        <h1 className="font-display text-5xl font-bold tracking-tight">{item.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{item.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {(deps.length ? deps : ["no dependencies"]).map((d) => (
            <span key={d} className="rounded-full border bg-muted/40 px-3 py-1 font-mono text-xs text-muted-foreground">
              {d}
            </span>
          ))}
          <span className="rounded-full border border-surf/40 bg-surf/10 px-3 py-1 text-xs text-surf">MIT · free</span>
        </div>
      </header>

      <PreviewTabs
        stage={doc.stage}
        preview={<doc.Demo />}
        code={<CodeBlock code={doc.usage} title="Usage" />}
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
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
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={doc.usage} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Props</h2>
        <PropsTable props={getProps(slug)} />
      </section>

      <nav className="flex justify-between gap-4 border-t pt-8 text-sm">
        {prev ? <a href={`/docs/components/${prev.name}`} className="text-muted-foreground hover:text-foreground">← {prev.title}</a> : <span />}
        {next ? <a href={`/docs/components/${next.name}`} className="text-muted-foreground hover:text-foreground">{next.title} →</a> : <span />}
      </nav>
    </article>
  );
}
