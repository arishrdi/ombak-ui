import { ogImage, ogSize } from "@/lib/og";
import { templates } from "@/lib/registry";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Ombak UI templates";

export default function Image() {
  return ogImage({
    kind: `${templates.length} templates`,
    title: "Whole pages, one command.",
    description: "Landing pages assembled from Ombak blocks. Install one, swap the copy, and you have a site that moves.",
    accent: "#f97362",
  });
}
