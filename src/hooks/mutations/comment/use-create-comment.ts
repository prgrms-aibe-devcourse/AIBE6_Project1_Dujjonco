import type { UseMutationCallback } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment } from 'supabase/api/post-comments'

export function useCreateComment(postId: string, callbacks?: UseMutationCallback) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] })
            if (callbacks?.onSuccess) callbacks.onSuccess()
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error)
        },
    })
}
