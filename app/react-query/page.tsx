import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { connection } from 'next/server'
import { getUser } from '@/lib/user'
import { getQueryClient } from './get-query-client'
import { Profile } from './profile'

async function ReactQueryData() {
  await connection()
  const queryClient = getQueryClient()

  queryClient.prefetchQuery({ queryKey: ['user'], queryFn: getUser })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Profile />
    </HydrationBoundary>
  )
}

export default function ReactQueryPage() {
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
        <Suspense
          fallback={
            <div className="rounded-lg border border-zinc-200 p-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              Loading profile…
            </div>
          }
        >
          <ReactQueryData />
        </Suspense>
      </div>
    </>
  )
}
