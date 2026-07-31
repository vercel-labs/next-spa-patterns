import { queryOptions } from "@tanstack/react-query";
import type { Product } from "@/lib/products";

export const productCache = {
  key: (id: number) => ["product", id] as const,
  tag: (id: number) => `product:${id}`,
  options: (id: number) =>
    queryOptions({
      queryKey: productCache.key(id),
      queryFn: async (): Promise<Product | undefined> => {
        const res = await fetch(`/api/products/${id}`);
        return res.json();
      },
    }),
};
