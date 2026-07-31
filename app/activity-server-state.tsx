import { getCachedUnreadActivity } from "@/lib/activity";

export async function ActivityServerState() {
  const { count } = await getCachedUnreadActivity();

  return (
    <div className="mt-4 rounded border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800">
      Server-rendered activity: {count > 0 ? `${count} unread` : "all read"}
    </div>
  );
}
