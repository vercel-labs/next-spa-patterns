import { Suspense } from 'react'
import BrowserWindowInfo from './browser-window-info'
import { BrowserOnly } from './loader'

export default function BrowserOnlyPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Rendering components only in the browser
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        These examples skip prerendering for a component that needs browser
        APIs.
      </p>

      <h2 className="mt-12 text-lg font-semibold">
        Using <code>next/dynamic</code>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Loading the component with <code>ssr: false</code> keeps it out of the
        server render.
      </p>
      <div className="mt-6">
        <BrowserOnly />
      </div>

      <h2 className="mt-12 text-lg font-semibold">
        Using React&apos;s <code>browser()</code>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Calling <code>use(browser())</code> suspends during prerendering, then
        renders with access to browser APIs.
      </p>
      <div className="mt-6">
        <Suspense
          fallback={
            <div className="rounded-lg border border-zinc-200 p-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              Loading (browser only)…
            </div>
          }
        >
          <BrowserWindowInfo />
        </Suspense>
      </div>
    </>
  )
}
