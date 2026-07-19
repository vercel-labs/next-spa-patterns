# Next.js SPA patterns

Runnable demos for the [Single-Page Applications guide](https://nextjs.org/docs/app/guides/single-page-applications). Each route is one section of the guide, so you can read the guide and try the pattern side by side.

The through-line of the first three is **seeding a client data library from a Server Component**: start the request on the server without awaiting it, stream the value into the HTML, and let the client library own revalidation from there.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Open the browser's network tab (and throttle) to watch the seeding and streaming behavior.

## What each route shows

| Route | Guide section | What to look for |
| --- | --- | --- |
| `/use-context` | Using React's `use` within a Context Provider | The layout starts `getUser()` unawaited and passes the Promise through context; `Profile` unwraps it with `use()` and suspends. |
| `/swr` | SPAs with SWR | A scoped `<SWRConfig>` fallback is seeded from the server. The **Matching key** reads it with no client fetch; the **Mismatched key** silently ignores the seed and fetches on the client. |
| `/react-query` | SPAs with React Query | `prefetchQuery` (unawaited) + `dehydrate` into `<HydrationBoundary>`; `useSuspenseQuery` reads it with the same key. Pending queries are dehydrated so they stream. |
| `/browser-only` | Rendering components only in the browser | A component loaded with `next/dynamic` + `ssr: false` that reads `window`. |
| `/shallow-routing` | Shallow routing on the client | `window.history.pushState` updates `?sort=` with no reload; `useSearchParams` re-sorts the list. |
| `/server-actions` | Using Server Actions in Client Components | A Server Action called from a Client Component with `useActionState` for pending/error state. No API route. |

## A note on static export

The guide lists [static export](https://nextjs.org/docs/app/guides/static-exports) (`output: 'export'`) as an option. This demo does **not** enable it, because the server-seeding routes (`/use-context`, `/swr`, `/react-query`, `/server-actions`) rely on server rendering and a Server Action, which static export does not support. The `/browser-only` and `/shallow-routing` patterns are export-compatible on their own.

## Stack

- Next.js (App Router), React 19
- [SWR](https://swr.vercel.app) 2.4+
- [TanStack React Query](https://tanstack.com/query/latest) v5
