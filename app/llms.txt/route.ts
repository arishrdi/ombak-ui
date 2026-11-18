import { items } from "@/lib/registry";
import { registryUrl, site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# Ombak UI",
    "",
    `> ${site.description}`,
    "",
    "Components are copied into the user's project with the shadcn CLI. Requires React 18+ and Tailwind CSS v4.",
    "",
    "## Components",
    "",
    ...items.map(
      (i) =>
        `- [${i.title}](${site.url}/docs/components/${i.name}): ${i.description} Install: \`npx shadcn@latest add ${registryUrl(i.name)}\``,
    ),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
