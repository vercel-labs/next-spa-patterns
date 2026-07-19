import Link from 'next/link'

const links = [
  { href: '/use-context', label: 'use() + Context' },
  { href: '/swr', label: 'SWR' },
  { href: '/react-query', label: 'React Query' },
  { href: '/browser-only', label: 'Browser-only' },
  { href: '/shallow-routing', label: 'Shallow routing' },
  { href: '/server-actions', label: 'Server Actions' },
]

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-background/80 backdrop-blur dark:border-zinc-800">
      <nav className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 px-6 py-3 text-sm">
        <Link href="/" className="font-semibold">
          SPA patterns
        </Link>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-zinc-500 hover:text-foreground dark:text-zinc-400"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
