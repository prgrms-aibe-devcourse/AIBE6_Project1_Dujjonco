import { Accessibility, ArrowDownUp, CircleParking, DoorOpen, Heart, MapPin, Star } from 'lucide-react'
import { Link, useSearchParams } from 'react-router'
import { AreaCode, ContentType, getActiveIcons } from '../../../constants/api-codes'
import { useBookmarks } from '../../../hooks/place/useBookmark'
import { usePlaces } from '../../../hooks/place/usePlaces'
import { useAuth } from '../../contexts/AuthContext'
import { ImageWithFallback } from '../common/ImageWithFallback'

const CATEGORY_MAP: Record<string, string> = {
    전체: '전체',
    관광지: ContentType.TOURISM,
    숙박: ContentType.LODGING,
    음식점: ContentType.RESTAURANT,
}

const LOCATION_MAP: Record<string, string> = {
    전체: '전체',
    서울: AreaCode.SEOUL,
    인천: AreaCode.INCHEON,
    대전: AreaCode.DAEJEON,
    대구: AreaCode.DAEGU,
    광주: AreaCode.GWANGJU,
    부산: AreaCode.BUSAN,
    울산: AreaCode.ULSAN,
    세종: AreaCode.SEJONG,
    경기: AreaCode.GYEONGGI,
    강원: AreaCode.GANGWON,
    충북: AreaCode.CHUNGBUK,
    충남: AreaCode.CHUNGNAM,
    경북: AreaCode.GYEONGBUK,
    경남: AreaCode.GYEONGNAM,
    전북: AreaCode.JEONBUK,
    전남: AreaCode.JEONNAM,
    제주: AreaCode.JEJU,
}

type SortType = 'latest' | 'rating' | 'review'

interface Place {
    content_id: string
    title: string
    address: string
    image_url: string
    avg_score?: number
    review_count?: number
    [key: string]: string | number | null | undefined
}

function PlaceCard({
    place,
    isBookmarked,
    bookmarkLoading,
    onToggle,
}: {
    place: Place
    isBookmarked: boolean
    bookmarkLoading: boolean
    onToggle: (placeId: string) => void
}) {
    return (
        <Link
            to={`/facility/${place.content_id}`}
            className="group transform overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
        >
            <div className="relative h-56 overflow-hidden">
                <ImageWithFallback
                    src={place.image_url}
                    alt={place.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <button
                    className="absolute top-4 right-4 rounded-full bg-white/90 p-2 transition-colors hover:bg-white disabled:opacity-50"
                    onClick={(e) => {
                        e.preventDefault()
                        onToggle(place.content_id)
                    }}
                    disabled={bookmarkLoading}
                >
                    <Heart
                        className={`size-5 transition-colors ${
                            isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-blue-500'
                        }`}
                    />
                </button>
            </div>

            <div className="space-y-3 p-5">
                <div>
                    <div className="flex items-center justify-between">
                        <h3 className="mb-1 text-xl dark:text-white">{place.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                            <Star className="size-4 fill-yellow-400" />
                            <span>{place.avg_score !== undefined ? place.avg_score.toFixed(2) : '0.00'}</span>
                            <span className="text-xs text-gray-400">({place.review_count ?? 0})</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="size-4" />
                        <span>{place.address}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {getActiveIcons(place)
                        .slice(0, 4)
                        .map(([key, { icon: Icon, label }]) => (
                            <span
                                key={key}
                                className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600"
                            >
                                <Icon className="size-3" />
                                {label}
                            </span>
                        ))}
                </div>
            </div>
        </Link>
    )
}

export function Home() {
    const { user } = useAuth()
    const { bookmarks, loadingId, toggleBookmark } = useBookmarks(user?.id)
    const [searchParams, setSearchParams] = useSearchParams()

    // ── URL에서 상태 읽기 (없으면 기본값) ──────────────────────────
    const selectedCategory = searchParams.get('category') ?? '전체'
    const selectedLocation = searchParams.get('location') ?? '전체'
    const sortType = (searchParams.get('sort') ?? 'latest') as SortType
    const page = Number(searchParams.get('page') ?? '1')
    const searchKeyword = searchParams.get('keyword') ?? ''
    const selectedFeatures = {
        wheelchair: searchParams.get('wheelchair') === 'true',
        elevator: searchParams.get('elevator') === 'true',
        restroom: searchParams.get('restroom') === 'true',
        parking: searchParams.get('parking') === 'true',
    }

    // ── URL 업데이트 헬퍼 ──────────────────────────────────────────
    // 기본값은 URL에서 제거해 주소를 깔끔하게 유지
    const DEFAULT_VALUES: Record<string, string> = {
        category: '전체',
        location: '전체',
        sort: 'latest',
        page: '1',
        keyword: '',
        wheelchair: 'false',
        elevator: 'false',
        restroom: 'false',
        parking: 'false',
    }

    const updateParams = (updates: Record<string, string>) => {
        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev)
                Object.entries(updates).forEach(([k, v]) => {
                    if (v === DEFAULT_VALUES[k]) {
                        next.delete(k)
                    } else {
                        next.set(k, v)
                    }
                })
                return next
            },
            { replace: true }, // 히스토리 스택 오염 방지
        )
    }

    // ── 이벤트 핸들러 ─────────────────────────────────────────────
    const toggleFeature = (key: keyof typeof selectedFeatures) => {
        updateParams({ [key]: String(!selectedFeatures[key]), page: '1' })
    }

    const resetFeatures = () => {
        updateParams({
            wheelchair: 'false',
            elevator: 'false',
            restroom: 'false',
            parking: 'false',
            page: '1',
        })
    }

    const hasSelectedFeatures = Object.values(selectedFeatures).some(Boolean)

    // ── 상수 ──────────────────────────────────────────────────────
    const categories = Object.keys(CATEGORY_MAP)
    const locations = Object.keys(LOCATION_MAP)

    const accessibilityFeatures = [
        { key: 'wheelchair', label: '휠체어', icon: Accessibility },
        { key: 'elevator', label: '엘리베이터', icon: ArrowDownUp },
        { key: 'restroom', label: '장애인화장실', icon: DoorOpen },
        { key: 'parking', label: '장애인주차', icon: CircleParking },
    ]

    const { places, loading, totalPages } = usePlaces(
        {
            category: CATEGORY_MAP[selectedCategory],
            location: LOCATION_MAP[selectedLocation],
            wheelchair: selectedFeatures.wheelchair,
            elevator: selectedFeatures.elevator,
            restroom: selectedFeatures.restroom,
            parking: selectedFeatures.parking,
            sortType,
            keyword: searchKeyword,
        },
        page,
    )

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-8 text-white">
                <div className="mb-3 flex items-center gap-3">
                    <Accessibility className="size-10" />
                    <h2 className="text-4xl">모두를 위한 공간</h2>
                </div>
                <p className="text-lg opacity-90">장애인 편의시설이 잘 갖춰진 식당과 카페를 찾아보세요</p>
            </div>

            {/* 검색창 */}
            <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
                <input
                    type="text"
                    placeholder="장소명을 검색해보세요..."
                    value={searchKeyword}
                    onChange={(e) => updateParams({ keyword: e.target.value, page: '1' })}
                    className="w-full rounded-lg border px-4 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
                />
            </div>

            {/* Filters */}
            <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                {/* 카테고리 */}
                <div>
                    <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">카테고리</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => updateParams({ category, page: '1' })}
                                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 배리어프리 퀵태그 */}
                <div>
                    <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">
                        편의시설 퀵태그
                        {hasSelectedFeatures && (
                            <button
                                onClick={resetFeatures}
                                className="ml-2 text-xs text-blue-500 underline hover:text-blue-700"
                            >
                                초기화
                            </button>
                        )}
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {accessibilityFeatures.map((feature) => {
                            const Icon = feature.icon
                            const isSelected = selectedFeatures[feature.key as keyof typeof selectedFeatures]
                            return (
                                <button
                                    key={feature.key}
                                    onClick={() => toggleFeature(feature.key as keyof typeof selectedFeatures)}
                                    className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-all ${
                                        isSelected
                                            ? 'bg-purple-500 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    <Icon className="size-4" />
                                    {feature.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* 지역 필터 */}
                <div>
                    <label className="mb-2 block text-sm text-gray-700 dark:text-gray-300">지역</label>
                    <div className="flex flex-wrap gap-2">
                        {locations.map((location) => (
                            <button
                                key={location}
                                onClick={() => updateParams({ location, page: '1' })}
                                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                                    selectedLocation === location
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                                }`}
                            >
                                {location}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 정렬 버튼 */}
            <div className="flex justify-end gap-2">
                {(['latest', 'rating', 'review'] as const).map((type) => (
                    <button
                        key={type}
                        onClick={() => updateParams({ sort: type, page: '1' })}
                        className={`rounded-full px-4 py-2 text-sm ${
                            sortType === type
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {type === 'latest' ? '최신순' : type === 'rating' ? '평점순' : '리뷰많은순'}
                    </button>
                ))}
            </div>

            {/* 로딩 상태 */}
            {loading && (
                <div className="py-12 text-center">
                    <p className="text-gray-500">로딩 중...</p>
                </div>
            )}

            {/* 장소 카드 리스트 */}
            {!loading && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {places.map((place) => (
                        <PlaceCard
                            key={place.content_id}
                            place={place}
                            isBookmarked={bookmarks.has(place.content_id)}
                            bookmarkLoading={loadingId === place.content_id}
                            onToggle={toggleBookmark}
                        />
                    ))}
                </div>
            )}

            {/* 검색 결과 없을 때 */}
            {!loading && places.length === 0 && (
                <div className="rounded-xl bg-gray-50 py-12 text-center">
                    <Accessibility className="mx-auto mb-4 size-16 text-gray-300" />
                    <p className="text-gray-500">선택한 조건에 맞는 시설이 없습니다.</p>
                </div>
            )}

            {/* 페이지네이션 */}
            {!loading && totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                    <button
                        onClick={() => updateParams({ page: String(page - 1) })}
                        disabled={page === 1}
                        className="rounded-lg bg-gray-100 px-4 py-2 hover:bg-white disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500"
                    >
                        이전
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => p >= Math.max(1, page - 4) && p <= Math.min(totalPages, page + 5))
                        .map((p) => (
                            <button
                                key={p}
                                onClick={() => updateParams({ page: String(p) })}
                                className={`rounded-lg px-4 py-2 ${
                                    page === p
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    <button
                        onClick={() => updateParams({ page: String(page + 1) })}
                        disabled={page === totalPages}
                        className="rounded-lg bg-gray-100 px-4 py-2 hover:bg-white disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-500"
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    )
}
