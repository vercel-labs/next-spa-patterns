import { Suspense } from 'react'
import { getProducts } from '@/lib/products'
import { SortableList } from './sortable-list'

export default async function ShallowRoutingPage() {
  // Fetched once on the server. Re-sorting happens on the client via the URL,
  // with no further server requests.
  const products = await getProducts()

  return (
    <main>
      <h1>Shallow routing on the client</h1>
      <p className="muted">
        The buttons call <code>window.history.pushState</code> to update{' '}
        <code>?sort=</code> without a reload. The list reads it back with{' '}
        <code>useSearchParams</code> and re-sorts instantly. Notice the URL
        changes but no navigation request fires.
      </p>
      <Suspense fallback={<div className="card">Loading…</div>}>
        <SortableList products={products} />
      </Suspense>
    </main>
  )
}
