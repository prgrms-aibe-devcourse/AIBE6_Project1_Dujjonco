import { fetchComments } from '@/supabase/query/post-comments'
import { useQuery } from '@tanstack/react-query'

export function useCommentsData(postId: string) {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    })
}
