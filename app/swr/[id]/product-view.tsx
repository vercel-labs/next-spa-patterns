"use client";

import useSWR from "swr";
import type { Product } from "@/lib/products";
import { productCache } from "./product-cache";

async function fetcher(url: string): Promise<Product> {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

export function ProductView({ id }: { id: number }) {
  const { data } = useSWR(productCache.key(id), fetcher, {
    suspense: true,
  });

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="font-semibold">{data.name}</div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        ${data.price}
      </div>
    </div>
  );
}
