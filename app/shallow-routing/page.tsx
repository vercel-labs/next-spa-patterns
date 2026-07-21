import { Suspense } from 'react'
import { getProducts } from '@/lib/products'
import { SkeletonList } from '../skeleton'
import { SortableList } from './sortable-list'

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
        <code>pushState</code> updates <code>?sort=</code> and{' '}
        <code>useSearchParams</code> re-sorts the list, with no server request.
      </p>
      <div className="mt-8">
        <Suspense fallback={<SkeletonList />}>
          <Products />
        </Suspense>
      </div>
    </>
  )
}
