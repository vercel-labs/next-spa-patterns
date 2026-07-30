import { revalidateTag } from "next/cache";
import { resetActivity } from "@/lib/activity";

export async function POST() {
  await resetActivity();
  revalidateTag("activity", "max");
  return new Response(null, { status: 204 });
}
