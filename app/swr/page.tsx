import { Suspense } from "react";
import { getProducts } from "@/lib/products";
import { Pitfall } from "./pitfall";

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

      <h2 className="mt-12 text-lg font-semibold">Scoped to a route segment</h2>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Seed the fallback on a dynamic route with the <code>params.then()</code>{" "}
        pattern. Open a product to see it seeded per route:
      </p>
      <Suspense
        fallback={
          <p className="mt-3 text-sm text-zinc-400 dark:text-zinc-600">
            Loading…
          </p>
        }
      >
        <ProductLinks />
      </Suspense>
    </>
  );
}

async function ProductLinks() {
  const products = await getProducts();

  return (
    <div className="mt-3 flex flex-wrap gap-2">
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
