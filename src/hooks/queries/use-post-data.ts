import { fetchPost } from '@/supabase/query/post/post'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from './query-keys'

export function usePostData(id: string) {
    return useQuery({
        queryKey: queryKeys.post(id),
        queryFn: () => fetchPost(id),
    })
}
