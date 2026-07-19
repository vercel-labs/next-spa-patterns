# Next.js SPA patterns

Runnable demos for the [Single-Page Applications guide](https://nextjs.org/docs/app/guides/single-page-applications). Each route maps to one section of the guide, so you can read the guide and try the pattern side by side.

The through-line of the data-fetching examples is **seeding a client data library from a Server Component**: start the request on the server without awaiting it, stream the value into the HTML, and let the client library own revalidation from there.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Open the browser's network tab (and throttle) to watch the seeding and streaming behavior.

## What each route shows

| Route              | Guide section                                 | What to look for                                                                                                                                                               |
| ------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/use-context`     | Using React's `use` within a Context Provider | The layout starts `getUser()` unawaited and passes the Promise through context; `Profile` unwraps it with `use()` and suspends.                                                |
| `/swr`             | SPAs with SWR                                 | A scoped `<SWRConfig>` fallback is seeded from the server. The **Matching key** reads it with no client fetch; the **Mismatched key** silently ignores the seed and refetches. |
| `/swr/[id]`        | SPAs with SWR (scoped to a route segment)     | `params.then()` resolves the `id` inside `<Suspense>` and seeds the fallback for just that product, so the page shell stays static.                                            |
| `/react-query`     | SPAs with TanStack Query                      | `prefetchQuery` (unawaited) + `dehydrate` into `<HydrationBoundary>`; `useSuspenseQuery` reads it with the same key. Pending queries are dehydrated so they stream.            |
| `/browser-only`    | Rendering components only in the browser      | A component loaded with `next/dynamic` + `ssr: false` that reads `window`.                                                                                                     |
| `/shallow-routing` | Shallow routing on the client                 | `window.history.pushState` updates `?sort=` with no reload; `useSearchParams` re-sorts the list.                                                                               |
| `/mutations`       | Mutating data with Server Actions             | A to-do list where a Server Action runs as an async reducer via `useActionState`, and `useOptimistic` (sharing one reducer with the server) applies each change instantly.     |

## Configuration

The app enables [Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents) and Partial Prefetching, so the server-seeding routes prerender a static shell and stream their dynamic data behind `<Suspense>`. Throttle the network tab to see the loading states.

## A note on static export

The guide lists [static export](https://nextjs.org/docs/app/guides/static-exports) (`output: 'export'`) as an option. This demo does **not** enable it, because the server-seeding routes (`/use-context`, `/swr`, `/react-query`) and the Server Action in `/mutations` rely on server rendering, which static export does not support. The `/browser-only` and `/shallow-routing` patterns are export-compatible on their own.

## Stack

- Next.js (App Router), React 19
- [SWR](https://swr.vercel.app) 2.4+
- [TanStack Query](https://tanstack.com/query/latest) v5
