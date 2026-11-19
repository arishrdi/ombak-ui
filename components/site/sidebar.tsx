"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Group = { label: string; links: { href: string; title: string }[] };

export function Sidebar({ groups }: { groups: Group[] }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-7 text-sm">
      {groups.map((g) => (
        <div key={g.label}>
          <p className="mb-2 px-3 font-mono text-[10.5px] font-medium tracking-[0.16em] text-muted-foreground/70 uppercase">{g.label}</p>
          <ul className="space-y-0.5">
            {g.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "relative block rounded-lg px-3 py-1.5 text-[13.5px] transition duration-200",
                    pathname === l.href
                      ? "surface font-medium text-foreground before:absolute before:top-1/2 before:left-0 before:h-3.5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-surf"
                      : "text-muted-foreground hover:translate-x-0.5 hover:text-foreground",
                  )}
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
