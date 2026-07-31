import { revalidateTag } from "next/cache";
import { getUnreadActivity, markActivityRead } from "@/lib/activity";

export async function POST() {
  const changed = await markActivityRead();
  if (changed) {
    revalidateTag("activity", { expire: 0 });
  }
  return Response.json(await getUnreadActivity());
}
