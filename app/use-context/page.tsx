import { Suspense } from 'react'
import { Profile } from './profile'

export default function UseContextPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        use() within a Context Provider
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The layout starts <code>getUser()</code> without awaiting and forwards
        the Promise through context. <code>Profile</code> unwraps it with{' '}
        <code>use()</code> and suspends until it resolves.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="rounded-lg border border-zinc-200 p-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              Loading profile…
            </div>
          }
        >
          <Profile />
        </Suspense>
      </div>
    </>
  )
}
