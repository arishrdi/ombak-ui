import type { Metadata } from "next";
import { ComponentsGrid } from "@/components/site/components-grid";
import { cardItems } from "@/lib/nav";

export const metadata: Metadata = { title: "Components", description: "Every Ombak UI component with a live preview." };

export default function ComponentsIndex() {
  const list = cardItems();
  return (
    <div>
      <h1 className="font-display text-5xl font-bold tracking-tight">Components</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        {list.length} components, all free and MIT licensed. Hover the previews to play with them.
      </p>
      <div className="mt-10">
        <ComponentsGrid items={list} />
      </div>
    </div>
  );
}
