import { cache } from "react";
import { cacheTag } from "next/cache";

export type User = { id: string; name: string; email: string };

export const getUser = cache(async (): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { id: "1", name: "Ada Lovelace", email: "ada@example.com" };
});

export async function getCachedUser(): Promise<User & { cachedAt: string }> {
  "use cache";
  cacheTag("user");

  const user = await getUser();
  return { ...user, cachedAt: new Date().toISOString() };
}
