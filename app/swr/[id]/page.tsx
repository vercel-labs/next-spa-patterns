import { Suspense } from "react";
import Link from "next/link";
import { SWRConfig } from "swr";
import { SkeletonCard } from "../../skeleton";
import { getCachedProduct } from "./data";
import { productCache } from "./product-cache";
import { ProductView } from "./product-view";

export default function ScopedSwrPage({ params }: PageProps<"/swr/[id]">) {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Scoped SWR seeding</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Seed the product fallback for this route segment.
      </p>
      <div className="mt-8">
        <Suspense fallback={<SkeletonCard />}>
          {params.then(({ id }) => (
            <ProductData id={Number(id)} />
          ))}
        </Suspense>
      </div>
      <Link
        href="/swr"
        className="mt-6 inline-block text-sm text-zinc-500 underline hover:text-foreground dark:text-zinc-400"
      >
        ← Back to SWR
      </Link>
    </>
  );
}

function ProductData({ id }: { id: number }) {
  return (
    <SWRConfig
      value={{
        fallback: {
          [productCache.key(id)]: getCachedProduct(id),
        },
      }}
    >
      <ProductView id={id} />
    </SWRConfig>
  );
}
