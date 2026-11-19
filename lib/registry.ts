import fs from "node:fs";
import path from "node:path";
import registry from "@/registry.json";

export type RegistryItem = {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies?: string[];
  categories?: string[];
  registryDependencies?: string[];
  files: { path: string }[];
};

export type PropDoc = { name: string; type: string; required: boolean; description: string; default: string };

export const CATEGORY_LABELS: Record<string, string> = {
  background: "Backgrounds",
  text: "Text",
  scroll: "Scroll",
  interaction: "Interaction",
  buttons: "Buttons",
  cards: "Cards",
  loaders: "Loaders",
  navigation: "Navigation",
  forms: "Forms",
};

const all = registry.items as RegistryItem[];

/** Single components (registry:component). */
export const items = all.filter((i) => i.type !== "registry:block");

const isTemplate = (i: RegistryItem) => i.categories?.includes("template") ?? false;

/** Page sections composed from components (registry:block). */
export const blocks = all.filter((i) => i.type === "registry:block" && !isTemplate(i));

/** Whole pages composed from blocks and components (registry:block, category "template"). */
export const templates = all.filter((i) => i.type === "registry:block" && isTemplate(i));

export const BLOCK_CATEGORY_LABELS: Record<string, string> = {
  hero: "Hero",
  "social-proof": "Social proof",
  features: "Features",
  pricing: "Pricing",
  faq: "FAQ",
  cta: "Call to action",
  navigation: "Navigation",
  contact: "Contact",
  footer: "Footer",
};

export function getItem(slug: string) {
  return items.find((i) => i.name === slug);
}

/** Items grouped by their first category, in the order categories first appear. */
export function groupedItems() {
  const groups = new Map<string, RegistryItem[]>();
  for (const item of items) {
    const c = item.categories?.[0] ?? "other";
    groups.set(c, [...(groups.get(c) ?? []), item]);
  }
  return [...groups.entries()].map(([key, list]) => ({ key, label: CATEGORY_LABELS[key] ?? key, items: list }));
}

export function getSource(slug: string) {
  const item = getItem(slug);
  if (!item) return "";
  // scoped to registry/ombak so the build only traces component sources
  return fs.readFileSync(path.join(process.cwd(), "registry", "ombak", item.name, `${item.name}.tsx`), "utf8");
}

export function getBlock(slug: string) {
  return blocks.find((b) => b.name === slug);
}

export function getTemplate(slug: string) {
  return templates.find((t) => t.name === slug);
}

/** Rewrites site-internal imports to where files land after install: "@/components/<name>". */
function toInstalledImports(src: string) {
  return src.replace(/@\/registry\/(?:ombak|blocks)\/([\w-]+)\/\1/g, "@/components/$1");
}

/** Block source as the user receives it. */
export function getBlockSource(slug: string) {
  const block = getBlock(slug);
  if (!block) return "";
  return toInstalledImports(fs.readFileSync(path.join(process.cwd(), "registry", "blocks", block.name, `${block.name}.tsx`), "utf8"));
}

/** Template source as the user receives it. */
export function getTemplateSource(slug: string) {
  const t = getTemplate(slug);
  if (!t) return "";
  return toInstalledImports(fs.readFileSync(path.join(process.cwd(), "registry", "templates", t.name, `${t.name}.tsx`), "utf8"));
}

function dependencyNames(item?: RegistryItem) {
  return (item?.registryDependencies ?? []).map((d) => d.match(/\/r\/([\w-]+)\.json$/)?.[1]).filter((n): n is string => !!n);
}

/** Names of the Ombak components a block is built from. */
export function blockComponents(slug: string) {
  return dependencyNames(getBlock(slug)).filter((n) => !!getItem(n));
}

/** The blocks (in page order) and extra components a template uses. */
export function templateParts(slug: string) {
  const names = dependencyNames(getTemplate(slug));
  return { blocks: names.filter((n) => !!getBlock(n)), components: names.filter((n) => !!getItem(n)) };
}

export function getProps(slug: string): PropDoc[] {
  return parseProps(getSource(slug));
}

export function getBlockProps(slug: string): PropDoc[] {
  return parseProps(getBlockSource(slug));
}

/** Reads `export type XProps = { … }` from a source file, using the JSDoc above each prop. */
function parseProps(src: string): PropDoc[] {
  const block = src.match(/export type \w+Props(?:<[^>]*>)? = \{([\s\S]*?)\n\}/);
  if (!block) return [];
  const props: PropDoc[] = [];
  let doc = "";
  for (const raw of block[1].split("\n")) {
    const line = raw.trim();
    const d = line.match(/^\/\*\*\s*(.*?)\s*\*\/$/);
    if (d) {
      doc = d[1];
      continue;
    }
    const p = line.match(/^(\w+)(\?)?:\s*(.+?);$/);
    if (p) {
      const def = doc.match(/Default (.+?)\.?$/);
      props.push({
        name: p[1],
        required: !p[2],
        type: p[3],
        description: doc.replace(/\s*Default .+$/, ""),
        default: def ? def[1] : "",
      });
      doc = "";
    }
  }
  return props;
}
