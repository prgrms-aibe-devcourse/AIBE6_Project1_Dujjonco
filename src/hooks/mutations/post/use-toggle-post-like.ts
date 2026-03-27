import { queryKeys } from '@/hooks/queries/query-keys'
import { togglePostLike } from '@/supabase/query/post'
import type { Post, UseMutationCallback } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function useTogglePostLike(postId: string, callbacks?: UseMutationCallback) {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: togglePostLike,
        onMutate: async ({ postId, userId }) => {
            await queryClient.cancelQueries({ queryKey: queryKeys.posts })
            await queryClient.cancelQueries({ queryKey: queryKeys.post(postId) })

            const previousPosts = queryClient.getQueryData<Post[]>(queryKeys.posts)
            const previousPost = queryClient.getQueryData<Post>(queryKeys.post(postId))

            // 목록 낙관적 업데이트
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

            // 상세 낙관적 업데이트
            queryClient.setQueryData<Post>(queryKeys.post(postId), (old) => {
                if (!old) return old
                const isLiked = old.post_likes.some((like) => like.user_id === userId)
                return {
                    ...old,
                    post_likes: isLiked
                        ? old.post_likes.filter((like) => like.user_id !== userId)
                        : [...old.post_likes, { id: crypto.randomUUID(), user_id: userId }],
                }
            })

            return { previousPosts, previousPost }
        },
        onError: (error, _, context) => {
            if (context?.previousPosts) {
                queryClient.setQueryData(queryKeys.posts, context.previousPosts)
            }
            if (context?.previousPost) {
                queryClient.setQueryData(queryKeys.post(postId), context.previousPost)
            }
            if (callbacks?.onError) callbacks.onError(error)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.posts })
            queryClient.invalidateQueries({ queryKey: queryKeys.post(postId) })
        },
    })
}
