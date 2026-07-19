'use client'

import dynamic from 'next/dynamic'

// ssr: false must be set from a Client Component, so this wrapper exists.
const WindowInfo = dynamic(() => import('./window-info'), {
  ssr: false,
  loading: () => (
    <div className="rounded-lg border border-zinc-200 p-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
      Loading (browser only)…
    </div>
  ),
})

export function BrowserOnly() {
  return <WindowInfo />
}
