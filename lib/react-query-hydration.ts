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

// Cache only the timestamp. This is the one non-deterministic value that would
// otherwise make dehydrate() read the current time during prerendering.
async function getHydrationUpdatedAt(tags: string[]) {
  "use cache";
  cacheTag(...tags);
  cacheLife("seconds");
  return Date.now();
}

// A dehydrate() that caches only the timestamp, not the data. The caller passes
// fresh data and the tags that invalidate those reads.
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
