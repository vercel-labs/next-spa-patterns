'use client'

import { use } from 'react'
import { useUser } from './user-provider'

export function UserGreeting() {
  const { userPromise } = useUser()
  const user = use(userPromise)

  return (
    <p className="text-zinc-600 dark:text-zinc-400">
      Signed in as <span className="font-medium text-foreground">{user.name}</span>
      .
    </p>
  )
}
