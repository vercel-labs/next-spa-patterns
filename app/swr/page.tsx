import { Suspense } from "react";
import { getProducts } from "@/lib/products";
import { SkeletonPills } from "../skeleton";
import { ActivityBadge } from "./activity-badge";
import { Pitfall } from "./pitfall";

export default function SwrPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">SPAs with SWR</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Seed <code>useSWR</code> from a Server Component.
      </p>

      <h2 className="mt-12 text-lg font-semibold">Matching the seeded key</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The layout seeds a fallback keyed <code>/api/user</code>. A matching key
        renders instantly from that seed. A mismatched key (
        <code>/api/user?client</code>) misses the seed, so SWR fetches on the
        client and you see the skeleton first.
      </p>
      <div className="mt-6">
        <Pitfall />
      </div>

      <h2 className="mt-12 text-lg font-semibold">Route-scoped data</h2>
      <div className="mt-6">
        <Suspense fallback={<SkeletonPills />}>
          <ProductLinks />
        </Suspense>
      </div>

      <h2 className="mt-12 text-lg font-semibold">
        Coordinating the server and client caches
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The SWR cache owns the badge for instant updates. Marking read clears
        it optimistically, then a route handler calls <code>revalidateTag</code>{" "}
        so the next server render is fresh.
      </p>
      <div className="mt-6">
        <ActivityBadge />
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
