"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UnreadActivity } from "@/lib/activity";
import {
  markActivityReadAction,
  resetActivityAction,
} from "@/lib/activity-actions";
import { activityCache } from "@/lib/activity-cache";

export function useActivityMutations() {
  const queryClient = useQueryClient();

  const markRead = useMutation({
    mutationFn: markActivityReadAction,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: activityCache.queryKey });
      const previous = queryClient.getQueryData<UnreadActivity>(
        activityCache.queryKey,
      );
      queryClient.setQueryData(activityCache.queryKey, { count: 0 });
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(activityCache.queryKey, context.previous);
      }
    },
  });

  const reset = useMutation({
    mutationFn: resetActivityAction,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: activityCache.queryKey });
      const previous = queryClient.getQueryData<UnreadActivity>(
        activityCache.queryKey,
      );
      queryClient.setQueryData(activityCache.queryKey, { count: 3 });
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(activityCache.queryKey, context.previous);
      }
    },
  });

  return { markRead, reset };
}
