import type { PropDoc } from "@/lib/registry";

export function PropsTable({ props }: { props: PropDoc[] }) {
  if (!props.length) return null;
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Default</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p) => (
            <tr key={p.name} className="border-t align-top">
              <td className="px-4 py-3 font-mono text-[13px] whitespace-nowrap">
                {p.name}
                {p.required && <span className="ml-1 text-coral">*</span>}
              </td>
              <td className="max-w-[260px] px-4 py-3 font-mono text-[12px] text-muted-foreground">{p.type}</td>
              <td className="px-4 py-3 font-mono text-[12px] whitespace-nowrap">{p.default || "–"}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
