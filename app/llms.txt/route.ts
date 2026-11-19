import { blocks, items, templates } from "@/lib/registry";
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
    "## Blocks",
    "",
    "Page sections composed from the components above. Installing a block also installs the components it uses.",
    "",
    ...blocks.map(
      (b) =>
        `- [${b.title}](${site.url}/blocks/${b.name}): ${b.description} Install: \`npx shadcn@latest add ${registryUrl(b.name)}\``,
    ),
    "",
    "## Templates",
    "",
    "Complete landing pages composed from the blocks above. Installing a template installs every block and component it uses.",
    "",
    ...templates.map(
      (t) =>
        `- [${t.title}](${site.url}/templates/${t.name}): ${t.description} Install: \`npx shadcn@latest add ${registryUrl(t.name)}\``,
    ),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
