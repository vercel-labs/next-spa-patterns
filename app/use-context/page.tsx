import { Suspense } from "react";
import { Profile } from "./profile";
import { UserGreeting } from "./user-greeting";

export default function UseContextPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        use() within a Context Provider
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The layout starts <code>getUser()</code> without awaiting and shares the
        Promise through context. Multiple components read it with{" "}
        <code>use()</code> from a single request, each suspending where the
        value is used.
      </p>
      <div className="mt-8 grid gap-4">
        <Suspense
          fallback={
            <p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
          }
        >
          <UserGreeting />
        </Suspense>
        <Suspense
          fallback={
            <div className="rounded-lg border border-zinc-200 p-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              Loading profile…
            </div>
          }
        >
          <Profile />
        </Suspense>
      </div>
    </>
  );
}
