import { CATEGORY_LABELS, blocks, groupedItems, items, templates } from "@/lib/registry";

export type NavGroup = { label: string; links: { href: string; title: string; description?: string }[] };

/** Navigation shared by the sidebar, the mobile menu and the ⌘K search. Server-only (reads the registry). */
export function navGroups(): NavGroup[] {
  return [
    {
      label: "Getting started",
      links: [
        { href: "/docs", title: "Introduction" },
        { href: "/docs/installation", title: "Installation" },
        { href: "/docs/components", title: "All components" },
        { href: "/blocks", title: "Blocks" },
        { href: "/templates", title: "Templates" },
        { href: "/kit", title: "Your kit" },
      ],
    },
    ...groupedItems().map((g) => ({
      label: g.label,
      links: g.items.map((i) => ({ href: `/docs/components/${i.name}`, title: i.title, description: i.description })),
    })),
    {
      label: "Blocks",
      links: blocks.map((b) => ({ href: `/blocks/${b.name}`, title: b.title, description: b.description })),
    },
    {
      label: "Templates",
      links: templates.map((t) => ({ href: `/templates/${t.name}`, title: t.title, description: t.description })),
    },
  ];
}

export function cardItems() {
  return items.map((i) => ({
    name: i.name,
    title: i.title,
    description: i.description,
    category: CATEGORY_LABELS[i.categories?.[0] ?? ""] ?? "",
  }));
}
