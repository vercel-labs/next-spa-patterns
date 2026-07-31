import { revalidateTag } from "next/cache";
import { getUnreadActivity, markActivityRead } from "@/lib/activity";
import { activityCache } from "@/lib/activity-cache";

export async function POST() {
  const changed = await markActivityRead();
  if (changed) {
    revalidateTag(activityCache.tag, { expire: 0 });
  }
  return Response.json(await getUnreadActivity());
}
