"use client";

import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { NavGroup } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** ⌘K / Ctrl+K search over docs pages and components. */
export function CommandMenu({ groups }: { groups: NavGroup[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const all = groups.flatMap((g) => g.links.map((l) => ({ ...l, group: g.label })));
    const s = q.trim().toLowerCase();
    return s ? all.filter((l) => `${l.title} ${l.description ?? ""} ${l.group}`.toLowerCase().includes(s)) : all;
  }, [groups, q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // ⌘K / Ctrl+K only: "/" is left free for components demoed on the page (e.g. Expand Search)
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="surface flex h-9 items-center gap-2.5 rounded-full px-3.5 text-[13px] whitespace-nowrap text-muted-foreground transition hover:text-foreground sm:w-52"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <span className="hidden flex-1 text-left sm:inline">Search…</span>
        <kbd className="hidden rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] shadow-[0_0_0_1px_var(--border)] sm:inline">⌘K</kbd>
      </button>

      {open &&
        createPortal(
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-md" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-label="Search"
            className="w-full max-w-xl overflow-hidden rounded-3xl bg-popover/95 text-popover-foreground shadow-[inset_0_1px_0_var(--highlight),0_0_0_1px_var(--border),var(--shadow-lg)] backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, results.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                } else if (e.key === "Enter" && results[active]) go(results[active].href);
              }}
              placeholder="Search components and docs…"
              className="w-full border-b border-hairline bg-transparent px-6 py-5 text-base outline-none placeholder:text-muted-foreground"
            />
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted-foreground">No results.</li>}
              {results.map((r, i) => (
                <li key={r.href}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r.href)}
                    className={cn("flex w-full items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors", i === active && "bg-muted shadow-[inset_0_0_0_1px_var(--hairline)]")}
                  >
                    <span className="font-medium">{r.title}</span>
                    <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">{r.group}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>,
          document.body,
        )}
    </>
  );
}
