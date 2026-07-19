import { QueryClient, defaultShouldDehydrateQuery } from '@tanstack/react-query'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60 * 1000 },
      dehydrate: {
        // Dehydrate pending queries so unawaited server queries can stream.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: a fresh client for every request, so data never leaks between users.
    return makeQueryClient()
  }
  // Browser: reuse one client across renders and navigations.
  browserQueryClient ??= makeQueryClient()
  return browserQueryClient
}
