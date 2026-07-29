import { Suspense } from "react";
import { preload, SWRConfig } from "swr";
import { getUser } from "@/lib/user";
import { USER_KEY } from "../swr/keys";
import { SkeletonCard } from "../skeleton";
import { PreloadedProfile } from "./profile";

export default function SwrPreloadPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">SWR preload cacheData</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Fill <code>cacheData</code> with <code>preload</code>, then mutate the
        same key on the client.
      </p>

      <div className="mt-8">
        <SWRConfig value={{ cacheData: preload(USER_KEY, () => getUser()) }}>
          <Suspense fallback={<SkeletonCard />}>
            <PreloadedProfile />
          </Suspense>
        </SWRConfig>
      </div>
    </>
  );
}
