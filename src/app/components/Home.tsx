import { Accessibility, BookOpen, CircleSlash, DoorOpen, MapPin, ParkingCircle, Users, Volume2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabase } from '../lib/supabase'
import { ImageWithFallback } from './figma/ImageWithFallback'

// ✅ 타입 (DB 기준)
export interface Facility {
    content_id: string
    content_type: string
    title: string
    address: string
    addr2?: string
    tel?: string
    lat?: number
    lng?: number
    image_url?: string
    image_url2?: string

    parking?: string
    wheelchair?: string
    restroom?: string
}

export function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string>('전체')
    const [selectedLocation, setSelectedLocation] = useState<string>('전체')
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
    const [facilities, setFacilities] = useState<Facility[]>([])
    const [loading, setLoading] = useState(true)

    const categories = ['전체', '식당', '관광']
    const locations = ['전체', '서울', '경기', '충북', '충남', '강원', '전북', '전남', '경북', '경남', '제주']

    const accessibilityFeatures = [
        { name: '휠체어 경사로', icon: CircleSlash },
        { name: '점자 메뉴판', icon: BookOpen },
        { name: '장애인 화장실', icon: DoorOpen },
        { name: '장애인 주차구역', icon: ParkingCircle },
        { name: '수어 가능 직원', icon: Users },
        { name: '음성 안내', icon: Volume2 },
    ]

    const toggleFeature = (feature: string) => {
        setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
        console.log(feature)
    }

    // ✅ 필터 로직 (DB 기준으로 수정)
    const filteredFacilities = facilities.filter((facility) => {
        const categoryMatch = selectedCategory === '전체' || facility.content_type === selectedCategory

        const locationMatch = selectedLocation === '전체' || facility.address?.includes(selectedLocation)

        const featureMatch =
            selectedFeatures.length === 0 ||
            selectedFeatures.every((feature) => {
                if (feature === '장애인 주차구역') return !!facility.parking
                if (feature === '휠체어 경사로') return !!facility.wheelchair
                if (feature === '장애인 화장실') return !!facility.restroom
                return true
            })

        return categoryMatch && locationMatch && featureMatch
    })

    // ✅ 데이터 가져오기
    useEffect(() => {
        fetchFacilities()
    }, [])

    const fetchFacilities = async () => {
        setLoading(true)

        const { data, error } = await supabase.from('places').select('*')

        if (error) {
            console.error(error)
        } else {
            setFacilities(data || [])
        }

        setLoading(false)
    }

    // ✅ 로딩 UI
    if (loading) {
        return <div className="text-center py-20">로딩중...</div>
    }

    return (
        <div className="space-y-8">
            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                    <Accessibility className="size-10" />
                    <h2 className="text-4xl">모두를 위한 공간</h2>
                </div>
                <p className="text-lg opacity-90">장애인 편의시설이 잘 갖춰진 장소를 찾아보세요</p>
            </div>

            {/* 필터 */}
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                {/* 카테고리 */}
                <div>
                    <label className="block text-sm mb-2 text-gray-700">카테고리</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm ${
                                    selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 편의시설 */}
                <div>
                    <label className="block text-sm mb-2 text-gray-700">편의시설</label>
                    <div className="flex flex-wrap gap-2">
                        {accessibilityFeatures.map((feature) => {
                            const Icon = feature.icon
                            const isSelected = selectedFeatures.includes(feature.name)

                            return (
                                <button
                                    key={feature.name}
                                    onClick={() => toggleFeature(feature.name)}
                                    className={`px-3 py-2 rounded-full flex items-center gap-2 ${
                                        isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100'
                                    }`}
                                >
                                    <Icon className="size-4" />
                                    {feature.name}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* 지역 */}
                <div>
                    <label className="block text-sm mb-2 text-gray-700">지역</label>
                    <div className="flex flex-wrap gap-2">
                        {locations.map((location) => (
                            <button
                                key={location}
                                onClick={() => setSelectedLocation(location)}
                                className={`px-4 py-2 rounded-full ${
                                    selectedLocation === location ? 'bg-indigo-500 text-white' : 'bg-gray-100'
                                }`}
                            >
                                {location}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFacilities.map((facility) => (
                    <Link
                        key={facility.content_id}
                        to={`/facility/${facility.content_id}`}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                    >
                        <div className="h-56 overflow-hidden">
                            <ImageWithFallback
                                src={facility.image_url || '/fallback.png'}
                                alt={facility.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-5 space-y-3">
                            <h3 className="text-xl">{facility.title}</h3>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="size-4" />
                                <span>{facility.address}</span>
                            </div>

                            {/* 접근성 */}
                            <div className="flex flex-wrap gap-1.5">
                                {facility.wheelchair && <span className="tag">휠체어</span>}
                                {facility.parking && <span className="tag">주차</span>}
                                {facility.restroom && <span className="tag">화장실</span>}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* 없음 */}
            {filteredFacilities.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Accessibility className="size-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">조건에 맞는 시설이 없음</p>
                </div>
            )}
        </div>
    )
}
