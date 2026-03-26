import { Accessibility, ArrowDownUp, CircleParking, DoorOpen, Heart, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { AreaCode, ContentType, getActiveIcons } from '../../../constants/api-codes'
import { usePlaces } from '../../hooks/usePlaces'
import { ImageWithFallback } from './figma/ImageWithFallback'

// 카테고리 매핑
const CATEGORY_MAP: Record<string, string> = {
    전체: '전체',
    관광지: ContentType.TOURISM,
    숙박: ContentType.LODGING,
    음식점: ContentType.RESTAURANT,
}

// 지역 매핑
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

type SortType = 'latest' | 'rating'

export function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string>('전체')
    const [selectedLocation, setSelectedLocation] = useState<string>('전체')
    const [selectedFeatures, setSelectedFeatures] = useState({
        wheelchair: false,
        elevator: false,
        restroom: false,
        parking: false,
    })
    const [sortType, setSortType] = useState<SortType>('latest')
    const [page, setPage] = useState(1)

    const categories = Object.keys(CATEGORY_MAP)
    const locations = Object.keys(LOCATION_MAP)

    const accessibilityFeatures = [
        { key: 'wheelchair', label: '휠체어', icon: Accessibility },
        { key: 'elevator', label: '엘리베이터', icon: ArrowDownUp },
        { key: 'restroom', label: '장애인화장실', icon: DoorOpen },
        { key: 'parking', label: '장애인주차', icon: CircleParking },
    ]

    // usePlaces 훅으로 실제 DB 데이터 가져오기
    const { places, loading, totalPages } = usePlaces(
        {
            category: CATEGORY_MAP[selectedCategory],
            location: LOCATION_MAP[selectedLocation],
            wheelchair: selectedFeatures.wheelchair,
            elevator: selectedFeatures.elevator,
            restroom: selectedFeatures.restroom,
            parking: selectedFeatures.parking,
            sortType,
        },
        page,
    )

    // 배리어프리 필터 토글
    const toggleFeature = (key: keyof typeof selectedFeatures) => {
        setSelectedFeatures((prev) => ({ ...prev, [key]: !prev[key] }))
        setPage(1)
    }

    // 필터 초기화
    const resetFeatures = () => {
        setSelectedFeatures({ wheelchair: false, elevator: false, restroom: false, parking: false })
        setPage(1)
    }

    const hasSelectedFeatures = Object.values(selectedFeatures).some(Boolean)

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

            {/* Filters */}
            <div className="space-y-4 rounded-xl bg-white p-6 shadow-sm">
                {/* 카테고리 (업종 필터) */}
                <div>
                    <label className="mb-2 block text-sm text-gray-700">카테고리</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category)
                                    setPage(1)
                                }}
                                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 배리어프리 퀵태그 */}
                <div>
                    <label className="mb-2 block text-sm text-gray-700">편의시설 퀵태그</label>
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
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <Icon className="size-4" />
                                    {feature.label}
                                </button>
                            )
                        })}
                    </div>
                    {hasSelectedFeatures && (
                        <button
                            onClick={resetFeatures}
                            className="mt-2 text-sm text-purple-600 underline hover:text-purple-700"
                        >
                            편의시설 필터 초기화
                        </button>
                    )}
                </div>

                {/* 지역 필터 */}
                <div>
                    <label className="mb-2 block text-sm text-gray-700">지역</label>
                    <div className="flex flex-wrap gap-2">
                        {locations.map((location) => (
                            <button
                                key={location}
                                onClick={() => {
                                    setSelectedLocation(location)
                                    setPage(1)
                                }}
                                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                                    selectedLocation === location
                                        ? 'bg-indigo-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                <button
                    onClick={() => {
                        setSortType('latest')
                        setPage(1)
                    }}
                    className={`rounded-full px-4 py-2 text-sm ${
                        sortType === 'latest' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    최신순
                </button>
                <button
                    onClick={() => {
                        setSortType('rating')
                        setPage(1)
                    }}
                    className={`rounded-full px-4 py-2 text-sm ${
                        sortType === 'rating' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    평점순
                </button>
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
                        <Link
                            key={place.content_id}
                            to={`/facility/${place.content_id}`}
                            className="group transform overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <ImageWithFallback
                                    src={place.image_url}
                                    alt={place.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <button className="absolute top-4 right-4 rounded-full bg-white/90 p-2 transition-colors hover:bg-white">
                                    <Heart className="size-5 text-blue-500" />
                                </button>
                            </div>

                            <div className="space-y-3 p-5">
                                <div>
                                    <h3 className="mb-1 text-xl">{place.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="size-4" />
                                        <span>{place.address}</span>
                                    </div>
                                </div>

                                {/* 배리어프리 아이콘 (DB 기반) */}
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
                    ))}
                </div>
            )}

            {/* 검색 결과 없을 때 안내 메시지 */}
            {!loading && places.length === 0 && (
                <div className="rounded-xl bg-gray-50 py-12 text-center">
                    <Accessibility className="mx-auto mb-4 size-16 text-gray-300" />
                    <p className="text-gray-500">선택한 조건에 맞는 시설이 없습니다.</p>
                </div>
            )}

            {/* 페이지네이션 */}
            {!loading && totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                    {/* 이전 버튼 */}
                    <button
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1}
                        className="rounded-lg bg-gray-100 px-4 py-2 disabled:opacity-50"
                    >
                        이전
                    </button>

                    {/* 페이지 번호 (현재 페이지 기준 앞뒤 5개씩) */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => p >= Math.max(1, page - 4) && p <= Math.min(totalPages, page + 5))
                        .map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`rounded-lg px-4 py-2 ${
                                    page === p ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                }`}
                            >
                                {p}
                            </button>
                        ))}

                    {/* 다음 버튼 */}
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page === totalPages}
                        className="rounded-lg bg-gray-100 px-4 py-2 disabled:opacity-50"
                    >
                        다음
                    </button>
                </div>
            )}
        </div>
    )
}
