import Link from "next/link";
import { Logo } from "./logo";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="Ombak UI home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
            <Link href="/docs" className="transition hover:text-foreground">Docs</Link>
            <Link href="/docs/components/wave-background" className="transition hover:text-foreground">Components</Link>
          </nav>
        </div>
        <a href={site.github} className="text-sm text-muted-foreground transition hover:text-foreground">
          GitHub
        </a>
      </div>
    </header>
  );
}
