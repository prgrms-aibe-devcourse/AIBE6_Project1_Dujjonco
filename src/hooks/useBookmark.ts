import { supabase } from '@/supabase/supabase'
import { useCallback, useEffect, useState } from 'react'

export function useBookmark(placeId?: string, userId?: string) {
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [bookmarkLoading, setBookmarkLoading] = useState(false)

    const fetchBookmark = useCallback(async () => {
        if (!placeId || !userId) {
            setIsBookmarked(false)
            return
        }

        const { data, error } = await supabase
            .from('bookmarks')
            .select('id')
            .eq('user_id', userId)
            .eq('place_id', placeId)
            .maybeSingle()

        if (error) {
            console.error('북마크 조회 실패:', error)
            return
        }

        setIsBookmarked(!!data)
    }, [placeId, userId])

    useEffect(() => {
        fetchBookmark()
    }, [fetchBookmark])

    const toggleBookmark = useCallback(async () => {
        if (!userId) {
            alert('로그인이 필요합니다.')
            return
        }

        if (!placeId || bookmarkLoading) return

        setBookmarkLoading(true)

        try {
            if (isBookmarked) {
                const { error } = await supabase
                    .from('bookmarks')
                    .delete()
                    .eq('user_id', userId)
                    .eq('place_id', placeId)

                if (error) throw error
                setIsBookmarked(false)
            } else {
                const { error } = await supabase.from('bookmarks').insert({
                    user_id: userId,
                    place_id: placeId,
                })

                if (error) throw error
                setIsBookmarked(true)
            }
        } catch (error) {
            console.error('북마크 처리 실패:', error)
            alert('북마크 처리 중 오류가 발생했습니다.')
        } finally {
            setBookmarkLoading(false)
        }
    }, [placeId, userId, bookmarkLoading, isBookmarked])

    return {
        isBookmarked,
        bookmarkLoading,
        toggleBookmark,
        refetchBookmark: fetchBookmark,
    }
}
