import { useState, useEffect } from 'react'
import { reviewsService, type Review } from '../app/services/reviews'

/**
 * 특정 장소의 리뷰 목록 관리 및 작성 기능을 제공하는 커스텀 훅
 * @param placeId 장소 ID
 * @param userId 현재 로그인한 사용자 ID
 * @param sortBy 정렬 방식 (최신순 또는 좋아요순)
 */
export function useReviews(placeId: string, userId?: string, sortBy: 'latest' | 'likes' = 'latest') {
  const [reviews, setReviews] = useState<Review[]>([]) // 리뷰 목록 상태
  const [loading, setLoading] = useState(true)       // 로딩 상태
  const [averages, setAverages] = useState({ total: 0, entrance: 0, interior: 0, facility: 0, count: 0 })

  useEffect(() => {
    // 장소 ID나 정렬 방식이 변경될 때마다 리뷰를 다시 가져옵니다.
    if (placeId) {
        fetchReviews()
        fetchAverages()
    }
  }, [placeId, userId, sortBy])

  /**
   * Supabase에서 리뷰 데이터를 가져옵니다.
   * [Antigravity]: showLoading 파라미터를 추가하여, 배경 동기화 시에는 
   * 전체 화면이 깜빡이지 않도록(loading 상태가 되지 않도록) 개선했습니다.
   */
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

  /**
   * 장소의 평균 평점을 가져옵니다.
   */
  const fetchAverages = async () => {
    const data = await reviewsService.getAverageRatings(placeId)
    setAverages(data)
  }

  /**
   * 새로운 리뷰를 작성하고 목록을 갱신합니다.
   */
  const addReview = async (
    currentUserId: string, 
    content: string, 
    ratings: { entrance: number; interior: number; amenities: number },
    images: string[] = []
  ) => {
    const result = await reviewsService.createReview(placeId, currentUserId, content, ratings, images)
    if (result.success) {
      await fetchReviews(false) // 작성 성공 시 목록 새로고침 (로딩 표시 없이)
      await fetchAverages()
    }
    return result
  }

  /**
   * 좋아요 토글
   */
  const toggleLikeReview = async (reviewId: string, currentUserId: string) => {
    // [Antigravity]: 낙관적 업데이트(Optimistic Update) 구현
    // 서버 응답을 기다리지 않고 로컬 상태를 즉시 변경하여 사용자 경험을 부드럽게 합니다.
    setReviews(prev => prev.map(review => {
      if (review.id === reviewId) {
        const isLiked = !review.is_liked
        return {
          ...review,
          is_liked: isLiked,
          likes: isLiked ? (review.likes || 0) + 1 : Math.max(0, (review.likes || 1) - 1)
        }
      }
      return review
    }))

    const result = await reviewsService.toggleLike(reviewId, currentUserId)
    
    // [Antigravity]: 성공/실패 여부와 관계없이 서버와 데이터를 동기화하되, 
    // showLoading을 false로 설정하여 깜빡임을 방지합니다.
    await fetchReviews(false)
    
    return result
  }

  /**
   * 이미지 업로드를 수행합니다.
   */
  const uploadImage = async (file: File) => {
    return await reviewsService.uploadReviewImage(file)
  }

  /**
   * 리뷰에 답글을 추가합니다.
   */
  const addReply = async (reviewId: string, currentUserId: string, content: string) => {
    const result = await reviewsService.createReply(reviewId, currentUserId, content)
    if (result.success) {
      await fetchReviews() // 답글 작성 성공 시 목록 새로고침
    }
    return result
  }

  /**
   * 리뷰를 삭제합니다.
   */
  const deleteReview = async (reviewId: string, currentUserId: string) => {
    const result = await reviewsService.deleteReview(reviewId, currentUserId)
    if (result.success) {
      await fetchReviews(false)
      await fetchAverages()
    }
    return result
  }

  /**
   * 답글을 삭제합니다.
   */
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
    deleteReply
  }
}
