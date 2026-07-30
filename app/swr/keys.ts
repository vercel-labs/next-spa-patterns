export const USER_KEY = "/api/user";
export const MISMATCHED_USER_KEY = "/api/user?client";
export const UNREAD_ACTIVITY_KEY = "/api/activity/unread";

export function productKey(id: number) {
  return `/api/products/${id}`;
}
