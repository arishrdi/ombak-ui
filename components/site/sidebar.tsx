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
          <p className="mb-2 px-3 font-medium text-foreground">{g.label}</p>
          <ul className="space-y-0.5">
            {g.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "block rounded-md px-3 py-1.5 transition",
                    pathname === l.href ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
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
