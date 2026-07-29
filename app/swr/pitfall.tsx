"use client";

import { Suspense, useState } from "react";
import { SkeletonCard } from "../skeleton";
import { USER_KEY, MISMATCHED_USER_KEY } from "./keys";
import { Profile } from "./profile";

const buttonClass =
  "rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 aria-pressed:border-zinc-900 aria-pressed:font-medium dark:aria-pressed:border-zinc-100";

export function Pitfall() {
  const [key, setKey] = useState(USER_KEY);
  const matching = key === USER_KEY;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="SWR key">
        <button
          className={buttonClass}
          onClick={() => setKey(USER_KEY)}
          aria-pressed={matching}
        >
          Matching key
        </button>
        <button
          className={buttonClass}
          onClick={() => setKey(MISMATCHED_USER_KEY)}
          aria-pressed={!matching}
        >
          Mismatched key
        </button>
      </div>

      <div className="mt-3">
        <Suspense key={key} fallback={<SkeletonCard />}>
          <Profile swrKey={key} />
        </Suspense>
      </div>
    </div>
  );
}
