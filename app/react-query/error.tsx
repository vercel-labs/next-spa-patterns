"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div
      className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-950 dark:bg-red-950/30"
      role="alert"
    >
      <h2 className="font-semibold">Failed to load TanStack Query data</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Try the request again.
      </p>
      <button
        className="mt-4 rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-white dark:border-zinc-700 dark:hover:bg-zinc-900"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
