import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import {
  defaultShouldDehydrateQuery,
  QueryClient,
  type DehydratedState,
  type QueryKey,
} from "@tanstack/react-query";

type HydratedQuery = {
  queryKey: QueryKey;
  data: unknown;
};

type HydrationOptions = {
  tags: string[];
};

// Keep the timestamp stable until a matching data tag is invalidated.
async function getHydrationUpdatedAt(tags: string[]) {
  "use cache";
  cacheTag(...tags);
  cacheLife("max");
  return Date.now();
}

// A dehydrate() that caches only the timestamp, not the data. The caller passes
// seeded data and every write that changes those reads invalidates these tags.
export async function dehydrate(
  queries: HydratedQuery[],
  options: HydrationOptions,
): Promise<DehydratedState> {
  const updatedAt = await getHydrationUpdatedAt(options.tags);

  const queryClient = new QueryClient();

  for (const query of queries) {
    queryClient.setQueryData(query.queryKey, query.data, { updatedAt });
  }

  return {
    mutations: [],
    queries: queryClient
      .getQueryCache()
      .getAll()
      .filter((query) => defaultShouldDehydrateQuery(query))
      .map((query) => ({
        dehydratedAt: updatedAt,
        queryHash: query.queryHash,
        queryKey: query.queryKey,
        state: query.state,
        ...(query.meta ? { meta: query.meta } : {}),
      })),
  };
}
