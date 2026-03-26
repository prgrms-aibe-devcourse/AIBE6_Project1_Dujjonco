import { deletePost } from '@/api/post'
import type { UseMutationCallback } from '@/types'
import { useMutation } from '@tanstack/react-query'

export function useDeletePost(callbacks?: UseMutationCallback) {
    return useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            if (callbacks?.onSuccess) callbacks.onSuccess()
        },
        onError: (error) => {
            if (callbacks?.onError) callbacks.onError(error)
        },
    })
}
