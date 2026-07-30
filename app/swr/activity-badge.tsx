"use client";

import useSWR, { useSWRConfig } from "swr";
import type { UnreadActivity } from "@/lib/activity";
import { UNREAD_ACTIVITY_KEY } from "./keys";

const fetcher = (url: string): Promise<UnreadActivity> =>
  fetch(url).then((res) => res.json());

const buttonClass =
  "rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900";

// The SWR cache owns this badge read. It polls the API route so the count
// stays live, and a mutation can update it optimistically.
export function ActivityBadge() {
  const { mutate } = useSWRConfig();
  const { data, isValidating } = useSWR<UnreadActivity>(
    UNREAD_ACTIVITY_KEY,
    fetcher,
    { refreshInterval: 5000 },
  );

  async function markRead() {
    // Update the SWR cache immediately, without revalidating, so the badge
    // clears before the request resolves.
    mutate(UNREAD_ACTIVITY_KEY, { count: 0 }, { revalidate: false });
    // The route writes to the database and calls `revalidateTag` so the next
    // server render of the activity route is fresh.
    await fetch("/api/activity/read", { method: "POST" });
  }

  async function reset() {
    await fetch("/api/activity/reset", { method: "POST" });
    mutate(UNREAD_ACTIVITY_KEY);
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
        <button className={buttonClass} onClick={markRead}>
          Mark read
        </button>
        <button className={buttonClass} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}
