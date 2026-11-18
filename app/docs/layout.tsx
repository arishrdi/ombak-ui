import { Sidebar } from "@/components/site/sidebar";
import { groupedItems } from "@/lib/registry";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const groups = [
    {
      label: "Getting started",
      links: [
        { href: "/docs", title: "Introduction" },
        { href: "/docs/installation", title: "Installation" },
      ],
    },
    ...groupedItems().map((g) => ({
      label: g.label,
      links: g.items.map((i) => ({ href: `/docs/components/${i.name}`, title: i.title })),
    })),
  ];
  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 md:px-6">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-10 md:block">
        <Sidebar groups={groups} />
      </aside>
      <main className="min-w-0 flex-1 py-10 pb-24">{children}</main>
    </div>
  );
}
