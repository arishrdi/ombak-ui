"use client";

import { useId, useRef, useState, type DragEvent } from "react";
import { cn } from "@/lib/utils";

export type FileDropzoneProps = {
  /** Called with the accepted files each time files are added. */
  onFiles?: (files: File[]) => void;
  /** Accepted types, like the input's accept attribute, e.g. "image/*,.pdf". */
  accept?: string;
  /** Allow several files. Default true */
  multiple?: boolean;
  /** Maximum size per file in bytes. Larger files are rejected with a message. */
  maxSize?: number;
  /** Main prompt. Default "Drop files here or click to browse" */
  prompt?: string;
  className?: string;
};

const fmt = (b: number) => (b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`);

function matches(file: File, accept?: string) {
  if (!accept) return true;
  return accept.split(",").some((rule) => {
    const r = rule.trim().toLowerCase();
    if (r.startsWith(".")) return file.name.toLowerCase().endsWith(r);
    if (r.endsWith("/*")) return file.type.startsWith(r.slice(0, -1));
    return file.type === r;
  });
}

/**
 * A drag-and-drop file area: the border ripples while you drag over it, files can also be picked
 * with the keyboard (it's a real file input), and the added files are listed with their sizes.
 */
export function FileDropzone({ onFiles, accept, multiple = true, maxSize, prompt = "Drop files here or click to browse", className }: FileDropzoneProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const add = (list: FileList | null) => {
    if (!list) return;
    const ok: File[] = [];
    const bad: string[] = [];
    for (const f of Array.from(list)) {
      if (!matches(f, accept)) bad.push(`${f.name}: type not allowed`);
      else if (maxSize && f.size > maxSize) bad.push(`${f.name}: larger than ${fmt(maxSize)}`);
      else ok.push(f);
    }
    const next = multiple ? [...files, ...ok] : ok.slice(0, 1);
    setFiles(next);
    setErrors(bad);
    if (ok.length) onFiles?.(ok);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    add(e.dataTransfer.files);
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
          "has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ring/40",
          over ? "border-primary bg-primary/5" : "hover:border-primary/50 hover:bg-muted/40",
        )}
      >
        <style>{`@keyframes ombak-drop-ring{from{transform:scale(.4);opacity:.6}to{transform:scale(2.2);opacity:0}}`}</style>
        {over && (
          <span aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="absolute size-32 rounded-full border-2 border-primary motion-reduce:hidden"
                style={{ animation: `ombak-drop-ring 1.4s ease-out ${i * 0.7}s infinite` }}
              />
            ))}
          </span>
        )}
        <span className={cn("relative grid size-12 place-items-center rounded-full bg-muted transition-transform duration-300", over && "-translate-y-1 scale-110")}>
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4" />
          </svg>
        </span>
        <span className="relative text-sm font-medium">{over ? "Release to upload" : prompt}</span>
        {(accept || maxSize) && (
          <span className="relative text-xs text-muted-foreground">
            {[accept, maxSize && `up to ${fmt(maxSize)}`].filter(Boolean).join(" · ")}
          </span>
        )}
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            add(e.target.files);
            e.target.value = "";
          }}
          className="sr-only"
        />
      </label>
      {errors.length > 0 && (
        <ul role="alert" className="mt-3 space-y-1 text-xs text-red-500">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-xl border bg-card px-3 py-2 text-sm [animation:ombak-file-in_.3s_ease-out] motion-reduce:animate-none">
              <span className="truncate">{f.name}</span>
              <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                {fmt(f.size)}
                <button
                  type="button"
                  aria-label={`Remove ${f.name}`}
                  onClick={() => setFiles((all) => all.filter((_, k) => k !== i))}
                  className="grid size-6 place-items-center rounded-md hover:bg-muted hover:text-foreground"
                >
                  ✕
                </button>
              </span>
            </li>
          ))}
          <style>{`@keyframes ombak-file-in{from{opacity:0;transform:translateY(-4px)}}`}</style>
        </ul>
      )}
    </div>
  );
}
