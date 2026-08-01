import { HydrationBoundary } from "@tanstack/react-query";
import Link from "next/link";
import { Suspense } from "react";
import { updateTag } from "next/cache";
import { getCachedUnreadActivity } from "@/lib/activity";
import { activityCache } from "@/lib/activity-cache";
import { getProducts } from "@/lib/products";
import { getCurrentUser } from "@/lib/user";
import { dehydrate } from "@/lib/react-query-hydration";
import { SkeletonCard, SkeletonPills } from "../skeleton";
import { ActivityBadge } from "./activity-badge";
import { ClientQueryExamples } from "./client-query-examples";
import { Profile } from "./profile";

async function refreshUser() {
  "use server";
  updateTag("current-user");
}

async function ProfileData() {
  const user = await getCurrentUser();
  const state = await dehydrate([{ queryKey: ["user"], data: user }], {
    tags: ["current-user"],
  });

  return (
    <HydrationBoundary state={state}>
      <Profile refreshUser={refreshUser} />
    </HydrationBoundary>
  );
}

async function ActivityData() {
  const activity = await getCachedUnreadActivity();
  const state = await dehydrate(
    [{ queryKey: activityCache.queryKey, data: activity }],
    { tags: [activityCache.tag] },
  );

  return (
    <HydrationBoundary state={state}>
      <ActivityBadge />
    </HydrationBoundary>
  );
}

export default function ReactQueryPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Client-side data fetching with TanStack Query
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Fetch only on the client, use Suspense for loading states, or provide
        initial query data from a Server Component.
      </p>

      <h2 className="mt-12 text-lg font-semibold">Client-only queries</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        These searches start after interaction without server-provided data.
        One renders query state inline and one uses a local Suspense boundary.
      </p>
      <div className="mt-6">
        <ClientQueryExamples />
      </div>

      <h2 className="mt-12 text-lg font-semibold">Initial data from the server</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The server read and its hydration timestamp share a tag, while React
        Query independently owns browser freshness and refetching.
      </p>
      <div className="mt-8">
        <Suspense fallback={<SkeletonCard rows={2} />}>
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
        The tagged server read provides the initial query data. The mutation
        updates the badge optimistically, then commits the value returned by
        the write. The route handler also invalidates the server data for the
        next visit.
      </p>
      <div className="mt-6">
        <Suspense fallback={<SkeletonCard rows={1} />}>
          <ActivityData />
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
        <Link
          key={product.id}
          href={`/react-query/${product.id}`}
          className="rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          {product.name}
        </Link>
      ))}
    </div>
  );
}
