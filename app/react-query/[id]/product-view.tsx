"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { productCache } from "./product-cache";

export function ProductView({ id }: { id: number }) {
  const { data } = useSuspenseQuery(productCache.options(id));

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="font-semibold">{data?.name}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        ${data?.price}
      </div>
    </div>
  );
}
