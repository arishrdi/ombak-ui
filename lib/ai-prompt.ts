import type { PropDoc } from "@/lib/registry";
import { registryUrl, site } from "@/lib/site";

/**
 * Markdown context for pasting a component, block or template into an AI assistant
 * (ChatGPT, Claude, v0, Cursor…). Built at render time from the same data as the docs page.
 */
export type PromptInput = {
  kind: "component" | "block" | "template";
  name: string;
  title: string;
  description: string;
  /** Docs page path, e.g. "/docs/components/marquee". */
  path: string;
  /** npm packages the item needs besides React. */
  dependencies?: string[];
  /** Ombak items installed along with it (titles). */
  includes?: string[];
  usage: string;
  props: PropDoc[];
  source: string;
};

const fence = (lang: string, code: string) => `\`\`\`${lang}\n${code.trim()}\n\`\`\``;
const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");

function propsTable(props: PropDoc[]) {
  if (!props.length) return "";
  const rows = props.map((p) => `| \`${p.name}\`${p.required ? " (required)" : ""} | \`${cell(p.type)}\` | ${p.default ? `\`${cell(p.default)}\`` : "–"} | ${cell(p.description)} |`);
  return ["| Prop | Type | Default | Description |", "|---|---|---|---|", ...rows].join("\n");
}

/** Builds the prompt; the source code is optional because it can be long. */
export function buildPrompt(input: PromptInput, withSource: boolean) {
  const kind = {
    component: "An Ombak component.",
    block: "An Ombak block: a ready-made page section built from Ombak components.",
    template: "An Ombak template: a complete landing page built from Ombak blocks.",
  }[input.kind];
  const file = `components/${input.name}.tsx`;
  const parts = [
    `I'm using Ombak UI (${site.url}), a free shadcn registry of motion components for React and Tailwind CSS v4. Components are copied into the project with the shadcn CLI and styled with shadcn theme tokens (bg-primary, text-muted-foreground, …), so they follow my theme.`,
    `## ${input.title}`,
    `${kind} ${input.description}`,
    `Docs: ${site.url}${input.path}`,
    `### Install`,
    fence("bash", `npx shadcn@latest add ${registryUrl(input.name)}`),
    [
      `This adds \`${file}\`.`,
      input.dependencies?.length ? ` npm dependencies: ${input.dependencies.join(", ")}.` : "",
      input.includes?.length ? ` It also installs: ${input.includes.join(", ")}.` : "",
    ].join(""),
    `### Usage`,
    fence("tsx", input.usage),
    input.props.length ? `### Props\n\n${propsTable(input.props)}` : "",
    `### Notes`,
    [
      `- Import from \`@/components/${input.name}\`.`,
      `- Respects prefers-reduced-motion; hover-only effects switch off on touch screens.`,
      `- Client component ("use client") when it uses hooks; works inside Next.js App Router server components.`,
    ].join("\n"),
    withSource ? `### Source (\`${file}\`)\n\n${fence("tsx", input.source)}` : "",
    `---`,
    `My task: `,
  ];
  return parts.filter(Boolean).join("\n\n");
}

/** v0's documented entry point for opening a public registry item. */
export const openInV0Url = (name: string) => `https://v0.dev/chat/api/open?url=${encodeURIComponent(registryUrl(name))}`;
