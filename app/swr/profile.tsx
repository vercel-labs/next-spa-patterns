'use client'

import useSWR from 'swr'
import type { User } from '@/lib/user'

const fetcher = (url: string): Promise<User> =>
  fetch(url).then((res) => res.json())

export function Profile({ swrKey }: { swrKey: string }) {
  // The key must match the `fallback` key ('/api/user') exactly. When it does,
  // the seeded value is read from the streamed HTML with no client fetch. When
  // it doesn't, nothing warns: the seeded value is ignored and SWR fetches on
  // the client (watch the network tab).
  const { data } = useSWR<User>(swrKey, fetcher, { suspense: true })

  return (
    <div className="card">
      <strong>{data?.name}</strong>
      <div className="muted">{data?.email}</div>
      <div className="muted" style={{ marginTop: '0.5rem' }}>
        key: <code>{swrKey}</code>
      </div>
    </div>
  )
}
