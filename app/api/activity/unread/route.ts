import { NextResponse } from "next/server";
import { getUnreadActivity } from "@/lib/activity";

export async function GET() {
  return NextResponse.json(await getUnreadActivity());
}
