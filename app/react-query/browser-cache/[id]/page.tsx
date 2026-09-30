import { Suspense } from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Link from 'next/link'
import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/products'
import { SkeletonCard } from '../../../skeleton'
import { productCache } from '../../[id]/product-cache'
import { ProductView } from '../../[id]/product-view'

export default function BrowserCacheProductPage({
  params,
}: PageProps<'/react-query/browser-cache/[id]'>) {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Browser-only RSC cache with TanStack Query
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The RSC payload can be reused in this browser, but not across requests.
      </p>
      <div className="mt-8">
        <Suspense fallback={<SkeletonCard rows={1} />}>
          {params.then(({ id }) => (
            <ProductData id={Number(id)} />
          ))}
        </Suspense>
      </div>
      <Link
        href="/react-query"
        className="mt-8 inline-block text-sm underline underline-offset-4"
      >
        ← Back to TanStack Query
      </Link>
    </>
  )
}

async function ProductData({ id }: { id: number }) {
  'use cache'
  cacheLife({ expire: 0 })

  const product = await getProduct(id)
  if (!product) notFound()

  const queryClient = new QueryClient()
  queryClient.setQueryData(productCache.key(id), product)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductView id={id} />
    </HydrationBoundary>
  )
}
