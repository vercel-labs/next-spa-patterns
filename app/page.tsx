const nativePatterns = [
  {
    href: '/use-context',
    title: 'use() within a Context Provider',
    description:
      'Hoist a fetch to a layout, pass the Promise unawaited through context, and unwrap it in a Client Component with use().',
  },
  {
    href: '/browser-only',
    title: 'Rendering components only in the browser',
    description:
      'Disable prerendering for a Client Component with next/dynamic and ssr: false.',
  },
  {
    href: '/shallow-routing',
    title: 'Shallow routing on the client',
    description:
      'Update the URL with pushState and read it back with useSearchParams, without a server round-trip.',
  },
  {
    href: '/mutations',
    title: 'Mutating data with Server Actions',
    description:
      'A to-do list with add, toggle, edit, and delete, using a Server Action as an async reducer with useOptimistic.',
  },
]

const libraryPatterns = [
  {
    href: '/swr',
    title: 'Client-side data fetching with SWR',
    description:
      'Seed a scoped SWRConfig fallback from a Server Component, then coordinate caches on mutation.',
  },
  {
    href: '/react-query',
    title: 'Client-side data fetching with TanStack Query',
    description:
      'Prefetch without awaiting, dehydrate into a HydrationBoundary, and read the cache with useSuspenseQuery on the client.',
  },
]

function PatternGrid({
  patterns,
}: {
  patterns: { href: string; title: string; description: string }[]
}) {
  return (
    <div className="mt-4 grid gap-4">
      {patterns.map((pattern) => (
        <a
          key={pattern.href}
          href={pattern.href}
          className="block rounded-lg border border-zinc-200 p-6 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
        >
          <div className="font-semibold">{pattern.title}</div>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {pattern.description}
          </p>
        </a>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Next.js SPA patterns</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Runnable demos for the{' '}
        <a
          className="underline hover:text-foreground"
          href="https://nextjs.org/docs/app/guides/single-page-applications"
        >
          Single-Page Applications guide
        </a>
        . Each route maps to one section of the guide. Open the network tab to
        watch the seeding and streaming behavior. The{' '}
        <a
          className="underline hover:text-foreground"
          href="https://github.com/vercel-labs/next-spa-patterns"
        >
          source is on GitHub
        </a>
        .
      </p>

      <h2 className="mt-12 text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
        Native patterns
      </h2>
      <PatternGrid patterns={nativePatterns} />

      <h2 className="mt-12 text-sm font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
        Client-side data-fetching libraries
      </h2>
      <PatternGrid patterns={libraryPatterns} />
    </>
  )
}
