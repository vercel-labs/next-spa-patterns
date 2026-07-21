"use client";

import useSWR from "swr";
import type { User } from "@/lib/user";

const fetcher = (url: string): Promise<User> =>
  fetch(url).then((res) => res.json());

const buttonClass =
  "rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900";

export function Revalidation() {
  // No `suspense: true`. The seeded fallback is present on first render, so
  // `isLoading` stays false. Revalidating on the client flips `isValidating`.
  const { data, isLoading, isValidating, mutate } = useSWR<User>(
    "/api/user",
    fetcher,
  );

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="font-semibold">{data?.name}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {data?.email}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          className={buttonClass}
          onClick={() => mutate()}
          disabled={isValidating}
        >
          Revalidate
        </button>
        <dl className="flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <dt>isLoading</dt>
            <dd>
              <code>{String(isLoading)}</code>
            </dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt>isValidating</dt>
            <dd>
              <code>{String(isValidating)}</code>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
