import { Suspense } from 'react'
import Link from 'next/link'
import { cacheLife } from 'next/cache'
import { SkeletonCard } from '../../../skeleton'
import { ProductView } from '../../[id]/product-view'

export default function BrowserCacheProductPage({
  params,
}: PageProps<'/swr/browser-cache/[id]'>) {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Browser-only RSC cache with SWR
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        SWR fetches the data in the browser. Next.js reuses the RSC payload for
        client navigations, but not across requests.
      </p>
      <div className="mt-8">
        <Suspense fallback={<SkeletonCard rows={1} />}>
          {params.then(({ id }) => (
            <ProductData id={Number(id)} />
          ))}
        </Suspense>
      </div>
      <Link
        href="/swr"
        className="mt-8 inline-block text-sm underline underline-offset-4"
      >
        ← Back to SWR
      </Link>
    </>
  )
}

async function ProductData({ id }: { id: number }) {
  'use cache'
  cacheLife({ expire: 0 })

  return <ProductView id={id} />
}
