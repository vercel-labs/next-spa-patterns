const patterns = [
  {
    href: '/use-context',
    title: 'use() within a Context Provider',
    description:
      'Hoist a fetch to a layout, pass the Promise (unawaited) through context, unwrap it in a Client Component with use().',
  },
  {
    href: '/swr',
    title: 'SPAs with SWR',
    description:
      'Seed a scoped <SWRConfig> fallback from a Server Component. Includes the silent key-mismatch pitfall as a toggle.',
  },
  {
    href: '/react-query',
    title: 'SPAs with React Query',
    description:
      'prefetchQuery without awaiting, dehydrate into <HydrationBoundary>, read with useSuspenseQuery on the client.',
  },
  {
    href: '/browser-only',
    title: 'Rendering components only in the browser',
    description: 'Disable prerendering for a Client Component with next/dynamic and ssr: false.',
  },
  {
    href: '/shallow-routing',
    title: 'Shallow routing on the client',
    description:
      'Update the URL with window.history.pushState and read it back with useSearchParams, without a server round-trip.',
  },
  {
    href: '/server-actions',
    title: 'Server Actions in Client Components',
    description:
      'Call a Server Action from a Client Component and drive loading/error state with useActionState. No API route.',
  },
]

export default function Home() {
  return (
    <main>
      <h1>Next.js SPA patterns</h1>
      <p className="muted">
        Runnable demos for the{' '}
        <a href="https://nextjs.org/docs/app/guides/single-page-applications">
          Single-Page Applications guide
        </a>
        . Each route maps to one section of the guide. Open your network tab and
        throttle to watch the seeding and streaming behavior.
      </p>
      <ul className="pattern-list">
        {patterns.map((pattern) => (
          <li key={pattern.href}>
            <a href={pattern.href}>{pattern.title}</a>
            <p>{pattern.description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
