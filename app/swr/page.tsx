import { Pitfall } from './pitfall'

export default function SwrPage() {
  return (
    <main>
      <h1>SPAs with SWR</h1>
      <p className="muted">
        The segment layout seeds a scoped <code>&lt;SWRConfig&gt;</code> fallback
        from the server. <code>useSWR</code> with the matching key reads it with
        no client fetch. Toggle to a mismatched key to see the silent pitfall.
      </p>
      <Pitfall />
    </main>
  )
}
