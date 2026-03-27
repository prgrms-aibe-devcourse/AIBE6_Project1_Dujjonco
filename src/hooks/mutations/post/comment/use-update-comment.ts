import { updateComment } from '@/supabase/query/post-comments'
import type { UseMutationCallback } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useUpdateComment(postId: string, callbacks?: UseMutationCallback) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            if (callbacks?.onSuccess) callbacks.onSuccess()
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error)
        },
    })
}
