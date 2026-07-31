import { revalidateTag } from "next/cache";
import { getUnreadActivity, resetActivity } from "@/lib/activity";

export async function POST() {
  const changed = await resetActivity();
  if (changed) {
    revalidateTag("activity", { expire: 0 });
  }
  return Response.json(await getUnreadActivity());
}
