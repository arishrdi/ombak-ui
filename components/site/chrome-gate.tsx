"use client";

import { usePathname } from "next/navigation";

/** Hides site chrome (the header) on bare /view pages, which are rendered inside iframes. */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname?.startsWith("/view/") ? null : children;
}
