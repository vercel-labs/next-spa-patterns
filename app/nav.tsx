import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/use-context', label: 'use() + Context' },
  { href: '/swr', label: 'SWR' },
  { href: '/react-query', label: 'React Query' },
  { href: '/browser-only', label: 'Browser-only' },
  { href: '/shallow-routing', label: 'Shallow routing' },
  { href: '/server-actions', label: 'Server Actions' },
]

export function Nav() {
  return (
    <nav>
      <Link href="/" className="brand">
        SPA patterns
      </Link>
      {links.slice(1).map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
