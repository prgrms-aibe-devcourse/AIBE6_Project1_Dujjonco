import { Accessibility, ArrowLeft, Camera, Heart, MapPin, Phone, Send, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import { AssistType, ContentType } from '../../../constants/api-codes'
import { useReviews } from '../../hooks/useReviews'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Facility {
    content_id: string
    content_type: string
    title: string
    address: string
    addr2?: string | null
    tel?: string | null
    lat?: number | null
    lng?: number | null
    image_url?: string | null
    image_url2?: string | null

    parking?: string | null
    publictransport?: string | null
    route?: string | null
    ticketoffice?: string | null
    promotion?: string | null
    wheelchair?: string | null
    exit?: string | null
    elevator?: string | null
    restroom?: string | null
    auditorium?: string | null
    room?: string | null
    handicapetc?: string | null
    braileblock?: string | null
    helpdog?: string | null
    guidehuman?: string | null
    audioguide?: string | null
    bigprint?: string | null
    brailepromotion?: string | null
    guidesystem?: string | null
    blindhandicapetc?: string | null
    signguide?: string | null
    videoguide?: string | null
    hearingroom?: string | null
    hearinghandicapetc?: string | null
    stroller?: string | null
    lactationroom?: string | null
    babysparechair?: string | null
    infantsfamilyetc?: string | null
}

export function FacilityDetail() {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuth()
    const [sortBy, setSortBy] = useState<'latest' | 'likes'>('latest')
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

    // UI 상태 관리
    const [facility, setFacility] = useState<Facility | null>(null)
    const [newReview, setNewReview] = useState('')
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>([])

    // 별점 상태
    const [ratings, setRatings] = useState({
        entrance: 5,
        interior: 5,
        amenities: 5,
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [replyInputs, setReplyInputs] = useState<{ [key: string]: string }>({})

    // 북마크 상태
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [bookmarkLoading, setBookmarkLoading] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (id) {
            fetchFacility(id)
        }
    }, [id])

    useEffect(() => {
        if (!id || !user) {
            setIsBookmarked(false)
            return
        }

        fetchBookmark(id, user.id)
    }, [id, user])

    //장소 정보를 가져옵니다.
    const fetchFacility = async (placeId: string) => {
        const { data, error } = await supabase.from('places').select('*').eq('content_id', placeId).single()

        if (error) {
            console.error(error)
            return
        }

        setFacility(data as Facility)
    }

    // 북마크 정보를 가져옵니다.
    const fetchBookmark = async (placeId: string, userId: string) => {
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
    }

    // 북마크를 추가/삭제합니다.
    const toggleBookmark = async () => {
        if (!user) {
            alert('로그인이 필요합니다.')
            return
        }

        if (!id || bookmarkLoading) return

        setBookmarkLoading(true)

        try {
            if (isBookmarked) {
                const { error } = await supabase.from('bookmarks').delete().eq('user_id', user.id).eq('place_id', id)

                if (error) throw error

                setIsBookmarked(false)
            } else {
                const { error } = await supabase.from('bookmarks').insert({
                    user_id: user.id,
                    place_id: id,
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
    }

    //이미지 선택 시 미리보기를 생성하고 상태에 저장합니다.
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setSelectedImages((prev) => [...prev, ...files])

            const newPreviews = files.map((file) => URL.createObjectURL(file))
            setImagePreviews((prev) => [...prev, ...newPreviews])
        }
    }

    //선택된 이미지를 목록에서 삭제합니다.
    const removeImage = (index: number) => {
        setSelectedImages((prev) => prev.filter((_, i) => i !== index))
        setImagePreviews((prev) => prev.filter((_, i) => i !== index))
    }

    //리뷰를 제출합니다. (이미지 업로드 -> 데이터베이스 저장)
    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) {
            setError('로그인이 필요합니다.')
            return
        }
        if (!newReview.trim()) {
            setError('리뷰 내용을 입력해주세요.')
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            // 1. 이미지가 선택되었다면 스토리지에 먼저 업로드합니다.
            const uploadedUrls: string[] = []
            for (const file of selectedImages) {
                const { url, error: uploadError } = await uploadImage(file)
                if (uploadError) throw new Error(uploadError)
                if (url) uploadedUrls.push(url)
            }

            // 2. 작성된 내용과 이미지 URL을 포함하여 리뷰를 생성합니다.
            const result = await addReview(user.id, newReview, ratings, uploadedUrls)
            if (!result.success) {
                throw new Error(result.error)
            }

            // 3. 성공 시 폼을 초기화합니다.
            setNewReview('')
            setSelectedImages([])
            setImagePreviews([])
            setRatings({ entrance: 5, interior: 5, amenities: 5 })
        } catch (err: any) {
            setError(err.message || '리뷰 작성 중 오류가 발생했습니다.')
        } finally {
            setIsSubmitting(false)
        }
    }

    //  답글 제출 핸들러
    const handleSubmitReply = async (reviewId: string) => {
        const content = replyInputs[reviewId]
        if (!content?.trim() || !user) return

        const result = await addReply(reviewId, user.id, content)
        if (result.success) {
            setReplyInputs((prev) => ({ ...prev, [reviewId]: '' }))
        }
    }

    // 리뷰 삭제 핸들러
    const handleDeleteReview = async (reviewId: string) => {
        if (!user || !window.confirm('리뷰를 삭제하시겠습니까?')) return
        await deleteReview(reviewId, user.id)
    }

    // 답글 삭제 핸들러
    const handleDeleteReply = async (replyId: string) => {
        if (!user || !window.confirm('답글을 삭제하시겠습니까?')) return
        await deleteReply(replyId, user.id)
    }

    // 별점 선택 컴포넌트
    const StarRatingInput = ({
        label,
        value,
        onChange,
    }: {
        label: string
        value: number
        onChange: (val: number) => void
    }) => {
        const [hover, setHover] = useState(0)

        return (
            <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">{label}</span>
                <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => onChange(star)}
                            onMouseEnter={() => setHover(star)}
                            className={`transform transition-all hover:scale-110 ${
                                (hover || value) >= star ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                        >
                            <Accessibility className={`size-6 ${(hover || value) >= star ? 'fill-current' : ''}`} />
                        </button>
                    ))}
                </div>
            </div>
        )
    }

    if (!facility) {
        return <div className="py-12 text-center">로딩중...</div>
    }

    // content_type 숫자코드 -> 한글
    const contentTypeLabelMap: Record<string, string> = {
        [ContentType.TOURISM]: '관광지',
        [ContentType.LODGING]: '숙박',
        [ContentType.RESTAURANT]: '음식점',
    }

    const contentTypeLabel = contentTypeLabelMap[facility.content_type] ?? facility.content_type

    // AssistType 기준으로 값 있는 편의시설만 추출
    const activeAssistTypes = Object.entries(AssistType).filter(([key]) => {
        const value = facility[key as keyof Facility]
        return value !== null && value !== undefined && value !== ''
    })

    return (
        <div className="space-y-6 pb-20">
            {/* 뒤로가기 */}
            <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="size-5" />
                <span>목록으로</span>
            </Link>

            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                {/* 이미지 */}
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
                        className="absolute top-4 right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
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

                {/* 내용 */}
                <div className="space-y-6 p-8">
                    {/* 기본 정보 */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-3">
                            <MapPin className="size-5 text-blue-600" />
                            <p>
                                {facility.address}
                                {facility.addr2 ? ` ${facility.addr2}` : ''}
                            </p>
                        </div>

                        {facility.tel && (
                            <div className="flex items-center gap-3">
                                <Phone className="size-5 text-orange-600" />
                                <p>{facility.tel}</p>
                            </div>
                        )}
                    </div>

                    {/* 접근성 */}
                    <div>
                        <h2 className="mb-3 flex items-center gap-2 text-2xl">
                            <Accessibility className="size-6 text-blue-500" />
                            편의시설
                        </h2>

                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                            {activeAssistTypes.map(([key, label]) => (
                                <div key={key} className="rounded-lg bg-blue-50 p-3">
                                    {label}
                                </div>
                            ))}
                        </div>

                        {activeAssistTypes.length === 0 && <p className="text-gray-400">등록된 편의시설 정보 없음</p>}
                    </div>
                </div>
            </div>

            {/* 리뷰 섹션 */}
            <div className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">
                <h2 className="flex items-center gap-2 text-2xl font-bold">리뷰 ({reviews.length})</h2>

                {/* 평균 평점 요약 섹션 */}
                {averages.count > 0 && (
                    <div className="grid grid-cols-1 gap-4 rounded-2xl bg-blue-50/50 p-6 md:grid-cols-4">
                        <div className="flex flex-col items-center justify-center border-b border-blue-100 pb-4 md:border-r md:border-b-0 md:pb-0">
                            <span className="text-sm font-medium text-blue-600">전체 평점</span>
                            <span className="text-4xl font-bold text-gray-800">{averages.total.toFixed(1)}</span>
                            <div className="mt-1 flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Accessibility
                                        key={s}
                                        className={`size-4 ${s <= Math.round(averages.total) ? 'fill-current text-yellow-400' : 'text-gray-200'}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
                            <span className="mb-1 text-xs text-gray-500">진입로</span>
                            <span className="text-xl font-bold text-gray-700">{averages.entrance.toFixed(1)}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
                            <span className="mb-1 text-xs text-gray-500">내부 시설</span>
                            <span className="text-xl font-bold text-gray-700">{averages.interior.toFixed(1)}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
                            <span className="mb-1 text-xs text-gray-500">편의시설</span>
                            <span className="text-xl font-bold text-gray-700">{averages.facility.toFixed(1)}</span>
                        </div>
                    </div>
                )}

                {/* 리뷰 작성 폼 */}
                {user ? (
                    <form onSubmit={handleSubmitReview} className="space-y-4 rounded-xl bg-gray-50 p-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">리뷰 남기기</label>
                            <textarea
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                                        e.preventDefault()
                                        handleSubmitReview(e)
                                    }
                                }}
                                placeholder="이 장소에 대한 경험을 공유해주세요."
                                className="min-h-[100px] w-full resize-none rounded-lg border border-gray-200 p-4 transition-all outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* 별점 선택 영역 */}
                        <div className="grid grid-cols-1 gap-6 rounded-lg border border-gray-200 bg-white p-4 md:grid-cols-3">
                            <StarRatingInput
                                label="진입로"
                                value={ratings.entrance}
                                onChange={(val) => setRatings((prev) => ({ ...prev, entrance: val }))}
                            />
                            <StarRatingInput
                                label="내부 시설"
                                value={ratings.interior}
                                onChange={(val) => setRatings((prev) => ({ ...prev, interior: val }))}
                            />
                            <StarRatingInput
                                label="편의시설"
                                value={ratings.amenities}
                                onChange={(val) => setRatings((prev) => ({ ...prev, amenities: val }))}
                            />
                        </div>

                        {/* 이미지 프리뷰 */}
                        {imagePreviews.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {imagePreviews.map((url, index) => (
                                    <div key={index} className="group relative size-20 overflow-hidden rounded-lg">
                                        <img src={url} alt="preview" className="size-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Trash2 className="size-5 text-white" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-100"
                                >
                                    <Camera className="size-4" />
                                    사진 첨부
                                </button>
                                <span className="text-xs text-gray-500">{selectedImages.length}개 선택됨</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    '작성 중...'
                                ) : (
                                    <>
                                        작성하기
                                        <Send className="size-4" />
                                    </>
                                )}
                            </button>
                        </div>

                        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                    </form>
                ) : (
                    <div className="rounded-xl bg-gray-50 p-6 text-center">
                        <p className="mb-4 text-gray-500">로그인 후 리뷰를 작성할 수 있습니다.</p>
                        <Link to="/login" className="font-medium text-blue-600 hover:underline">
                            로그인하러 가기
                        </Link>
                    </div>
                )}

                {/* 리뷰 목록 섹션 */}
                <div className="space-y-6">
                    {/* 정렬 버튼 영역 */}
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-2xl font-bold">리뷰 ({reviews.length})</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSortBy('latest')}
                                className={`text-sm font-medium transition-colors ${sortBy === 'latest' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                최신순
                            </button>
                            <span className="text-gray-200">|</span>
                            <button
                                onClick={() => setSortBy('likes')}
                                className={`text-sm font-medium transition-colors ${sortBy === 'likes' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                좋아요순
                            </button>
                        </div>
                    </div>

                    {loading && reviews.length === 0 ? (
                        <div className="py-12 text-center text-gray-400">리뷰를 불러오는 중입니다...</div>
                    ) : reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="space-y-3 border-b border-gray-100 pb-6 last:border-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-800">
                                            사용자 {review.user_id.slice(0, 4)}
                                        </span>
                                        {user?.id === review.user_id && (
                                            <button
                                                onClick={() => handleDeleteReview(review.id)}
                                                className="text-gray-300 transition-colors hover:text-red-500"
                                                title="리뷰 삭제"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-400">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* 별점 표시 */}
                                <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-600">진입로</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Accessibility
                                                    key={s}
                                                    className={`size-3 ${s <= review.rating_entrance ? 'fill-current text-yellow-400' : 'text-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="rounded bg-orange-50 px-2 py-0.5 text-orange-600">내부</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Accessibility
                                                    key={s}
                                                    className={`size-3 ${s <= review.rating_interior ? 'fill-current text-yellow-400' : 'text-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="rounded bg-green-50 px-2 py-0.5 text-green-600">편의시설</span>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Accessibility
                                                    key={s}
                                                    className={`size-3 ${s <= review.rating_facility ? 'fill-current text-yellow-400' : 'text-gray-200'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <p className="leading-relaxed text-gray-600">{review.content}</p>

                                {review.images && review.images.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {review.images.map((url, i) => (
                                            <div key={i} className="size-24 overflow-hidden rounded-lg">
                                                <ImageWithFallback
                                                    src={url}
                                                    alt="review"
                                                    className="size-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* 좋아요 버튼 */}
                                <div className="pt-2">
                                    <button
                                        onClick={() => user && toggleLikeReview(review.id, user.id)}
                                        disabled={!user}
                                        className={`flex transform items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all active:scale-95 ${
                                            review.is_liked
                                                ? 'border border-red-200 bg-red-50 text-red-600'
                                                : 'border border-gray-100 bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                    >
                                        <Heart className={`size-4 ${review.is_liked ? 'fill-current' : ''}`} />
                                        <span>좋아요 {review.likes || 0}</span>
                                    </button>
                                </div>

                                {/* 답글 목록 및 작성 섹션 */}
                                <div className="mt-4 ml-4 space-y-4 border-l-2 border-gray-100 pl-4">
                                    {/* 기존 답글 렌더링 */}
                                    {review.replies && review.replies.length > 0 && (
                                        <div className="space-y-3">
                                            {review.replies.map((reply) => (
                                                <div key={reply.id} className="text-sm">
                                                    <div className="mb-1 flex items-center gap-2">
                                                        <span className="font-bold text-gray-700">
                                                            익명 {reply.user_id.slice(0, 4)}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400">
                                                            {new Date(reply.created_at).toLocaleDateString()}
                                                        </span>
                                                        {user?.id === reply.user_id && (
                                                            <button
                                                                onClick={() => handleDeleteReply(reply.id)}
                                                                className="text-gray-300 transition-colors hover:text-red-500"
                                                                title="답글 삭제"
                                                            >
                                                                <Trash2 className="size-3" />
                                                            </button>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600">{reply.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* 답글 입력창 (로그인 시에만 노출) */}
                                    {user && (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={replyInputs[review.id] || ''}
                                                onChange={(e) =>
                                                    setReplyInputs((prev) => ({ ...prev, [review.id]: e.target.value }))
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                                                        handleSubmitReply(review.id)
                                                    }
                                                }}
                                                placeholder="답글을 남겨주세요..."
                                                className="flex-1 rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm outline-none focus:border-blue-400 focus:bg-white"
                                            />
                                            <button
                                                onClick={() => handleSubmitReply(review.id)}
                                                className="rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-700"
                                            >
                                                등록
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="py-10 text-center text-gray-400">첫 번째 리뷰를 남겨보세요!</p>
                    )}
                </div>
            </div>
        </div>
    )
}
