"use client";

import useSWR from "swr";
import type { Product } from "@/lib/products";

const fetcher = (url: string): Promise<Product> =>
  fetch(url).then((res) => res.json());

export function ProductView({ id }: { id: number }) {
  const { data } = useSWR<Product>(`/api/products/${id}`, fetcher, {
    suspense: true,
  });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="font-semibold">{data?.name}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        ${data?.price}
      </div>
      <div className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        key: <code>/api/products/{id}</code>
      </div>
    </div>
  );
}
