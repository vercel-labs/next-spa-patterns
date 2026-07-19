import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { getUser } from '@/lib/user'
import { getQueryClient } from './get-query-client'
import { Profile } from './profile'

export default function ReactQueryPage() {
  const queryClient = getQueryClient()

  // Start on the server without awaiting; pending queries dehydrate and stream.
  queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getUser })

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        SPAs with React Query
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Prefetch on the server, <code>dehydrate</code> into a{' '}
        <code>&lt;HydrationBoundary&gt;</code>, and read with{' '}
        <code>useSuspenseQuery</code>.
      </p>
      <div className="mt-8">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense
            fallback={
              <div className="rounded-lg border border-zinc-200 p-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                Loading profile…
              </div>
            }
          >
            <Profile />
          </Suspense>
        </HydrationBoundary>
      </div>
    </>
  )
}
