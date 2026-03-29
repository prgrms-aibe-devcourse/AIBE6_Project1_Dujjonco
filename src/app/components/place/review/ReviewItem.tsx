import UserNickname from '@/app/components/user/UserNickname'
import { type Review } from '@/app/services/reviews'
import { Star, Heart, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { ImageWithFallback } from '../../common/ImageWithFallback'

interface ReviewItemProps {
    review: Review
    user: any // Replace with proper User type if available
    onDeleteReview: (reviewId: string, userId: string) => Promise<any>
    onToggleLike: (reviewId: string, userId: string) => Promise<any>
    onAddReply: (reviewId: string, userId: string, content: string) => Promise<any>
    onDeleteReply: (replyId: string, userId: string) => Promise<any>
}

export function ReviewItem({ review, user, onDeleteReview, onToggleLike, onAddReply, onDeleteReply }: ReviewItemProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [replyInput, setReplyInput] = useState('')

    const handleReplySubmit = async () => {
        if (!replyInput.trim() || !user) return
        const result = await onAddReply(review.id, user.id, replyInput)
        if (result.success) {
            setReplyInput('')
            setIsExpanded(true)
        }
    }

    return (
        <div className="space-y-3 border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <UserNickname
                        userId={review.user_id}
                        fallback="사용자"
                        className="font-bold text-gray-800 dark:text-black"
                    />
                    {user?.id === review.user_id && (
                        <button
                            onClick={() => onDeleteReview(review.id, user.id)}
                            className="text-gray-300 transition-colors hover:text-red-500"
                            title="리뷰 삭제"
                        >
                            <Trash2 className="size-3.5" />
                        </button>
                    )}
                </div>
                <span className="text-sm text-gray-400 dark:text-black">
                    {new Date(review.created_at).toLocaleDateString()}
                </span>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500 dark:text-black">
                <div className="flex items-center gap-1">
                    <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-600">진입로</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                className={`size-3 ${
                                    s <= review.rating_entrance ? 'fill-current text-yellow-400' : 'text-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <span className="rounded bg-orange-50 px-2 py-0.5 text-orange-600">내부</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                className={`size-3 ${
                                    s <= review.rating_interior ? 'fill-current text-yellow-400' : 'text-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <span className="rounded bg-green-50 px-2 py-0.5 text-green-600">편의시설</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                className={`size-3 ${
                                    s <= review.rating_facility ? 'fill-current text-yellow-400' : 'text-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <p className="leading-relaxed text-gray-600 dark:text-black">{review.content}</p>

            {review.images && review.images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {review.images.map((url, i) => (
                        <div key={i} className="size-24 overflow-hidden rounded-lg">
                            <ImageWithFallback src={url} alt="review" className="size-full object-cover" />
                        </div>
                    ))}
                </div>
            )}

            <div className="flex flex-col items-start gap-3 pt-2">
                <button
                    onClick={() => user && onToggleLike(review.id, user.id)}
                    disabled={!user}
                    className={`flex transform items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all active:scale-95 ${
                        review.is_liked
                            ? 'border border-red-200 bg-red-50 text-red-600'
                            : 'border border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100 dark:text-black'
                    }`}
                >
                    <Heart className={`size-4 ${review.is_liked ? 'fill-current' : ''}`} />
                    <span>좋아요 {review.likes || 0}</span>
                </button>

                {review.replies && review.replies.length > 0 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="ml-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-black"
                    >
                        {isExpanded ? '답글 접기' : `답글 ${review.replies.length}개 보기`}
                    </button>
                )}
            </div>

            {isExpanded && review.replies && review.replies.length > 0 && (
                <div className="animate-in fade-in slide-in-from-top-2 mt-4 ml-4 space-y-3 border-l-2 border-gray-100 pl-4 duration-200">
                    {review.replies.map((reply) => (
                        <div key={reply.id} className="text-sm">
                            <div className="mb-1 flex items-center gap-2">
                                <UserNickname
                                    userId={reply.user_id}
                                    fallback="익명"
                                    className="font-bold text-gray-700 dark:text-black"
                                />
                                <span className="text-[10px] text-gray-400 dark:text-black">
                                    {new Date(reply.created_at).toLocaleDateString()}
                                </span>
                                {user?.id === reply.user_id && (
                                    <button
                                        onClick={() => onDeleteReply(reply.id, user.id)}
                                        className="text-gray-300 transition-colors hover:text-red-500"
                                        title="답글 삭제"
                                    >
                                        <Trash2 className="size-3" />
                                    </button>
                                )}
                            </div>
                            <p className="text-gray-600 dark:text-black">{reply.content}</p>
                        </div>
                    ))}
                </div>
            )}

            {user && (
                <div className="mt-4 ml-4 border-l-2 border-gray-100 pl-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={replyInput}
                            onChange={(e) => setReplyInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                                    handleReplySubmit()
                                }
                            }}
                            placeholder="답글을 남겨주세요..."
                            className="flex-1 rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm outline-none focus:border-blue-400 focus:bg-white dark:text-black"
                        />
                        <button
                            onClick={handleReplySubmit}
                            className="rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-700"
                        >
                            등록
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
