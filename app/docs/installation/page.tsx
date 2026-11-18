import type { Metadata } from "next";
import { CodeBlock } from "@/components/site/code-block";
import { registryUrl, site } from "@/lib/site";

export const metadata: Metadata = { title: "Installation" };

export default function Installation() {
  return (
    <article className="max-w-2xl space-y-10">
      <div>
        <h1 className="font-display text-5xl font-bold tracking-tight">Installation</h1>
        <p className="mt-4 text-lg text-muted-foreground">Ombak UI works with any React project that uses Tailwind CSS v4.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Set up shadcn</h2>
        <p className="text-muted-foreground">Skip this if your project already has a <code>components.json</code>.</p>
        <CodeBlock lang="bash" code="npx shadcn@latest init" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Add a component</h2>
        <p className="text-muted-foreground">Use the component&apos;s registry URL:</p>
        <CodeBlock lang="bash" code={`npx shadcn@latest add ${registryUrl("text-reveal")}`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Optional: use the @ombak namespace</h2>
        <p className="text-muted-foreground">
          Add the registry to <code>components.json</code> once, then install by name:
        </p>
        <CodeBlock
          lang="json"
          title="components.json"
          code={JSON.stringify({ registries: { "@ombak": `${site.url}/r/{name}.json` } }, null, 2)}
        />
        <CodeBlock lang="bash" code="npx shadcn@latest add @ombak/text-reveal @ombak/marquee" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Using an AI assistant?</h2>
        <p className="text-muted-foreground">
          Point it to <code>{site.url}/llms.txt</code>: a plain-text list of every component with its install command.
        </p>
      </section>
    </article>
  );
}
