import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { updateTag } from "next/cache";
import { getCachedUnreadActivity } from "@/lib/activity";
import { activityCache } from "@/lib/activity-cache";
import { getCurrentUser } from "@/lib/user";
import { dehydrate } from "@/lib/react-query-hydration";
import { SkeletonCard } from "../skeleton";
import { ActivityBadge } from "./activity-badge";
import { Profile } from "./profile";

async function refreshUser() {
  "use server";
  updateTag("current-user");
}

async function ReactQueryData() {
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
        SPAs with React Query
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Seed React Query from a Server Component, cache the server read, then
        coordinate the server and client caches on mutation.
      </p>

      <h2 className="mt-12 text-lg font-semibold">Seeding from the server</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The server read and its hydration timestamp share a tag, while React
        Query independently owns browser freshness and refetching.
      </p>
      <div className="mt-8">
        <Suspense fallback={<SkeletonCard rows={2} />}>
          <ReactQueryData />
        </Suspense>
      </div>

      <h2 className="mt-12 text-lg font-semibold">
        Coordinating the server and client caches
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The tagged server read seeds the React Query cache. The mutation updates
        the badge optimistically, then commits the value returned by the write.
        The route handler also invalidates the server seed for the next visit.
      </p>
      <div className="mt-6">
        <Suspense fallback={<SkeletonCard rows={1} />}>
          <ActivityData />
        </Suspense>
      </div>
    </>
  );
}
