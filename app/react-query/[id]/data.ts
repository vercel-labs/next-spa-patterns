import { cacheLife, cacheTag } from "next/cache";
import { getProduct } from "@/lib/products";
import { productCache } from "./product-cache";

export async function getCachedProduct(id: number) {
  "use cache";
  cacheLife("max");
  cacheTag(productCache.tag(id));

  return getProduct(id);
}
