'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useTransition } from 'react'
import type { User } from '@/lib/user'

export function Profile({
  refreshUser,
}: {
  refreshUser: () => Promise<void>
}) {
  const { data } = useSuspenseQuery<User & { cachedAt: string }>({
    queryKey: ['user'],
    queryFn: () => fetch('/api/user').then((res) => res.json()),
  })
  const [isPending, startTransition] = useTransition()

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="font-semibold">{data.name}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {data.email}
      </div>
      <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        cached at: <code>{data.cachedAt}</code>
      </div>
      <button
        className="mt-4 rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
        disabled={isPending}
        onClick={() => startTransition(() => refreshUser())}
      >
        {isPending ? 'Updating…' : 'Update cache'}
      </button>
    </div>
  )
}
