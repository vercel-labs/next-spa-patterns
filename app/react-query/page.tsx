import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { getUser } from '@/lib/user'
import { getQueryClient } from './get-query-client'
import { Profile } from './profile'

export default function ReactQueryPage() {
  const queryClient = getQueryClient()

  // Start the request on the server without awaiting. Because pending queries
  // are dehydrated, the query streams to the client and resolves there.
  queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getUser })

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        SPAs with React Query
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The server starts <code>prefetchQuery</code> without awaiting, then
        serializes the cache with <code>&lt;HydrationBoundary&gt;</code>.{' '}
        <code>useSuspenseQuery</code> reads it on the client with the same key.
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
