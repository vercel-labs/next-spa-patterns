"use client";

import useSWR from "swr";
import type { User } from "@/lib/user";
import { USER_KEY } from "./keys";

const fetcher = (url: string): Promise<User> =>
  fetch(url).then((res) => res.json());

export function Profile() {
  const { data } = useSWR<User>(USER_KEY, fetcher, { suspense: true });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="font-semibold">{data?.name}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        {data?.email}
      </div>
    </div>
  );
}
