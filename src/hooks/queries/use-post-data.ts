import { fetchPost } from '@/api/post'
import { useQuery } from '@tanstack/react-query'

export function usePostData(id: string) {
    return useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id),
    })
}
