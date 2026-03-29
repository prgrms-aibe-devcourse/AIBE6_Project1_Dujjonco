import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'
import { reviewsService } from '../../services/reviews'

export function ReviewPage() {
    const { user } = useAuth()

    const { data: userReviews = [] } = useQuery({
        queryKey: ['userReviews', user?.id ?? ''],
        queryFn: () => reviewsService.getUserReviews(user!.id),
        enabled: !!user,
    })
    // 리뷰 목록을 보여주는 페이지
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-2xl font-bold dark:text-white">작성한 리뷰</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {userReviews.length === 0 ? (
                    <p className="text-gray-400">작성한 리뷰가 없습니다.</p>
                ) : (
                    userReviews.map((review) => (
                        <Link key={review.id} to={`/facility/${review.place_id}`}>
                            <div className="cursor-pointer overflow-hidden rounded-xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800">
                                <img
                                    src={(review.places as any)?.image_url ?? ''}
                                    alt={(review.places as any)?.title ?? ''}
                                    className="h-48 w-full object-cover"
                                />
                                <p className="font-semibold dark:text-white">{(review.places as any)?.title}</p>
                                <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{review.content}</p>
                                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                                    {review.created_at ? new Date(review.created_at).toLocaleDateString('ko-KR') : ''}
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
