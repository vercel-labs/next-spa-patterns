import { revalidateTag } from "next/cache";
import { resetActivity } from "@/lib/activity";

export async function POST() {
  const changed = await resetActivity();
  if (changed) {
    revalidateTag("activity", { expire: 0 });
  }
  return new Response(null, { status: 204 });
}
