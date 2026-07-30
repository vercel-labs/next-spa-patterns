// Demo-only in-memory read state. A real app would read per-user rows from a
// database here instead of a module-level flag.
let hasRead = false;

export type UnreadActivity = { count: number };

// Live badge read. The client cache (SWR / React Query) owns this for instant
// updates, so it is NOT cached on the server — each request sees current state.
export async function getUnreadActivity(): Promise<UnreadActivity> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { count: hasRead ? 0 : 3 };
}

export async function markActivityRead(): Promise<void> {
  hasRead = true;
}

export async function resetActivity(): Promise<void> {
  hasRead = false;
}
