import { Suspense } from 'react'
import { getProducts } from '@/lib/products'
import { SortableList } from './sortable-list'

// Awaits below the Suspense boundary, not at the page top, so the fetch does not
// block the rest of the page from streaming.
async function Products() {
  const products = await getProducts()
  return <SortableList products={products} />
}

export default function ShallowRoutingPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Shallow routing on the client
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The buttons call <code>window.history.pushState</code> to update{' '}
        <code>?sort=</code> without a reload. The list reads it back with{' '}
        <code>useSearchParams</code> and re-sorts on the client. The URL changes,
        but no navigation request fires.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="rounded-lg border border-zinc-200 p-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              Loading…
            </div>
          }
        >
          <Products />
        </Suspense>
      </div>
    </>
  )
}
