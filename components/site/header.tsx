import Link from "next/link";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { CommandMenu } from "./command-menu";
import { MobileNav } from "./mobile-nav";
import { navGroups } from "@/lib/nav";
import { site } from "@/lib/site";

export function Header() {
  const groups = navGroups();
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/60 backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2 lg:gap-8">
          <MobileNav groups={groups} />
          <Link href="/" aria-label="Ombak UI home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 text-[13px] font-medium text-muted-foreground lg:flex">
            <Link href="/docs" className="rounded-full px-3 py-1.5 transition hover:bg-muted/60 hover:text-foreground">Docs</Link>
            <Link href="/docs/components" className="rounded-full px-3 py-1.5 transition hover:bg-muted/60 hover:text-foreground">Components</Link>
            <Link href="/blocks" className="rounded-full px-3 py-1.5 transition hover:bg-muted/60 hover:text-foreground">Blocks</Link>
            <Link href="/templates" className="rounded-full px-3 py-1.5 transition hover:bg-muted/60 hover:text-foreground">Templates</Link>
            <Link href="/themes" className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition hover:bg-muted/60 hover:text-foreground">
              Themes
              <span className="rounded-full bg-surf/15 px-1.5 py-px font-mono text-[9px] tracking-wider text-surf uppercase">New</span>
            </Link>
            <Link href="/generate" className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition hover:bg-muted/60 hover:text-foreground">
              Generate
              <span className="rounded-full bg-surf/15 px-1.5 py-px font-mono text-[9px] tracking-wider text-surf uppercase">Beta</span>
            </Link>
            <Link href="/docs/installation" className="rounded-full px-3 py-1.5 transition hover:bg-muted/60 hover:text-foreground">Installation</Link>
          </nav>
        </div>
        <div className="flex items-center gap-1.5">
          <CommandMenu groups={groups} />
          <ThemeToggle />
          <a
            href={site.github}
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>
          </a>
        </div>
      </div>
    </header>
  );
}
