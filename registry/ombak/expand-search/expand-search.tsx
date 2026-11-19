"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ExpandSearchProps = {
  /** Called on every keystroke. */
  onSearch?: (query: string) => void;
  /** Called when Enter is pressed. */
  onSubmit?: (query: string) => void;
  /** Placeholder once open. Default "Search…" */
  placeholder?: string;
  /** Width when open, any CSS length. Default "18rem" */
  width?: string;
  /** Open with "/" from anywhere on the page. Default true */
  hotkey?: boolean;
  className?: string;
};

/**
 * A search icon that grows into a full search field, with a clear button. Opens on click or with
 * the "/" key, and collapses again when it's empty and loses focus or you press Escape.
 */
export function ExpandSearch({ onSearch, onSubmit, placeholder = "Search…", width = "18rem", hotkey = true, className }: ExpandSearchProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!hotkey) return;
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (["INPUT", "TEXTAREA"].includes(e.target.tagName) || e.target.isContentEditable);
      // leave "/" alone if something else on the page already handled it
      if (e.key === "/" && !typing && !e.defaultPrevented) {
        e.preventDefault();
        setOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hotkey]);

  const update = (v: string) => {
    setQ(v);
    onSearch?.(v);
  };

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(q);
      }}
      className={cn(
        "relative flex h-11 items-center overflow-hidden rounded-full border bg-background transition-[width,box-shadow] duration-500 ease-[cubic-bezier(.3,.7,.2,1)] motion-reduce:transition-none",
        open && "ring-4 ring-primary/10",
        className,
      )}
      style={{ width: open ? width : "2.75rem" }}
    >
      <label htmlFor={id} className="sr-only">
        Search
      </label>
      <button
        type="button"
        aria-label={open ? "Search" : "Open search"}
        aria-expanded={open}
        onClick={() => {
          setOpen(true);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        className="grid size-[2.625rem] shrink-0 place-items-center rounded-full text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60"
      >
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
      <input
        ref={inputRef}
        id={id}
        type="search"
        value={q}
        tabIndex={open ? 0 : -1}
        placeholder={placeholder}
        onChange={(e) => update(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            update("");
            setOpen(false);
          }
        }}
        onBlur={() => !q && setOpen(false)}
        className="min-w-0 flex-1 bg-transparent pr-2 text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
      />
      {q && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            update("");
            inputRef.current?.focus();
          }}
          className="mr-2 grid size-7 shrink-0 place-items-center rounded-full text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          ✕
        </button>
      )}
      {!q && open && hotkey && <kbd className="mr-3 rounded border px-1.5 font-mono text-[11px] text-muted-foreground">/</kbd>}
    </form>
  );
}
