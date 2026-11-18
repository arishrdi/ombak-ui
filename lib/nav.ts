import { CATEGORY_LABELS, groupedItems, items } from "@/lib/registry";

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
      ],
    },
    ...groupedItems().map((g) => ({
      label: g.label,
      links: g.items.map((i) => ({ href: `/docs/components/${i.name}`, title: i.title, description: i.description })),
    })),
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
