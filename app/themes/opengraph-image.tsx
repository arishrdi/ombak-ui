import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Ombak UI theme builder";

export default function Image() {
  return ogImage({
    kind: "Theme builder",
    title: "Your colors, every wave.",
    description: "Pick a color, tint and radius, watch components restyle live, and copy the CSS.",
    accent: "#a78bfa",
  });
}
