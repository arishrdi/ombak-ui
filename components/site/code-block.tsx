import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

/** Server-rendered, syntax-highlighted code with a copy button. */
export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
}: {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
}) {
  const html = await codeToHtml(code.trim(), { lang, theme: "github-dark-default" });
  return (
    <div className={cn("code-block relative overflow-hidden rounded-xl border bg-[#0d1117] text-white", className)}>
      {title && <div className="border-b border-white/10 px-5 py-2.5 font-mono text-xs text-white/60">{title}</div>}
      <CopyButton value={code.trim()} className={cn("absolute right-3 border-white/15 bg-white/5 text-white/70 hover:text-white", title ? "top-1.5" : "top-3")} />
      <div className="max-h-[560px] overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
