import { getUser } from '@/lib/user'
import { UserProvider } from './user-provider'

export default function UseContextLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userPromise = getUser()

  return <UserProvider userPromise={userPromise}>{children}</UserProvider>
}
