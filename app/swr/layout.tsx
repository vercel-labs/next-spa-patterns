import { SWRConfig } from 'swr'
import { getUser } from '@/lib/user'

export default function SwrLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // <SWRConfig> can live in any Server Component, not only the root layout.
  // Scoping it to the segment that owns the data keeps the fallback close to
  // where it's read. getUser() is NOT awaited: only components that read this
  // key suspend, and the resolved value is serialized into the streamed HTML.
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
