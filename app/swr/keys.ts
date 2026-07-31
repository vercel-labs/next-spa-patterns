export const USER_KEY = "/api/user";
export const PRELOAD_KEY = "/api/user?preload";

export function productKey(id: number) {
  return `/api/products/${id}`;
}
