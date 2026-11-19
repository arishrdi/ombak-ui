import { ogImage, ogSize } from "@/lib/og";
import { blocks, items, templates } from "@/lib/registry";

export const alt = "Ombak UI: motion components for React";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage({
    kind: `${items.length} components · ${blocks.length} blocks · ${templates.length} templates`,
    title: "Make your website move like water.",
    description: "Free motion components, blocks and templates for React and shadcn.",
  });
}
