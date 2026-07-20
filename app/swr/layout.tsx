import { SWRConfig } from 'swr'
import { getUser } from '@/lib/user'

export default function SwrLayout({ children }: LayoutProps<'/swr'>) {
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
