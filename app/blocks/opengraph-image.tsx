import { ogImage, ogSize } from "@/lib/og";
import { blocks } from "@/lib/registry";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Ombak UI blocks";

export default function Image() {
  return ogImage({
    kind: `${blocks.length} blocks`,
    title: "Whole sections, ready to ride.",
    description: "Heroes, pricing, testimonials and more, composed from Ombak components. One command installs everything.",
    accent: "#38bdf8",
  });
}
