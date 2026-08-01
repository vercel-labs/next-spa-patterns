import { Suspense } from "react";
import { HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
import { dehydrate } from "@/lib/react-query-hydration";
import { SkeletonCard } from "../../skeleton";
import { getCachedProduct } from "./data";
import { productCache } from "./product-cache";
import { ProductView } from "./product-view";

export default function ProductPage({
  params,
}: PageProps<"/react-query/[id]">) {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Route-scoped TanStack Query data
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Seed the product query for this route segment.
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
        className="mt-6 inline-block text-sm text-zinc-500 underline hover:text-foreground dark:text-zinc-400"
      >
        ← Back to TanStack Query
      </Link>
    </>
  );
}

async function ProductData({ id }: { id: number }) {
  const product = await getCachedProduct(id);
  const state = await dehydrate(
    [{ queryKey: productCache.key(id), data: product }],
    { tags: [productCache.tag(id)] },
  );

  return (
    <HydrationBoundary state={state}>
      <ProductView id={id} />
    </HydrationBoundary>
  );
}
