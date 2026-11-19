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
  const html = await codeToHtml(code.trim(), { lang, theme: "vesper" });
  return (
    <div className={cn("code-block relative overflow-hidden rounded-2xl bg-[oklch(0.16_0.012_250)] text-white shadow-[inset_0_1px_0_oklch(1_0_0/6%),0_0_0_1px_oklch(1_0_0/8%),var(--shadow-md)] dark:shadow-[inset_0_1px_0_oklch(1_0_0/5%),0_0_0_1px_oklch(1_0_0/8%)]", className)}>
      {title && (
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5 font-mono text-xs text-white/55">
          <span className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
          </span>
          {title}
        </div>
      )}
      <CopyButton value={code.trim()} className={cn("absolute right-3 border-white/10 bg-white/[0.04] text-white/60 hover:text-white", title ? "top-1.5" : "top-3")} />
      <div className="max-h-[560px] overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
