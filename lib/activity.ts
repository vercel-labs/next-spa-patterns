import "server-only";

import { cacheLife, cacheTag } from "next/cache";

// Demo-only in-memory read state shared by the compiled route entries. A real
// app would read per-user rows from a database instead.
const activityState = globalThis as typeof globalThis & {
  spaDemoActivityRead?: boolean;
};
activityState.spaDemoActivityRead ??= false;

export type UnreadActivity = { count: number };

// Live badge read. The client cache (SWR / React Query) owns this for instant
// updates, so it is NOT cached on the server — each request sees current state.
export async function getUnreadActivity(): Promise<UnreadActivity> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { count: activityState.spaDemoActivityRead ? 0 : 3 };
}

export async function getCachedUnreadActivity(): Promise<UnreadActivity> {
  "use cache";
  cacheTag("activity");
  cacheLife("max");
  return getUnreadActivity();
}

export async function markActivityRead(): Promise<boolean> {
  if (activityState.spaDemoActivityRead) return false;
  activityState.spaDemoActivityRead = true;
  return true;
}

export async function resetActivity(): Promise<boolean> {
  if (!activityState.spaDemoActivityRead) return false;
  activityState.spaDemoActivityRead = false;
  return true;
}
