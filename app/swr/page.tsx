import { Pitfall } from './pitfall'

export default function SwrPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">SPAs with SWR</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        A scoped <code>&lt;SWRConfig&gt;</code> fallback seeds{' '}
        <code>useSWR</code> from the server. Toggle a mismatched key to see the
        silent pitfall.
      </p>
      <div className="mt-8">
        <Pitfall />
      </div>
    </>
  )
}
