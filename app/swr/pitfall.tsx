"use client";

import { Suspense, useState } from "react";
import { SkeletonCard } from "../skeleton";
import { Profile } from "./profile";

const MATCHING_KEY = "/api/user";
const MISMATCHED_KEY = "/api/user?client";

const buttonClass =
  "rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 aria-pressed:border-zinc-900 aria-pressed:font-medium dark:aria-pressed:border-zinc-100";

export function Pitfall() {
  const [key, setKey] = useState(MATCHING_KEY);
  const matching = key === MATCHING_KEY;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="SWR key">
        <button
          className={buttonClass}
          onClick={() => setKey(MATCHING_KEY)}
          aria-pressed={matching}
        >
          Matching key
        </button>
        <button
          className={buttonClass}
          onClick={() => setKey(MISMATCHED_KEY)}
          aria-pressed={!matching}
        >
          Mismatched key
        </button>
      </div>

      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
        {matching
          ? "Reads the seeded fallback with no client fetch."
          : "No fallback exists for this key, so SWR fetches on the client. Nothing warns about the mismatch. Watch the network tab."}
      </p>

      <div className="mt-3">
        <Suspense key={key} fallback={<SkeletonCard />}>
          <Profile swrKey={key} />
        </Suspense>
      </div>
    </div>
  );
}
