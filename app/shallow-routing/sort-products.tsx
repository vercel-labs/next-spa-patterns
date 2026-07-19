'use client'

import { useSearchParams } from 'next/navigation'
import type { SortOrder } from '@/lib/products'

export function SortProducts() {
  const searchParams = useSearchParams()
  const current = searchParams.get('sort')

  function updateSorting(sortOrder: SortOrder) {
    const urlSearchParams = new URLSearchParams(searchParams.toString())
    urlSearchParams.set('sort', sortOrder)
    // Updates the URL and the Next.js Router state without a server round-trip
    // or reload. useSearchParams re-renders with the new value.
    window.history.pushState(null, '', `?${urlSearchParams.toString()}`)
  }

  return (
    <div className="row" role="group" aria-label="Sort products">
      <button
        onClick={() => updateSorting('asc')}
        aria-pressed={current === 'asc'}
      >
        Price ascending
      </button>
      <button
        onClick={() => updateSorting('desc')}
        aria-pressed={current === 'desc'}
      >
        Price descending
      </button>
    </div>
  )
}
