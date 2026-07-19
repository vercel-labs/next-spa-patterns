'use client'

import { use } from 'react'
import { useUser } from './user-provider'

export function Profile() {
  const { userPromise } = useUser()
  // Unwrap the server Promise on the client. This component suspends until it
  // resolves, so the nearest Suspense fallback shows while it streams in.
  const user = use(userPromise)

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="font-semibold">{user.name}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {user.email}
      </div>
    </div>
  )
}
