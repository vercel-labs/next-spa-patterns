'use client'

import { use } from 'react'
import { useUser } from './user-provider'

export function Profile() {
  const { userPromise } = useUser()
  // Unwrap the server Promise on the client. This component suspends until it
  // resolves, so the nearest <Suspense> fallback shows while it streams in.
  const user = use(userPromise)

  return (
    <div className="card">
      <strong>{user.name}</strong>
      <div className="muted">{user.email}</div>
    </div>
  )
}
