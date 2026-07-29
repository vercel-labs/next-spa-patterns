import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'
import { cacheTag, updateTag } from 'next/cache'
import { getCachedUser } from '@/lib/user'
import { SkeletonCard } from '../skeleton'
import { Profile } from './profile'

async function getUserState() {
  'use cache'
  cacheTag('user')

  const queryClient = new QueryClient()
  const user = await getCachedUser()
  queryClient.setQueryData(['user'], user)

  return dehydrate(queryClient)
}

async function refreshUser() {
  'use server'
  updateTag('user')
}

async function ReactQueryData() {
  const state = await getUserState()

  return (
    <HydrationBoundary state={state}>
      <Profile refreshUser={refreshUser} />
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
        Cache the <code>dehydrate</code> payload, then <code>updateTag</code> to
        refill it. The <code>cached at</code> stamp changes on update.
      </p>
      <div className="mt-8">
        <Suspense fallback={<SkeletonCard rows={2} />}>
          <ReactQueryData />
        </Suspense>
      </div>
    </>
  )
}
