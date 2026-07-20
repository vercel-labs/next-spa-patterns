import { Providers } from './providers'

export default function ReactQueryLayout({
  children,
}: LayoutProps<'/react-query'>) {
  return <Providers>{children}</Providers>
}
