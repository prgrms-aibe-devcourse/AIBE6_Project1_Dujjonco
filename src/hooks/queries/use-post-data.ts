import { useQuery } from '@tanstack/react-query'
import { fetchPost } from 'supabase/api/post'
import { queryKeys } from './query-keys'

export function usePostData(id: string) {
    return useQuery({
        queryKey: queryKeys.post(id),
        queryFn: () => fetchPost(id),
    })
}
