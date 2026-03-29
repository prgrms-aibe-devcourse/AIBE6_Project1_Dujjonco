import { ArrowLeft, Heart, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useBookmark } from '../../hooks/useBookmark'
import { useFacilityDetail } from '../../hooks/useFacilityDetail'
import { useFacilityMeta } from '../../hooks/useFacilityMeta'
import { useReviews } from '../../hooks/useReviews'
import { useAuth } from '../contexts/AuthContext'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { ReviewAverages } from './review/ReviewAverages'
import { ReviewForm } from './review/ReviewForm'
import { ReviewList } from './review/ReviewList'

export function FacilityDetail() {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuth()
    const [sortBy, setSortBy] = useState<'latest' | 'likes'>('latest')
    const [openAssistKey, setOpenAssistKey] = useState<string | null>(null)

    const {
        reviews,
        loading,
        averages,
        addReview,
        uploadImage,
        toggleLikeReview,
        addReply,
        deleteReview,
        deleteReply,
    } = useReviews(id || '', user?.id, sortBy)

    const { facility, loading: facilityLoading } = useFacilityDetail(id)
    const { isBookmarked, bookmarkLoading, toggleBookmark } = useBookmark(id, user?.id)
    const { contentTypeLabel, activeAssistTypes } = useFacilityMeta(facility)

    if (facilityLoading) {
        return <div className="py-12 text-center">로딩중...</div>
    }

    if (!facility) {
        return <div className="py-12 text-center">장소 정보를 찾을 수 없습니다.</div>
    }

    return (
        <div className="space-y-6 pb-20">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-white">
                <ArrowLeft className="size-5" />
                <span>목록으로</span>
            </Link>

            <div className="rounded-2xl bg-white shadow-lg">
                <div className="relative h-96">
                    <ImageWithFallback
                        src={facility.image_url || '/fallback.png'}
                        alt={facility.title}
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <button
                        type="button"
                        onClick={toggleBookmark}
                        disabled={bookmarkLoading}
                        className="absolute top-4 right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-gray-800"
                        aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
                        title={isBookmarked ? '북마크 해제' : '북마크 추가'}
                    >
                        <Heart
                            className={`size-6 transition-colors ${
                                isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-500'
                            }`}
                        />
                    </button>

                    <div className="absolute right-0 bottom-0 left-0 p-8 text-white">
                        <h1 className="mb-2 text-4xl">{facility.title}</h1>
                        <p className="opacity-90">{contentTypeLabel}</p>
                    </div>
                </div>

                <div className="space-y-6 p-8 dark:bg-gray-800">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-3">
                            <MapPin className="size-5 text-blue-600" />
                            <p>
                                {facility.address}
                                {facility.addr2 ? ` ${facility.addr2}` : ''}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone className="size-5 text-orange-600" />
                            <p>{facility.tel?.trim() || '업체로부터 제공받지 못함'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 dark:text-black">
                        {activeAssistTypes.map(([key, label]: [string, string]) => {
                            const isOpen = openAssistKey === key
                            const detail = facility[key as keyof typeof facility]

                            return (
                                <div key={key} className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setOpenAssistKey((prev) => (prev === key ? null : key))}
                                        className={`group w-full cursor-pointer rounded-lg border p-3 text-left transition-all duration-200 active:scale-[0.98] ${
                                            isOpen
                                                ? 'border-blue-300 bg-blue-500 text-white shadow-md dark:text-black'
                                                : 'border-blue-200 bg-blue-50 text-gray-800 hover:-translate-y-0.5 hover:bg-blue-100 hover:shadow-sm dark:text-black'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-medium">{label}</span>

                                            <span
                                                className={`text-xs transition-transform duration-200 ${
                                                    isOpen
                                                        ? 'rotate-180 text-white dark:text-black'
                                                        : 'text-blue-500 dark:text-black'
                                                }`}
                                            >
                                                ▼
                                            </span>
                                        </div>

                                        <div
                                            className={`mt-1 text-xs ${
                                                isOpen
                                                    ? 'text-blue-100 dark:text-black'
                                                    : 'text-gray-500 dark:text-black'
                                            }`}
                                        >
                                            {isOpen ? '접기' : '클릭해서 상세보기'}
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div className="absolute top-full left-6 z-20 mt-3 w-80">
                                            <div className="relative rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm leading-6 break-words text-gray-700 shadow-lg dark:bg-gray-800 dark:text-white">
                                                <div className="absolute -top-2 left-4 h-4 w-4 rotate-45 border-t border-l border-blue-100 bg-white dark:bg-gray-800" />
                                                {detail
                                                    ? String(detail)
                                                          .split('<br/>')
                                                          .map((line, i) => (
                                                              <span key={i}>
                                                                  {line}
                                                                  <br />
                                                              </span>
                                                          ))
                                                    : '상세 정보 없음'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">
                <ReviewAverages {...averages} />

                <ReviewForm user={user} onSubmit={addReview} onUploadImage={uploadImage} />

                <ReviewList
                    reviews={reviews}
                    loading={loading}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    user={user}
                    onDeleteReview={deleteReview}
                    onToggleLike={toggleLikeReview}
                    onAddReply={addReply}
                    onDeleteReply={deleteReply}
                />
            </div>
        </div>
    )
}
