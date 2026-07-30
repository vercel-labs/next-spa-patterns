import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { cookies } from "next/headers";

export type User = { id: string; name: string; email: string };

export const SESSION_COOKIE = "spa-demo-user";

const USERS: User[] = [
  { id: "1", name: "Ada Lovelace", email: "ada@example.com" },
  { id: "2", name: "Alan Turing", email: "alan@example.com" },
];

export async function getUsers(): Promise<User[]> {
  "use cache";
  cacheTag("users");
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return USERS;
}

export async function getCurrentUser(): Promise<User> {
  "use cache: private";
  cacheTag("current-user");
  cacheLife({ stale: 60 });

  const userId = (await cookies()).get(SESSION_COOKIE)?.value;
  const users = await getUsers();
  return users.find((user) => user.id === userId) ?? users[0];
}