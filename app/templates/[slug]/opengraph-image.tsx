import { templateDocs } from "@/content/templates";
import { installLine, ogImage, ogSize } from "@/lib/og";
import { getTemplate, templateParts, templates } from "@/lib/registry";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Ombak UI template";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.name }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const t = getTemplate(slug);
  return ogImage({
    kind: `Template · ${templateParts(slug).blocks.length} blocks`,
    title: t?.title ?? "Ombak UI",
    description: t?.description,
    accent: templateDocs[slug]?.accent,
    footer: t ? installLine(t.name) : undefined,
  });
}
