import { supabase } from '@/supabase/supabase'
import { useCallback, useEffect, useState } from 'react'

// 단일 장소 북마크 (상세 페이지용)
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

// 전체 북마크 목록 (홈 페이지용 - DB 쿼리 1번으로 처리)
export function useBookmarks(userId?: string) {
    const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
    const [loadingId, setLoadingId] = useState<string | null>(null)

    useEffect(() => {
        if (!userId) {
            setBookmarks(new Set())
            return
        }
        fetchBookmarks(userId)
    }, [userId])

    async function fetchBookmarks(uid: string) {
        const { data, error } = await supabase.from('bookmarks').select('place_id').eq('user_id', uid)

        if (!error && data) {
            setBookmarks(new Set(data.map((b) => b.place_id).filter((id): id is string => id !== null)))
        }
    }

    const toggleBookmark = useCallback(
        async (placeId: string) => {
            if (!userId) {
                alert('로그인이 필요합니다.')
                return
            }
            if (loadingId) return
            setLoadingId(placeId)

            try {
                if (bookmarks.has(placeId)) {
                    const { error } = await supabase
                        .from('bookmarks')
                        .delete()
                        .eq('user_id', userId)
                        .eq('place_id', placeId)

                    if (error) throw error
                    setBookmarks((prev) => {
                        const next = new Set(prev)
                        next.delete(placeId)
                        return next
                    })
                } else {
                    const { error } = await supabase.from('bookmarks').insert({ user_id: userId, place_id: placeId })

                    if (error) throw error
                    setBookmarks((prev) => new Set([...prev, placeId]))
                }
            } catch (error) {
                console.error('북마크 처리 실패:', error)
                alert('북마크 처리 중 오류가 발생했습니다.')
            } finally {
                setLoadingId(null)
            }
        },
        [userId, loadingId, bookmarks],
    )

    return { bookmarks, loadingId, toggleBookmark }
}
