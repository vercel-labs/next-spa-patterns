'use client'

import dynamic from 'next/dynamic'

// ssr: false disables prerendering for this component, so it only loads in the
// browser. It must be set from a Client Component, which is why this wrapper
// exists rather than calling dynamic() in the server page.
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
