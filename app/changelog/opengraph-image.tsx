import { releases } from "@/content/changelog";
import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Ombak UI changelog";

export default function Image() {
  const latest = releases[0];
  return ogImage({
    kind: "Changelog",
    title: "What's new in Ombak UI",
    description: latest ? `Latest: ${latest.title}. ${latest.summary}` : undefined,
  });
}
