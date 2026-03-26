import { fetchPosts } from '@/api/post'
import { useQuery } from '@tanstack/react-query'

export function usePostsData() {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPosts(),
    })
}
