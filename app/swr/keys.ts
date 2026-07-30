export const USER_KEY = "/api/user";
export const PRELOAD_KEY = "/api/user?preload";
export const UNREAD_ACTIVITY_KEY = "/api/activity/unread";

export function productKey(id: number) {
  return `/api/products/${id}`;
}
