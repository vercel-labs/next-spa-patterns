export const USER_KEY = "/api/user";
export const MISMATCHED_USER_KEY = "/api/user?client";

export function productKey(id: number) {
  return `/api/products/${id}`;
}
