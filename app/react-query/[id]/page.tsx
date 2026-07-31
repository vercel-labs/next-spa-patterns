import { Suspense } from "react";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@/lib/react-query-hydration";
import { SkeletonCard } from "../../skeleton";
import { getCachedProduct } from "./data";
import { productCache } from "./product-cache";
import { ProductView } from "./product-view";

export default function ProductPage({
  params,
}: PageProps<"/react-query/[id]">) {
  return (
    <Suspense fallback={<SkeletonCard rows={1} />}>
      {params.then(({ id }) => (
        <ProductData id={Number(id)} />
      ))}
    </Suspense>
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
