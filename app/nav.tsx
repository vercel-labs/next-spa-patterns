'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/use-context', label: 'use() + Context' },
  { href: '/swr', label: 'SWR' },
  { href: '/react-query', label: 'React Query' },
  { href: '/browser-only', label: 'Browser-only' },
  { href: '/shallow-routing', label: 'Shallow routing' },
  { href: '/mutations', label: 'Mutations' },
] as const

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-background/80 backdrop-blur dark:border-zinc-800">
      <nav className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-1 gap-y-1 px-6 py-3 text-sm">
        <Link href="/" className="mr-3 font-semibold text-foreground">
          SPA patterns
        </Link>
        {links.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={
                active
                  ? 'rounded-md bg-zinc-100 px-2.5 py-1 font-medium text-foreground dark:bg-zinc-800'
                  : 'rounded-md px-2.5 py-1 text-zinc-500 hover:text-foreground dark:text-zinc-400'
              }
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
