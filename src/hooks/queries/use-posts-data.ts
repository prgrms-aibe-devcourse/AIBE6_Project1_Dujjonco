import { fetchPosts } from '@/supabase/query/post'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './query-keys'

export function usePostsData() {
    return useQuery({
        queryKey: queryKeys.posts,
        queryFn: fetchPosts,
    })
}
