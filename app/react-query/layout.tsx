import { Providers } from './providers'

export default function ReactQueryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers>{children}</Providers>
}
