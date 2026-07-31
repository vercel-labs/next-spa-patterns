import { revalidateTag } from "next/cache";
import { getUnreadActivity, resetActivity } from "@/lib/activity";
import { activityCache } from "@/lib/activity-cache";

export async function POST() {
  const changed = await resetActivity();
  if (changed) {
    revalidateTag(activityCache.tag, { expire: 0 });
  }
  return Response.json(await getUnreadActivity());
}
