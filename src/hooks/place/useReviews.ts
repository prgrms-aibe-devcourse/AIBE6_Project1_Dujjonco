import { useEffect, useState } from 'react'
import { reviewsService, type Review } from '../../app/services/reviews'

// 특정 장소의 리뷰 목록 관리 및 작성 기능을 제공하는 커스텀 훅
export function useReviews(placeId: string, userId?: string, sortBy: 'latest' | 'likes' = 'latest') {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState(true)
    const [averages, setAverages] = useState({ total: 0, entrance: 0, interior: 0, facility: 0, count: 0 })

    useEffect(() => {
        // 장소 ID나 정렬 방식이 변경될 때마다 리뷰를 다시 가져옴
        if (placeId) {
            fetchReviews()
            fetchAverages()
        }
    }, [placeId, userId, sortBy])

    // Supabase에서 리뷰 데이터를 가져옴
    const fetchReviews = async (showLoading = true) => {
        try {
            if (showLoading) setLoading(true)
            const data = await reviewsService.getReviewsByFacility(placeId, userId, sortBy)
            setReviews(data)
        } catch (err) {
            console.error('리뷰 로드 실패:', err)
        } finally {
            if (showLoading) setLoading(false)
        }
    }

    // 장소의 평균 평점을 가져옴
    const fetchAverages = async () => {
        const data = await reviewsService.getAverageRatings(placeId)
        setAverages(data)
    }

    // 새로운 리뷰를 작성하고 목록을 갱신
    const addReview = async (
        currentUserId: string,
        content: string,
        ratings: { entrance: number; interior: number; amenities: number },
        images: string[] = [],
    ) => {
        const result = await reviewsService.createReview(placeId, currentUserId, content, ratings, images)
        if (result.success) {
            await fetchReviews(false)
            await fetchAverages()
        }
        return result
    }

    // 좋아요 토글
    const toggleLikeReview = async (reviewId: string, currentUserId: string) => {
        setReviews((prev) =>
            prev.map((review) => {
                if (review.id === reviewId) {
                    const isLiked = !review.is_liked
                    return {
                        ...review,
                        is_liked: isLiked,
                        likes: isLiked ? (review.likes || 0) + 1 : Math.max(0, (review.likes || 1) - 1),
                    }
                }
                return review
            }),
        )

        const result = await reviewsService.toggleLike(reviewId, currentUserId)

        await fetchReviews(false)

        return result
    }

    // 이미지 업로드를 수행
    const uploadImage = async (file: File) => {
        return await reviewsService.uploadReviewImage(file)
    }

    // 리뷰에 답글을 추가
    const addReply = async (reviewId: string, currentUserId: string, content: string) => {
        const result = await reviewsService.createReply(reviewId, currentUserId, content)
        if (result.success) {
            await fetchReviews()
        }
        return result
    }

    // 리뷰를 삭제
    const deleteReview = async (reviewId: string, currentUserId: string) => {
        const result = await reviewsService.deleteReview(reviewId, currentUserId)
        if (result.success) {
            await fetchReviews(false)
            await fetchAverages()
        }
        return result
    }

    // 답글을 삭제
    const deleteReply = async (replyId: string, currentUserId: string) => {
        const result = await reviewsService.deleteReply(replyId, currentUserId)
        if (result.success) {
            await fetchReviews(false)
        }
        return result
    }

    return {
        reviews,
        loading,
        averages,
        fetchReviews,
        addReview,
        toggleLikeReview,
        uploadImage,
        addReply,
        deleteReview,
        deleteReply,
    }
}
