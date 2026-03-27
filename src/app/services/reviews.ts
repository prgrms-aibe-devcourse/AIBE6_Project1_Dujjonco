import { supabase } from '@/supabase/supabase'

// 리뷰 데이터 인터페이스
export interface Review {
    likes: number
    id: string
    place_id: string
    user_id: string
    content: string
    images: string[]
    rating_entrance: number // UI에서는 rating으로 유지하되 DB 컬럼은 score_entrance
    rating_interior: number
    rating_facility: number
    score_entrance: number // DB 컬럼 대응
    score_interior: number
    score_facility: number
    created_at: string
    user_name?: string
    is_liked?: boolean // 현재 로그인한 사용자가 좋아요를 눌렀는지 여부
    replies?: ReviewReply[]
}

export interface ReviewReply {
    id: string
    review_id: string
    user_id: string
    content: string
    created_at: string
}

/**
 * Supabase 리뷰 관련 데이터 통신 서비스
 */
class ReviewsService {
    /**
     * 특정 장소의 모든 리뷰와 관련 이미지, 좋아요 정보를 가져옵니다.
     * @param placeId 장소 ID
     * @param currentUserId 현재 로그인한 사용자 ID (좋아요 여부 확인용)
     * @param sortBy 정렬 방식 ('latest': 최신순, 'likes': 좋아요순)
     */
    async getReviewsByFacility(
        placeId: string,
        currentUserId?: string,
        sortBy: 'latest' | 'likes' = 'latest',
    ): Promise<Review[]> {
        // 1. 기본적으로 최신순으로 리뷰 본문과 관련 데이터(이미지, 좋아요)를 가져옵니다.
        // review_replies는 관계가 설정되어 있지 않아 따로 가져옵니다.
        const { data, error } = await supabase
            .from('reviews')
            .select(
                `
        *,
        review_images (image_url),
        review_likes (user_id)
      `,
            )
            .eq('place_id', placeId)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching reviews:', error)
            return []
        }

        if (!data || data.length === 0) return []

        // 2. 리뷰 ID 목록을 추출하여 관련 답글을 모두 가져옵니다.
        // [Antigravity]: Supabase에서 reviews와 review_comments 간의 외래 키(FK) 관계가
        // 설정되어 있지 않아, .select() 조인을 사용하는 대신 별도의 쿼리로 가져오도록 수정했습니다.
        const reviewIds = data.map((r: any) => r.id)
        const { data: repliesData, error: repliesError } = await supabase
            .from('review_comments')
            .select('*')
            .in('review_id', reviewIds)
            .order('created_at', { ascending: true })

        if (repliesError) {
            console.error('Error fetching review replies:', repliesError)
        }

        // 3. 리뷰 데이터 매핑 및 답글 병합
        // [Antigravity]: 가져온 답글들을 각 리뷰의 id와 매칭하여 replies 배열에 넣어줍니다.
        const reviews = data.map((item: any) => {
            const reviewReplies = repliesData?.filter((reply: any) => reply.review_id === item.id) || []

            return {
                ...item,
                images: item.review_images?.map((img: any) => img.image_url) || [],
                likes: item.review_likes?.length || 0,
                is_liked: currentUserId
                    ? item.review_likes?.some((like: any) => like.user_id === currentUserId)
                    : false,
                // DB 컬럼 명칭(score_)을 UI 인터페이스(rating_)에 맞게 매핑
                rating_entrance: item.score_entrance,
                rating_interior: item.score_interior,
                rating_facility: item.score_facility,
                replies: reviewReplies,
            }
        }) as Review[]

        // 4. 좋아요순 정렬 요청이 있을 경우, 메모리(배열) 상에서 정렬하여 반환합니다.
        if (sortBy === 'likes') {
            return reviews.sort((a, b) => (b.likes || 0) - (a.likes || 0))
        }

        return reviews
    }

    /**
     * 새로운 리뷰를 생성하고 이미지가 있다면 함께 저장합니다.
     */
    async createReview(
        placeId: string,
        userId: string,
        content: string,
        ratings: { entrance: number; interior: number; amenities: number },
        images: string[] = [],
    ): Promise<{ success: boolean; error?: string }> {
        // 1. 리뷰 본문 및 별점 저장
        const { data: reviewData, error: reviewError } = await supabase
            .from('reviews')
            .insert([
                {
                    place_id: placeId,
                    user_id: userId,
                    content,
                    score_entrance: ratings.entrance,
                    score_interior: ratings.interior,
                    score_facility: ratings.amenities,
                },
            ])
            .select()
            .single()

        if (reviewError) return { success: false, error: reviewError.message }

        // 2. 이미지가 있다면 따로 저장
        if (images.length > 0 && reviewData) {
            const imageData = images.map((url) => ({
                review_id: reviewData.id,
                user_id: userId,
                image_url: url,
            }))

            const { error: imagesError } = await supabase.from('review_images').insert(imageData)

            if (imagesError) {
                console.error('Error saving review images:', imagesError)
                // 리뷰는 저장되었으므로 true를 반환하되 에러 로그를 남길 수도 있고,
                // 전체를 롤백하고 싶다면 여기서 실패 처리를 할 수 있습니다.
            }
        }

        return { success: true }
    }

    /**
     * 좋아요 토글 (이미 눌렀으면 취소, 아니면 추가)
     */
    async toggleLike(reviewId: string, userId: string): Promise<{ success: boolean; error?: string }> {
        // 먼저 좋아요 여부 확인
        const { data: existingLike } = await supabase
            .from('review_likes')
            .select('id')
            .eq('review_id', reviewId)
            .eq('user_id', userId)
            .single()

        if (existingLike) {
            // 좋아요 취소
            const { error } = await supabase.from('review_likes').delete().eq('id', existingLike.id)

            if (error) return { success: false, error: error.message }
        } else {
            // 좋아요 추가
            const { error } = await supabase.from('review_likes').insert([{ review_id: reviewId, user_id: userId }])

            if (error) return { success: false, error: error.message }
        }

        return { success: true }
    }

    /**
     * 장소의 평균 평점을 가져옵니다.
     * [Antigravity]: 파손되었던 메서드 시그니처와 데이터 패칭 로직을 복구했습니다.
     * score_entrance, score_interior, score_facility 컬럼의 평균을 계산합니다.
     */
    async getAverageRatings(placeId: string) {
        const { data, error } = await supabase
            .from('reviews')
            .select('score_entrance, score_interior, score_facility')
            .eq('place_id', placeId)

        if (error || !data || data.length === 0) {
            return { total: 0, entrance: 0, interior: 0, facility: 0, count: 0 }
        }

        const count = data.length
        const entrance = data.reduce((acc, cur) => acc + cur.score_entrance, 0) / count
        const interior = data.reduce((acc, cur) => acc + cur.score_interior, 0) / count
        const facility = data.reduce((acc, cur) => acc + cur.score_facility, 0) / count
        const total = (entrance + interior + facility) / 3

        return { total, entrance, interior, facility, count }
    }

    /**
     * 리뷰용 이미지를 Base64 문자열로 변환합니다. (스토리지 버킷 대신 DB 직접 저장 방식)
     */
    async uploadReviewImage(file: File): Promise<{ url?: string; error?: string }> {
        try {
            return new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    const base64String = reader.result as string
                    resolve({ url: base64String })
                }
                reader.onerror = () => {
                    resolve({ error: '이미지 변환 중 오류가 발생했습니다.' })
                }
                reader.readAsDataURL(file)
            })
        } catch (err) {
            return { error: '이미지 처리에 실패했습니다.' }
        }
    }

    /**
     * 리뷰에 답글을 작성합니다. (review_comments 테이블에 저장)
     */
    async createReply(
        reviewId: string,
        userId: string,
        content: string,
    ): Promise<{ success: boolean; error?: string }> {
        const { error } = await supabase
            .from('review_comments')
            .insert([{ review_id: reviewId, user_id: userId, content }])

        if (error) return { success: false, error: error.message }
        return { success: true }
    }

    /**
     * 리뷰를 삭제합니다. (본인인 경우에만 성공)
     */
    async deleteReview(reviewId: string, userId: string): Promise<{ success: boolean; error?: string }> {
        const { error } = await supabase.from('reviews').delete().eq('id', reviewId).eq('user_id', userId)

        if (error) return { success: false, error: error.message }
        return { success: true }
    }

    /**
     * 답글(댓글)을 삭제합니다. (본인인 경우에만 성공)
     */
    async deleteReply(replyId: string, userId: string): Promise<{ success: boolean; error?: string }> {
        const { error } = await supabase.from('review_comments').delete().eq('id', replyId).eq('user_id', userId)

        if (error) return { success: false, error: error.message }
        return { success: true }
    }
}

export const reviewsService = new ReviewsService()
