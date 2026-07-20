import { getUser } from '@/lib/user'
import { UserProvider } from './user-provider'

export default function UseContextLayout({
  children,
}: LayoutProps<'/use-context'>) {
  const userPromise = getUser()

  return <UserProvider userPromise={userPromise}>{children}</UserProvider>
}
