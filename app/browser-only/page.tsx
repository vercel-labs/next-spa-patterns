import { BrowserOnly } from './loader'

export default function BrowserOnlyPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Rendering components only in the browser
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Loaded with <code>next/dynamic</code> and <code>ssr: false</code>, so it
        runs only in the browser.
      </p>
      <div className="mt-8">
        <BrowserOnly />
      </div>
    </>
  )
}
