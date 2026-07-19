'use client'

import { Suspense, useState } from 'react'
import { Profile } from './profile'

const MATCHING_KEY = '/api/user'
const MISMATCHED_KEY = '/api/user?client'

export function Pitfall() {
  const [key, setKey] = useState(MATCHING_KEY)
  const matching = key === MATCHING_KEY

  return (
    <div>
      <div className="row" role="group" aria-label="SWR key">
        <button
          onClick={() => setKey(MATCHING_KEY)}
          aria-pressed={matching}
        >
          Matching key
        </button>
        <button
          onClick={() => setKey(MISMATCHED_KEY)}
          aria-pressed={!matching}
        >
          Mismatched key
        </button>
      </div>

      <p className="muted">
        {matching
          ? 'Reads the seeded fallback instantly — no client fetch.'
          : 'No fallback for this key, so SWR fetches on the client (watch the network tab). Nothing warns about the mismatch.'}
      </p>

      <Suspense
        key={key}
        fallback={<div className="card">Fetching on the client…</div>}
      >
        <Profile swrKey={key} />
      </Suspense>
    </div>
  )
}
