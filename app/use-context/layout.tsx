import { getUser } from '@/lib/user'
import { UserProvider } from './user-provider'

export default function UseContextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Start the request without awaiting; it's unwrapped later with use().
  const userPromise = getUser()

  return <UserProvider userPromise={userPromise}>{children}</UserProvider>
}
