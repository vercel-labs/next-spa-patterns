"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { User } from "@/lib/user";

const UserContext = createContext<Promise<User> | null>(null);

export function useUser() {
  const userPromise = useContext(UserContext);
  if (!userPromise) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return userPromise;
}

export function UserProvider({
  children,
  userPromise,
}: {
  children: ReactNode;
  userPromise: Promise<User>;
}) {
  return (
    <UserContext.Provider value={userPromise}>{children}</UserContext.Provider>
  );
}
