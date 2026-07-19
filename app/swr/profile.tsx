'use client'

import useSWR from 'swr'
import type { User } from '@/lib/user'

const fetcher = (url: string): Promise<User> =>
  fetch(url).then((res) => res.json())

export function Profile({ swrKey }: { swrKey: string }) {
  // The key must match the fallback key ('/api/user') exactly. When it matches,
  // the seeded value is read from the streamed HTML with no client fetch. When
  // it does not, nothing warns: the seed is ignored and SWR fetches on the
  // client. suspense: true mirrors the front useServerSWR pattern.
  const { data } = useSWR<User>(swrKey, fetcher, { suspense: true })

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="font-semibold">{data?.name}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {data?.email}
      </div>
      <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        key: <code>{swrKey}</code>
      </div>
    </div>
  )
}
