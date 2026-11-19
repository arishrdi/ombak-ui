import { installLine, ogImage, ogSize } from "@/lib/og";
import { CATEGORY_LABELS, getItem, items } from "@/lib/registry";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Ombak UI component";

export function generateStaticParams() {
  return items.map((i) => ({ slug: i.name }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const item = getItem((await params).slug);
  const category = CATEGORY_LABELS[item?.categories?.[0] ?? ""] ?? "Component";
  return ogImage({
    kind: `Component · ${category}`,
    title: item?.title ?? "Ombak UI",
    description: item?.description,
    footer: item ? installLine(item.name) : undefined,
  });
}
