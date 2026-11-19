import { installLine, ogImage, ogSize } from "@/lib/og";
import { BLOCK_CATEGORY_LABELS, blocks, getBlock } from "@/lib/registry";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Ombak UI block";

export function generateStaticParams() {
  return blocks.map((b) => ({ slug: b.name }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const block = getBlock((await params).slug);
  return ogImage({
    kind: `Block · ${BLOCK_CATEGORY_LABELS[block?.categories?.[0] ?? ""] ?? "Section"}`,
    title: block?.title ?? "Ombak UI",
    description: block?.description,
    accent: "#38bdf8",
    footer: block ? installLine(block.name) : undefined,
  });
}
