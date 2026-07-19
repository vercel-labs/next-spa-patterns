export type User = { id: string; name: string; email: string }

// A stand-in for a real server-side source (database, cookies, headers).
// The delay makes streaming and Suspense fallbacks visible in the demo.
export async function getUser(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return { id: '1', name: 'Ada Lovelace', email: 'ada@example.com' }
}
