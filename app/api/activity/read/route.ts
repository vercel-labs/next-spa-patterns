import { revalidateTag } from "next/cache";
import { markActivityRead } from "@/lib/activity";

export async function POST() {
  const changed = await markActivityRead();
  if (changed) {
    revalidateTag("activity", { expire: 0 });
  }
  return new Response(null, { status: 204 });
}
