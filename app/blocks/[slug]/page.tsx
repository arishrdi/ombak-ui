import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blockMeta } from "@/content/meta";
import { BlockPreview } from "@/components/site/block-preview";
import { CodeBlock } from "@/components/site/code-block";
import { PropsTable } from "@/components/site/props-table";
import { KitButton } from "@/components/site/kit-button";
import { AiMenu } from "@/components/site/ai-menu";
import { buildPrompt, openInV0Url } from "@/lib/ai-prompt";
import { BLOCK_CATEGORY_LABELS, blockComponents, blocks, getBlock, getBlockProps, getBlockSource, getItem } from "@/lib/registry";
import { registryUrl } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blocks.map((b) => ({ slug: b.name }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const block = getBlock((await params).slug);
  if (!block) return {};
  return {
    title: `${block.title} block`,
    description: block.description,
    openGraph: { title: `${block.title} block · Ombak UI`, description: block.description, url: `/blocks/${block.name}`, siteName: "Ombak UI" },
  };
}

export default async function BlockPage({ params }: Params) {
  const { slug } = await params;
  const block = getBlock(slug);
  const doc = blockMeta[slug];
  if (!block || !doc) notFound();

  const source = getBlockSource(slug);
  const used = blockComponents(slug);
  const index = blocks.findIndex((b) => b.name === slug);
  const prev = blocks[index - 1];
  const next = blocks[index + 1];
  const usage = `import { ${doc.exportName} } from "@/components/${slug}";

export default function Page() {
  return <${doc.exportName} />;
}`;

  const promptInput = {
    kind: "block" as const,
    name: slug,
    title: block.title,
    description: block.description,
    path: `/blocks/${slug}`,
    includes: used.map((n) => getItem(n)?.title ?? n),
    usage,
    props: getBlockProps(slug),
    source,
  };

  return (
    <article className="prose-ombak space-y-14">
      <header>
        <nav className="mb-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
          <Link href="/blocks" className="hover:text-foreground">Blocks</Link>
          <span className="opacity-40">/</span>
          <span>{BLOCK_CATEGORY_LABELS[block.categories?.[0] ?? ""]}</span>
        </nav>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] md:text-5xl">{block.title}</h1>
        <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">{block.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] text-muted-foreground">Built with</span>
          {used.map((n) => (
            <Link
              key={n}
              href={`/docs/components/${n}`}
              className="surface rounded-full px-3 py-1 font-mono text-[11px] text-muted-foreground transition hover:text-foreground"
            >
              {getItem(n)?.title}
            </Link>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <AiMenu prompt={buildPrompt(promptInput, false)} promptWithSource={buildPrompt(promptInput, true)} v0Url={openInV0Url(slug)} />
            <KitButton name={block.name} title={block.title} />
          </div>
        </div>
      </header>

      <BlockPreview slug={slug} title={block.title} frameHeight={doc.frameHeight} code={<CodeBlock code={source} title={`components/${slug}.tsx`} />} />

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Installation</h2>
        <p className="text-muted-foreground">Installs the block and every component it uses.</p>
        <CodeBlock lang="bash" code={`npx shadcn@latest add ${registryUrl(slug)}`} />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Usage</h2>
        <p className="text-muted-foreground">Every prop has a default, so it renders as shown. Pass your own copy and links.</p>
        <CodeBlock code={usage} />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold tracking-[-0.02em]">Props</h2>
        <PropsTable props={getBlockProps(slug)} />
      </section>

      <nav className="grid gap-4 border-t border-hairline pt-10 sm:grid-cols-2">
        {prev ? (
          <Link href={`/blocks/${prev.name}`} className="surface glow-border rounded-2xl p-5 transition-shadow duration-500 hover:shadow-soft-md">
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">← Previous</span>
            <span className="mt-1.5 block font-medium tracking-[-0.01em]">{prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/blocks/${next.name}`} className="surface glow-border rounded-2xl p-5 text-right transition-shadow duration-500 hover:shadow-soft-md">
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">Next →</span>
            <span className="mt-1.5 block font-medium tracking-[-0.01em]">{next.title}</span>
          </Link>
        ) : <span />}
      </nav>
    </article>
  );
}
