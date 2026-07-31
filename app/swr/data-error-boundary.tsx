"use client";

import { catchError, type ErrorInfo } from "next/error";

function ErrorFallback(_: object, { retry }: ErrorInfo) {
  return (
    <button
      className="rounded border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
      onClick={() => retry()}
    >
      Try again
    </button>
  );
}

export const DataErrorBoundary = catchError(ErrorFallback);
