# Next.js SPA patterns

Runnable demos for the [Single-Page Applications guide](https://nextjs.org/docs/app/guides/single-page-applications). Each route maps to one section of the guide, so you can read the guide and try the pattern side by side.

The data-fetching examples provide initial data from a Server Component, then let the client library manage browser revalidation.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Throttle the browser's network tab to watch the initial data stream into the page.

## What each route shows

| Route               | Guide section                                        | What to look for                                                                                                                                                           |
| ------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/use-context`      | Using React's `use` within a Context Provider        | The layout starts `getUser()` unawaited and passes the Promise through context; `Profile` unwraps it with `use()` and suspends.                                            |
| `/swr`              | SPAs with SWR                                        | Provides `fallback` data and coordinates an optimistic mutation with a tagged server read.                                                                                 |
| `/swr/[id]`         | SPAs with SWR (scoped to a route segment)            | `params.then()` resolves the `id` inside `<Suspense>` and provides fallback data for that product.                                                                         |
| `/react-query`      | SPAs with TanStack Query                             | Provides initial query data with a tag-coordinated hydration timestamp; optimistic mutations update the same client identity.                                              |
| `/react-query/[id]` | SPAs with TanStack Query (scoped to a route segment) | The product cache contract owns its query key, server tag, and query options; a tagged server read provides the initial query data.                                        |
| `/browser-only`     | Rendering components only in the browser             | A component loaded with `next/dynamic` + `ssr: false` that reads `window`.                                                                                                 |
| `/shallow-routing`  | Shallow routing on the client                        | `window.history.pushState` updates `?sort=` with no reload; `useSearchParams` re-sorts the list.                                                                           |
| `/mutations`        | Mutating data with Server Actions                    | A to-do list where a Server Action runs as an async reducer via `useActionState`, and `useOptimistic` (sharing one reducer with the server) applies each change instantly. |

## Configuration

The app enables [Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents) and Partial Prefetching. Routes with server-provided data prerender a static shell and stream dynamic data behind `<Suspense>`.

## A note on static export

The guide lists [static export](https://nextjs.org/docs/app/guides/static-exports) (`output: 'export'`) as an option. This demo does **not** enable it because `/use-context`, `/swr`, and `/react-query` rely on server rendering. The Server Action in `/mutations` also requires a server. The `/browser-only` and `/shallow-routing` patterns are export-compatible on their own.

## Stack

- Next.js (App Router), React 19
- [SWR](https://swr.vercel.app) v2
- [TanStack Query](https://tanstack.com/query/latest) v5
