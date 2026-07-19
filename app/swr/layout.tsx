import { SWRConfig } from 'swr'
import { getUser } from '@/lib/user'

export default function SwrLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Scoped to the segment that owns the data. getUser() is not awaited, so only
  // components that read this key suspend.
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
