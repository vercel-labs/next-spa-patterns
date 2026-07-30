import { revalidateTag } from "next/cache";
import { markActivityRead } from "@/lib/activity";

export async function POST() {
  await markActivityRead();
  // `'max'` keeps this request fast: serve cached data and refresh in the
  // background, rather than blocking for fresh data.
  revalidateTag("activity", "max");
  return new Response(null, { status: 204 });
}
