import { Suspense } from "react";
import { SWRConfig } from "swr";
import { getProduct } from "@/lib/products";
import { SkeletonCard } from "../../skeleton";
import { productKey } from "../keys";
import { ProductView } from "./product-view";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

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
      <a
        href="/swr"
        className="mt-6 inline-block text-sm text-zinc-500 underline hover:text-foreground dark:text-zinc-400"
      >
        ← Back to SWR
      </a>
    </>
  );
}

function ProductData({ id }: { id: number }) {
  return (
    <SWRConfig
      value={{
        fallback: {
          [productKey(id)]: getProduct(id),
        },
      }}
    >
      <ProductView id={id} />
    </SWRConfig>
  );
}
