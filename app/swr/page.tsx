import { Suspense } from "react";
import Link from "next/link";
import { SWRConfig } from "swr";
import { getCachedUnreadActivity } from "@/lib/activity";
import { activityCache } from "@/lib/activity-cache";
import { getProducts } from "@/lib/products";
import { getCurrentUser } from "@/lib/user";
import { SkeletonPills, SkeletonCard } from "../skeleton";
import { ActivityBadge } from "./activity-badge";
import { ClientQueryExamples } from "./client-query-examples";
import { Profile } from "./profile";
import { userCache } from "./user-cache";

export default function SwrPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Client-side data fetching with SWR
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Fetch only on the client, use Suspense for loading states, or provide
        fallback data from a Server Component.
      </p>

      <h2 className="mt-12 text-lg font-semibold">Client-only queries</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        These searches start after interaction without server-provided data.
        One renders SWR state inline and one uses a local Suspense boundary.
      </p>
      <div className="mt-6">
        <ClientQueryExamples />
      </div>

      <h2 className="mt-12 text-lg font-semibold">Initial data from the server</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The feature boundary provides an <code>SWRConfig</code> fallback.
        Because <code>useSWR</code> reads the same key, the profile can render
        with that value before client revalidation runs.
      </p>
      <div className="mt-6">
        <Suspense fallback={<SkeletonCard />}>
          <ProfileData />
        </Suspense>
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
        The tagged server read provides the SWR fallback. Marking read updates
        the browser cache optimistically, then the route handler invalidates
        the server data for the next visit.
      </p>
      <div className="mt-6">
        <SWRConfig
          value={{
            fallback: {
              [activityCache.swrKey]: getCachedUnreadActivity(),
            },
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

function ProfileData() {
  return (
    <SWRConfig
      value={{
        fallback: {
          [userCache.key]: getCurrentUser(),
        },
      }}
    >
      <Profile />
    </SWRConfig>
  );
}

async function ProductLinks() {
  const products = await getProducts();

  return (
    <div className="flex flex-wrap gap-2">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/swr/${product.id}`}
          className="rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          {product.name}
        </Link>
      ))}
    </div>
  );
}
