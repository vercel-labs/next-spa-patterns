'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import type { User } from '@/lib/user'

export function Profile() {
  const { data } = useSuspenseQuery<User>({
    queryKey: ['user'],
    queryFn: () => fetch('/api/user').then((res) => res.json()),
  })

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="font-semibold">{data.name}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {data.email}
      </div>
    </div>
  )
}
