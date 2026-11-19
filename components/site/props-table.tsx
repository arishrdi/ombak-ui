import type { PropDoc } from "@/lib/registry";

export function PropsTable({ props }: { props: PropDoc[] }) {
  if (!props.length) return null;
  return (
    <div className="surface overflow-x-auto rounded-2xl">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/40 font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Default</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-t border-hairline align-top transition-colors hover:bg-muted/30">
              <td className="px-4 py-3 font-mono text-[13px] whitespace-nowrap text-foreground">
                {p.name}
                {p.required && <span className="ml-1 text-coral">*</span>}
              </td>
              <td className="max-w-[260px] px-4 py-3 font-mono text-[12px] text-[oklch(0.62_0.12_250)] dark:text-[oklch(0.78_0.09_230)]">{p.type}</td>
              <td className="px-4 py-3 font-mono text-[12px] whitespace-nowrap">{p.default || "–"}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
