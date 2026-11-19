import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blockDocs } from "@/content/blocks";
import { blocks, getBlock } from "@/lib/registry";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blocks.map((b) => ({ slug: b.name }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const block = getBlock((await params).slug);
  return block ? { title: `${block.title} preview`, robots: { index: false } } : {};
}

/** A block on its own, with no site chrome. Loaded in the iframes on /blocks. */
export default async function BlockView({ params }: Params) {
  const { slug } = await params;
  const doc = blockDocs[slug];
  if (!getBlock(slug) || !doc) notFound();
  return (
    <>
      <style>{"body{min-height:0}"}</style>
      <div id="block-root">
        {doc.Preview ? <doc.Preview /> : <doc.Block />}
      </div>
    </>
  );
}
