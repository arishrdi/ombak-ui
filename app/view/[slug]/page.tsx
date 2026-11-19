import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blockDocs } from "@/content/blocks";
import { templateDocs } from "@/content/templates";
import { blocks, getBlock, getTemplate, templates } from "@/lib/registry";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...blocks, ...templates].map((b) => ({ slug: b.name }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getBlock(slug) ?? getTemplate(slug);
  return item ? { title: `${item.title} preview`, robots: { index: false } } : {};
}

/** A block or template on its own, with no site chrome. Loaded in the iframes on /blocks and /templates. */
export default async function View({ params }: Params) {
  const { slug } = await params;
  const block = getBlock(slug) && blockDocs[slug];
  const template = getTemplate(slug) && templateDocs[slug];
  if (!block && !template) notFound();
  return (
    <>
      <style>{"body{min-height:0}"}</style>
      <div id="block-root">
        {block ? block.Preview ? <block.Preview /> : <block.Block /> : template ? <template.Page /> : null}
      </div>
    </>
  );
}
