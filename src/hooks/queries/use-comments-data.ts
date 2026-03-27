import { useQuery } from '@tanstack/react-query'
import { fetchComments } from 'supabase/api/post-comments'

export function useCommentsData(postId: string) {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    })
}
