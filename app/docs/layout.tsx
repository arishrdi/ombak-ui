import { Sidebar } from "@/components/site/sidebar";
import { navGroups } from "@/lib/nav";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-4 md:px-6">
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-hairline py-10 pr-4 [mask-image:linear-gradient(to_bottom,transparent,black_2.5rem,black_calc(100%-3rem),transparent)] [scrollbar-width:thin] md:block">
        <Sidebar groups={navGroups()} />
      </aside>
      <main className="min-w-0 flex-1 py-12 pb-28 md:pl-4">{children}</main>
    </div>
  );
}
