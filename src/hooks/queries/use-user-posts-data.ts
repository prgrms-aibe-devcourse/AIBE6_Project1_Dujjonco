import { fetchUserPosts } from '@/supabase/query/post/post'
import { useQuery } from '@tanstack/react-query'

// 특정 유저가 작성한 게시글 목록을 조회하는 훅
// queryKey를 ['posts', 'user', userId]로 분리해 전체 게시글 캐시와 독립적으로 관리
export function useUserPostsData(userId: string) {
    return useQuery({
        queryKey: ['posts', 'user', userId],
        queryFn: () => fetchUserPosts(userId),
    })
}
