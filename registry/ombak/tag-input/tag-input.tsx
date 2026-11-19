"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

export type TagInputProps = {
  /** Visible label. */
  label: string;
  /** Tags (controlled). */
  value?: string[];
  /** Starting tags when uncontrolled. Default [] */
  defaultValue?: string[];
  /** Called with the full list after every change. */
  onChange?: (tags: string[]) => void;
  /** Maximum number of tags. */
  max?: number;
  /** Placeholder for the text box. Default "Add a tag…" */
  placeholder?: string;
  className?: string;
};

/**
 * Type and press Enter (or comma) to add a tag; Backspace on an empty box removes the last one.
 * Pasting "a, b, c" adds three. Each tag has its own remove button, and changes are announced.
 */
export function TagInput({ label, value, defaultValue = [], onChange, max, placeholder = "Add a tag…", className }: TagInputProps) {
  const id = useId();
  const [inner, setInner] = useState(defaultValue);
  const tags = value ?? inner;
  const [text, setText] = useState("");
  const [announce, setAnnounce] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const set = (next: string[]) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };
  const addMany = (raw: string) => {
    const parts = raw.split(",").map((t) => t.trim()).filter(Boolean);
    const next = [...tags];
    for (const t of parts) {
      if (max && next.length >= max) break;
      if (!next.some((x) => x.toLowerCase() === t.toLowerCase())) next.push(t);
    }
    if (next.length !== tags.length) {
      set(next);
      setAnnounce(`Added ${next.slice(tags.length).join(", ")}`);
    }
    setText("");
  };
  const remove = (i: number) => {
    setAnnounce(`Removed ${tags[i]}`);
    set(tags.filter((_, k) => k !== i));
    inputRef.current?.focus();
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && text.trim()) {
      e.preventDefault();
      addMany(text);
    } else if (e.key === "Backspace" && !text && tags.length) {
      remove(tags.length - 1);
    }
  };

  const full = max !== undefined && tags.length >= max;
  return (
    <div className={cn("w-full max-w-md", className)}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex min-h-11 flex-wrap items-center gap-1.5 rounded-xl border bg-background px-2 py-1.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15"
      >
        {tags.map((t, i) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-lg bg-primary/12 py-1 pr-1 pl-2.5 text-sm text-foreground [animation:ombak-tag-in_.25s_cubic-bezier(.3,1.5,.5,1)] motion-reduce:animate-none"
          >
            {t}
            <button
              type="button"
              aria-label={`Remove ${t}`}
              onClick={(e) => {
                e.stopPropagation();
                remove(i);
              }}
              className="grid size-5 place-items-center rounded-md text-xs text-muted-foreground hover:bg-primary/20 hover:text-foreground"
            >
              ✕
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          id={id}
          value={text}
          disabled={full}
          placeholder={full ? `Limit of ${max} reached` : placeholder}
          onChange={(e) => {
            const v = e.target.value;
            if (v.includes(",")) addMany(v);
            else setText(v);
          }}
          onKeyDown={onKey}
          onBlur={() => text.trim() && addMany(text)}
          className="min-w-24 flex-1 bg-transparent px-1.5 py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
      </div>
      <span className="sr-only" aria-live="polite">
        {announce}
      </span>
      <style>{`@keyframes ombak-tag-in{from{opacity:0;transform:scale(.6)}}`}</style>
    </div>
  );
}
