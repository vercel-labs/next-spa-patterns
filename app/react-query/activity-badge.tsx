"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UnreadActivity } from "@/lib/activity";

const activityKeys = {
  unread: ["activity", "unread"] as const,
};

const buttonClass =
  "rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900";

// The React Query cache owns this badge read. It polls the API route so the
// count stays live, and a mutation can update it optimistically.
export function ActivityBadge() {
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: activityKeys.unread,
    queryFn: (): Promise<UnreadActivity> =>
      fetch("/api/activity/unread").then((res) => res.json()),
    refetchInterval: 5000,
  });

  const markRead = useMutation({
    mutationFn: () => fetch("/api/activity/read", { method: "POST" }),
    // Update the cache immediately, before the request resolves, so the badge
    // clears right away. The route's `revalidateTag` refreshes the next
    // server render.
    onMutate: () =>
      queryClient.setQueryData(activityKeys.unread, { count: 0 }),
  });

  const reset = useMutation({
    mutationFn: () => fetch("/api/activity/reset", { method: "POST" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: activityKeys.unread }),
  });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <span className="font-semibold">Activity</span>
        {data && data.count > 0 ? (
          <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
            {data.count}
          </span>
        ) : (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            all read
          </span>
        )}
        {isFetching ? (
          <span className="text-xs text-zinc-400">updating…</span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className={buttonClass} onClick={() => markRead.mutate()}>
          Mark read
        </button>
        <button className={buttonClass} onClick={() => reset.mutate()}>
          Reset
        </button>
      </div>
    </div>
  );
}
