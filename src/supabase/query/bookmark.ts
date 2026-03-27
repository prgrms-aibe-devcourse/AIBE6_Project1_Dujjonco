import { supabase } from '../supabase'
// 북마크 개수 조회
export async function fetchBookmarksByUser(userId: string) {
    const { count, error } = await supabase
        .from('bookmarks')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

    if (error) throw error
    return count ?? 0
}
