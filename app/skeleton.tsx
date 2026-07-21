// Loading placeholders sized to match the resolved content, so streaming in
// the real data doesn't shift the layout.

export function SkeletonCard({ rows = 3 }: { rows?: number }) {
  return (
    <div
      aria-hidden
      className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800"
    >
      <div className="h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      {Array.from({ length: Math.max(rows - 1, 0) }).map((_, i) => (
        <div
          key={i}
          className={`mt-2 h-4 ${
            i === 0 ? "w-48" : "w-24"
          } animate-pulse rounded bg-zinc-100 dark:bg-zinc-900`}
        />
      ))}
    </div>
  );
}

export function SkeletonPills() {
  return (
    <div aria-hidden className="flex flex-wrap gap-2">
      {["w-16", "w-24", "w-20", "w-20"].map((w) => (
        <div
          key={w}
          className={`h-8 ${w} animate-pulse rounded bg-zinc-100 dark:bg-zinc-900`}
        />
      ))}
    </div>
  );
}

export function SkeletonList({ rows = 4 }: { rows?: number }) {
  return (
    <div aria-hidden>
      <div className="h-8 w-40 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
      <div className="mt-4 grid gap-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-[50px] animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900"
          />
        ))}
      </div>
    </div>
  );
}
