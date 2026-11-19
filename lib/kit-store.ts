"use client";

import { useSyncExternalStore } from "react";

/**
 * The visitor's kit: names of components, blocks and templates they picked, kept in localStorage
 * and shared across tabs. Every registry item has a unique name, so a flat list is enough.
 */
const KEY = "ombak-kit";
const EMPTY: string[] = [];
let items: string[] | null = null;
const listeners = new Set<() => void>();

function read(): string[] {
  if (items) return items;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    items = Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
  } catch {
    items = [];
  }
  return items;
}

function write(next: string[]) {
  items = [...new Set(next)];
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage blocked: the kit still works for this page view */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      items = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export const kit = {
  add: (name: string) => write([...read(), name]),
  remove: (name: string) => write(read().filter((n) => n !== name)),
  toggle: (name: string) => (read().includes(name) ? kit.remove(name) : kit.add(name)),
  set: (names: string[]) => write(names),
  clear: () => write([]),
};

/** The current kit; empty during server render and the first client render. */
export function useKit() {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}
