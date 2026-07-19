import { BrowserOnly } from './loader'

export default function BrowserOnlyPage() {
  return (
    <main>
      <h1>Rendering components only in the browser</h1>
      <p className="muted">
        The card below is loaded with <code>next/dynamic</code> and{' '}
        <code>ssr: false</code>, so it is skipped during prerender and only runs
        in the browser — useful for code that touches <code>window</code> or{' '}
        <code>document</code>.
      </p>
      <BrowserOnly />
    </main>
  )
}
