import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from 'supabase/api/post'
import { queryKeys } from './query-keys'

export function usePostsData() {
    return useQuery({
        queryKey: queryKeys.posts,
        queryFn: fetchPosts,
    })
}
