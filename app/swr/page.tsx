import { Suspense } from "react";
import { preload, SWRConfig } from "swr";
import { getCachedUnreadActivity } from "@/lib/activity";
import { activityCache } from "@/lib/activity-cache";
import { getProducts } from "@/lib/products";
import { getCurrentUser } from "@/lib/user";
import { SkeletonPills, SkeletonCard } from "../skeleton";
import { userCache } from "./user-cache";
import { ActivityBadge } from "./activity-badge";
import { Profile } from "./profile";
import { PreloadedProfile } from "./preloaded-profile";

export default function SwrPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Client-side data fetching with SWR
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Seed <code>useSWR</code> from a Server Component, cache the server read,
        then coordinate the server and client caches on mutation.
      </p>

      <h2 className="mt-12 text-lg font-semibold">Seeding from the server</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The layout seeds an <code>SWRConfig</code> fallback keyed{" "}
        <code>/api/user</code>. Because <code>useSWR</code> reads the same key,
        the profile can render from the server value before client revalidation
        runs.
      </p>
      <div className="mt-6">
        <Suspense fallback={<SkeletonCard />}>
          <Profile />
        </Suspense>
      </div>

      <h2 className="mt-12 text-lg font-semibold">Seeding with preload</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        A <code>fallback</code> only sets the first render value. To seed a real
        cache entry you can mutate, use <code>preload</code> with{" "}
        <code>cacheData</code> (SWR 2.5 beta). Mutating updates that entry
        directly.
      </p>
      <div className="mt-6">
        <SWRConfig
          value={{
            cacheData: preload(userCache.preloadKey, () => getCurrentUser()),
          }}
        >
          <Suspense fallback={<SkeletonCard />}>
            <PreloadedProfile />
          </Suspense>
        </SWRConfig>
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
        The tagged server read seeds the SWR cache. Marking read clears the
        badge optimistically, then the route handler invalidates that server
        seed for the next visit.
      </p>
      <div className="mt-6">
        <SWRConfig
          value={{
            cacheData: preload(activityCache.swrKey, () =>
              getCachedUnreadActivity(),
            ),
          }}
        >
          <Suspense fallback={<SkeletonCard rows={1} />}>
            <ActivityBadge />
          </Suspense>
        </SWRConfig>
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
