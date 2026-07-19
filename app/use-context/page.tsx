import { Suspense } from 'react'
import { Profile } from './profile'

export default function UseContextPage() {
  return (
    <main>
      <h1>use() within a Context Provider</h1>
      <p className="muted">
        The layout starts <code>getUser()</code> without awaiting and forwards
        the Promise through context. <code>Profile</code> unwraps it with{' '}
        <code>use()</code> and suspends until it resolves.
      </p>
      <Suspense fallback={<div className="card">Loading profile…</div>}>
        <Profile />
      </Suspense>
    </main>
  )
}
