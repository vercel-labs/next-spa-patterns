"use client";

import useSWR from "swr";
import type { User } from "@/lib/user";
import { PRELOAD_KEY } from "./keys";

const localUsers: User[] = [
  { id: "1", name: "Ada Lovelace", email: "ada@example.com" },
  { id: "2", name: "Grace Hopper", email: "grace@example.com" },
];

export function PreloadedProfile() {
  const { data, mutate } = useSWR<User>(PRELOAD_KEY, { suspense: true });
  const nextUser = data?.id === "1" ? localUsers[1] : localUsers[0];

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="font-semibold">{data?.name}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {data?.email}
      </div>
      <button
        className="mt-4 rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        onClick={() => mutate(nextUser, { revalidate: false })}
      >
        Mutate cache
      </button>
    </div>
  );
}
