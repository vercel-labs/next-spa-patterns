'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import type { User } from '@/lib/user'

export function Profile() {
  // Same query key as the server prefetch, so the dehydrated result is read
  // straight from the streamed cache. The queryFn only runs when React Query
  // revalidates on the client.
  const { data } = useSuspenseQuery<User>({
    queryKey: ['user'],
    queryFn: () => fetch('/api/user').then((res) => res.json()),
  })

  return (
    <div className="card">
      <strong>{data.name}</strong>
      <div className="muted">{data.email}</div>
    </div>
  )
}
