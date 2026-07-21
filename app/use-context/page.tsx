import { Suspense } from "react";
import { SkeletonCard } from "../skeleton";
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
            <div
              aria-hidden
              className="h-6 w-56 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900"
            />
          }
        >
          <UserGreeting />
        </Suspense>
        <Suspense fallback={<SkeletonCard rows={2} />}>
          <Profile />
        </Suspense>
      </div>
    </>
  );
}
