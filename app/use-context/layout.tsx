import { getUser } from '@/lib/user'
import { UserProvider } from './user-provider'

export default function UseContextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Start the request on the server, but do NOT await it. The Promise is
  // forwarded through context and unwrapped later with use(), so the server can
  // begin streaming immediately instead of blocking here.
  const userPromise = getUser()

  return <UserProvider userPromise={userPromise}>{children}</UserProvider>
}
