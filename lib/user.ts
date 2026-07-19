export type User = { id: string; name: string; email: string }

export async function getUser(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return { id: '1', name: 'Ada Lovelace', email: 'ada@example.com' }
}
