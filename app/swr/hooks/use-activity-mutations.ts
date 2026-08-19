'use client'

import { useSWRConfig } from 'swr'
import {
  markActivityReadAction,
  resetActivityAction,
} from '@/lib/activity-actions'
import { activityCache } from '@/lib/activity-cache'

export function useActivityMutations() {
  const { mutate } = useSWRConfig()

  function markRead() {
    return mutate(
      activityCache.swrKey,
      async () => {
        await markActivityReadAction()
        return { count: 0 }
      },
      {
        optimisticData: { count: 0 },
        revalidate: false,
        rollbackOnError: true,
        throwOnError: false,
      },
    )
  }

  function reset() {
    return mutate(
      activityCache.swrKey,
      async () => {
        await resetActivityAction()
        return { count: 3 }
      },
      {
        optimisticData: { count: 3 },
        revalidate: false,
        rollbackOnError: true,
        throwOnError: false,
      },
    )
  }

  return { markRead, reset }
}
