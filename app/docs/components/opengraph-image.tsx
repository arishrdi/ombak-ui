import { ogImage, ogSize } from "@/lib/og";
import { items } from "@/lib/registry";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Ombak UI components";

export default function Image() {
  return ogImage({
    kind: `${items.length} components`,
    title: "Motion components for React.",
    description: "Scroll effects, text animations and interactive details. Free, MIT licensed, and installed with the shadcn CLI.",
  });
}
