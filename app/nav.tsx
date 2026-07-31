"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Native patterns, in the order the guide's Examples section lists them.
const nativeLinks = [
  { href: "/use-context", label: "use() + Context" },
  { href: "/browser-only", label: "Browser-only" },
  { href: "/shallow-routing", label: "Shallow routing" },
  { href: "/mutations", label: "Mutations" },
] as const;

// Client-side data-fetching libraries, matching the guide's split child pages.
const libraryLinks = [
  { href: "/swr", label: "SWR" },
  { href: "/react-query", label: "TanStack Query" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return <NavContent pathname={pathname} />;
}

export function NavFallback() {
  return <NavContent />;
}

function NavContent({ pathname }: { pathname?: string }) {
  function linkClass(active: boolean) {
    return active
      ? "shrink-0 rounded-md bg-zinc-100 px-2.5 py-1 font-medium text-foreground dark:bg-zinc-800"
      : "shrink-0 rounded-md px-2.5 py-1 text-zinc-500 hover:text-foreground dark:text-zinc-400";
  }

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-background/80 backdrop-blur dark:border-zinc-800">
      <div className="mx-auto max-w-3xl px-6 py-3">
        <Link href="/" className="font-semibold text-foreground">
          SPA patterns
        </Link>
        <nav className="mt-2 flex flex-wrap items-center gap-1 text-sm">
          {nativeLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={linkClass(pathname === link.href)}
            >
              {link.label}
            </Link>
          ))}
          <span
            aria-hidden
            className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-800"
          />
          {libraryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={linkClass(pathname === link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
