import { updatePost } from '@/api/post'
import { queryKeys } from '@/hooks/queries/query-keys'
import type { UseMutationCallback } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdatePost(callbacks?: UseMutationCallback) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.posts })
            if (callbacks?.onSuccess) callbacks.onSuccess()
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error)
        },
    })
}
