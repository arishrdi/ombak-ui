import { Sidebar } from "@/components/site/sidebar";
import { navGroups } from "@/lib/nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 md:px-6">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto py-10 md:block">
        <Sidebar groups={navGroups()} />
      </aside>
      <main className="min-w-0 flex-1 py-10 pb-24">{children}</main>
    </div>
  );
}
