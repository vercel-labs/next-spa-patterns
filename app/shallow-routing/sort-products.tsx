'use client'

import { useSearchParams } from 'next/navigation'
import type { SortOrder } from '@/lib/products'

const buttonClass =
  'rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 aria-pressed:border-zinc-900 aria-pressed:font-medium dark:aria-pressed:border-zinc-100'

export function SortProducts() {
  const searchParams = useSearchParams()
  const current = searchParams.get('sort')

  function updateSorting(sortOrder: SortOrder) {
    const urlSearchParams = new URLSearchParams(searchParams.toString())
    urlSearchParams.set('sort', sortOrder)
    window.history.pushState(null, '', `?${urlSearchParams.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Sort products">
      <button
        className={buttonClass}
        onClick={() => updateSorting('asc')}
        aria-pressed={current === 'asc'}
      >
        Price ascending
      </button>
      <button
        className={buttonClass}
        onClick={() => updateSorting('desc')}
        aria-pressed={current === 'desc'}
      >
        Price descending
      </button>
    </div>
  )
}
