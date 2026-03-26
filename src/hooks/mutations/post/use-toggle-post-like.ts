import { togglePostLike } from '@/api/post'
import { queryKeys } from '@/hooks/queries/query-keys'
import type { Post, UseMutationCallback } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useTogglePostLike(callbacks?: UseMutationCallback) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: togglePostLike,
        onMutate: async ({ postId, userId }) => {
            // 진행 중인 쿼리 취소
            await queryClient.cancelQueries({ queryKey: queryKeys.posts })

            // 현재 데이터 백업
            const previousPosts = queryClient.getQueryData<Post[]>(queryKeys.posts)

            // 낙관적 업데이트
            queryClient.setQueryData<Post[]>(queryKeys.posts, (old) => {
                if (!old) return old
                return old.map((post) => {
                    if (post.id !== postId) return post

                    const isLiked = post.post_likes.some((like) => like.user_id === userId)

                    return {
                        ...post,
                        post_likes: isLiked
                            ? post.post_likes.filter((like) => like.user_id !== userId)
                            : [...post.post_likes, { id: crypto.randomUUID(), user_id: userId }],
                    }
                })
            })

            return { previousPosts }
        },
        onError: (error, _, context) => {
            if (context?.previousPosts) {
                queryClient.setQueryData(queryKeys.posts, context.previousPosts)
            }
            if (callbacks?.onError) callbacks.onError(error)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.posts })
        },
    })
}
