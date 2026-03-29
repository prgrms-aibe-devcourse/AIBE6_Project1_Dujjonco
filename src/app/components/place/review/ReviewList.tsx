// 장소에 대한 리뷰 목록을 최신순 또는 좋아요순으로 정렬하여 보여주는 관리 컴포넌트

import { type Review } from '@/app/services/reviews'
import { ReviewItem } from './ReviewItem'

interface ReviewListProps {
    reviews: Review[]
    loading: boolean
    sortBy: 'latest' | 'likes'
    onSortChange: (sort: 'latest' | 'likes') => void
    user: any
    onDeleteReview: (reviewId: string, userId: string) => Promise<any>
    onToggleLike: (reviewId: string, userId: string) => Promise<any>
    onAddReply: (reviewId: string, userId: string, content: string) => Promise<any>
    onDeleteReply: (replyId: string, userId: string) => Promise<any>
}

export function ReviewList({
    reviews,
    loading,
    sortBy,
    onSortChange,
    user,
    onDeleteReview,
    onToggleLike,
    onAddReply,
    onDeleteReply,
}: ReviewListProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-2xl font-bold dark:text-black">리뷰 ({reviews.length})</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => onSortChange('latest')}
                        className={`text-sm font-medium transition-colors ${
                            sortBy === 'latest' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600 dark:text-black'
                        }`}
                    >
                        최신순
                    </button>
                    <span className="text-gray-200">|</span>
                    <button
                        onClick={() => onSortChange('likes')}
                        className={`text-sm font-medium transition-colors ${
                            sortBy === 'likes' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600 dark:text-black'
                        }`}
                    >
                        좋아요순
                    </button>
                </div>
            </div>

            {loading && reviews.length === 0 ? (
                <div className="py-12 text-center text-gray-400 dark:text-black">리뷰를 불러오는 중입니다...</div>
            ) : reviews.length > 0 ? (
                reviews.map((review) => (
                    <ReviewItem
                        key={review.id}
                        review={review}
                        user={user}
                        onDeleteReview={onDeleteReview}
                        onToggleLike={onToggleLike}
                        onAddReply={onAddReply}
                        onDeleteReply={onDeleteReply}
                    />
                ))
            ) : (
                <p className="py-10 text-center text-gray-400 dark:text-black">첫 번째 리뷰를 남겨보세요!</p>
            )}
        </div>
    )
}
