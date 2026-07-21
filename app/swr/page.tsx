import { Suspense } from "react";
import { getProducts } from "@/lib/products";
import { SkeletonCard, SkeletonPills } from "../skeleton";
import { Pitfall } from "./pitfall";
import { Revalidation } from "./revalidation";

export default function SwrPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">SPAs with SWR</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        A scoped <code>&lt;SWRConfig&gt;</code> fallback seeds{" "}
        <code>useSWR</code> from the server. Toggle a mismatched key to see the
        silent pitfall.
      </p>
      <div className="mt-8">
        <Pitfall />
      </div>

      <h2 className="mt-12 text-lg font-semibold">
        <code>isLoading</code> vs. <code>isValidating</code>
      </h2>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Without Suspense mode, the seeded fallback is present on first render,
        so <code>isLoading</code> stays <code>false</code>. A client
        revalidation surfaces as <code>isValidating</code> instead. Revalidate
        and watch the flags:
      </p>
      <div className="mt-6">
        <Suspense fallback={<SkeletonCard />}>
          <Revalidation />
        </Suspense>
      </div>

      <h2 className="mt-12 text-lg font-semibold">Scoped to a route segment</h2>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Seed the fallback on a dynamic route with the <code>params.then()</code>{" "}
        pattern. Open a product to see it seeded per route:
      </p>
      <div className="mt-6">
        <Suspense fallback={<SkeletonPills />}>
          <ProductLinks />
        </Suspense>
      </div>
    </>
  );
}

async function ProductLinks() {
  const products = await getProducts();

  return (
    <div className="flex flex-wrap gap-2">
      {products.map((product) => (
        <a
          key={product.id}
          href={`/swr/${product.id}`}
          className="rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          {product.name}
        </a>
      ))}
    </div>
  );
}
