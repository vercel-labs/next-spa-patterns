import { SWRConfig } from 'swr'
import { getUser } from '@/lib/user'

export default function SwrLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/user': getUser(),
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}
