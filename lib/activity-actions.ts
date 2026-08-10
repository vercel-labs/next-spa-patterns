"use server";

import { updateTag } from "next/cache";
import { activityCache } from "./activity-cache";
import { markActivityRead, resetActivity } from "./activity";

export async function markActivityReadAction() {
  const changed = await markActivityRead();
  if (changed) {
    updateTag(activityCache.tag);
  }
}

export async function resetActivityAction() {
  const changed = await resetActivity();
  if (changed) {
    updateTag(activityCache.tag);
  }
}
