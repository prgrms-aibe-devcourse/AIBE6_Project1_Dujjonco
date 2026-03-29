import { supabase } from '../../supabase'
// 북마크 개수 조회
export async function fetchBookmarksByUser(userId: string) {
    const { count, error } = await supabase
        .from('bookmarks')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

    if (error) throw error
    return count ?? 0
}
// 북마크 목록 조회
export async function fetchBookmarks(userId: string) {
    const { data, error } = await supabase
        .from('bookmarks')
        .select(
            `
            id,
            place_id,
            created_at,
            places(content_id, title, address, image_url)
            `,
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}
