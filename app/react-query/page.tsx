import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { getUser } from '@/lib/user'
import { getQueryClient } from './get-query-client'
import { Profile } from './profile'

export default function ReactQueryPage() {
  const queryClient = getQueryClient()

  // Start the request on the server WITHOUT awaiting. Because pending queries
  // are dehydrated, the query streams to the client and resolves there.
  queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getUser })

  return (
    <main>
      <h1>SPAs with React Query</h1>
      <p className="muted">
        The server starts <code>prefetchQuery</code> without awaiting, then
        serializes the cache with <code>&lt;HydrationBoundary&gt;</code>.{' '}
        <code>useSuspenseQuery</code> reads it on the client with the same key.
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div className="card">Loading profile…</div>}>
          <Profile />
        </Suspense>
      </HydrationBoundary>
    </main>
  )
}
