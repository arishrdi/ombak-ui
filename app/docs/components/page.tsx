import type { Metadata } from "next";
import { ComponentCard } from "@/components/site/component-card";
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
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((item) => (
          <ComponentCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
