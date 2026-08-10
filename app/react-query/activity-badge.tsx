"use client";

import { useQuery } from "@tanstack/react-query";
import type { UnreadActivity } from "@/lib/activity";
import { activityCache } from "@/lib/activity-cache";
import { useActivityMutations } from "./hooks/use-activity-mutations";

const buttonClass =
  "rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900";

async function getActivity(): Promise<UnreadActivity> {
  const response = await fetch("/api/activity/unread");
  if (!response.ok) throw new Error("Failed to fetch activity");
  return response.json();
}

// The React Query cache owns this badge read and mutations update it
// optimistically.
export function ActivityBadge() {
  const { data, isFetching } = useQuery({
    queryKey: activityCache.queryKey,
    queryFn: getActivity,
  });

  const { markRead, reset } = useActivityMutations();

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
