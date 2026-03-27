import { supabase } from '../supabase'
// 리뷰 개수 조회
export async function fetchReviewCountByUser(userId: string) {
    const { count, error } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

    if (error) throw error
    return count ?? 0
}
