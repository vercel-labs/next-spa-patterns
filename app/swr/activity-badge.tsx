"use client";

import useSWR from "swr";
import type { UnreadActivity } from "@/lib/activity";
import { activityCache } from "@/lib/activity-cache";

const fetcher = (url: string): Promise<UnreadActivity> =>
  fetch(url).then((res) => res.json());

const buttonClass =
  "rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900";

// The SWR cache owns this badge read and mutations update it optimistically.
export function ActivityBadge() {
  const { data, isValidating, mutate } = useSWR<UnreadActivity>(
    activityCache.swrKey,
    fetcher,
    { suspense: true },
  );

  function updateActivity(url: string, optimisticData: UnreadActivity) {
    return mutate(
      async () => {
        const response = await fetch(url, { method: "POST" });
        if (!response.ok) {
          throw new Error("Failed to update activity");
        }
        return response.json();
      },
      {
        optimisticData,
        revalidate: false,
        rollbackOnError: true,
        throwOnError: false,
      },
    );
  }

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
        {isValidating ? (
          <span className="text-xs text-zinc-400">updating…</span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className={buttonClass}
          onClick={() => updateActivity("/api/activity/read", { count: 0 })}
        >
          Mark read
        </button>
        <button
          className={buttonClass}
          onClick={() => updateActivity("/api/activity/reset", { count: 3 })}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
