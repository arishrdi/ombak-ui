import { CATEGORY_LABELS, blocks, items } from "@/lib/registry";
import { registryUrl } from "@/lib/site";

/** Section kinds the planner can choose from, in their usual page order. */
export const SECTION_KINDS = [
  "navbar",
  "hero",
  "logos",
  "features",
  "stats",
  "testimonials",
  "pricing",
  "faq",
  "cta",
  "contact",
  "footer",
] as const;

/** Names of every Ombak component: the effects a section may use. */
export const EFFECT_NAMES = items.map((i) => i.name) as [string, ...string[]];

/** Names of the Ombak blocks (page sections), for the Next.js export. */
export const BLOCK_NAMES = blocks.map((b) => b.name) as [string, ...string[]];

const titleOf = new Map([...items, ...blocks].map((i) => [i.name, i.title]));

export function itemTitle(name: string) {
  return titleOf.get(name) ?? name;
}

/**
 * The catalog the planner and the page writer read. It never changes between requests,
 * so it sits in the cached part of the system prompt.
 */
export function catalogText() {
  const groups = new Map<string, string[]>();
  for (const i of items) {
    const c = CATEGORY_LABELS[i.categories?.[0] ?? ""] ?? "Other";
    groups.set(c, [...(groups.get(c) ?? []), `- ${i.name}: ${i.description}`]);
  }
  const components = [...groups.entries()].map(([label, lines]) => `### ${label}\n${lines.join("\n")}`).join("\n\n");
  const sections = blocks.map((b) => `- ${b.name} (${b.categories?.[0] ?? "section"}): ${b.description}`).join("\n");
  return `## Ombak components (effects)\n\n${components}\n\n## Ombak blocks (whole sections)\n\n${sections}`;
}

export function installCommand(name: string) {
  return `npx shadcn@latest add ${registryUrl(name)}`;
}
