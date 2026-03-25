import {
    Accessibility,
    BookOpen,
    CircleSlash,
    DoorOpen,
    Heart,
    MapPin,
    ParkingCircle,
    Star,
    Users,
    Volume2,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import { facilities } from '../data/facilities'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string>('전체')
    const [selectedLocation, setSelectedLocation] = useState<string>('전체')
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

    const categories = ['전체', '레스토랑', '카페', '이탈리안', '브런치 카페', '한식당']
    const locations = ['전체']

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
    }

    const filteredFacilities = facilities.filter((facility) => {
        const categoryMatch = selectedCategory === '전체' || facility.category === selectedCategory
        const locationMatch = selectedLocation === '전체' || facility.location === selectedLocation
        const featureMatch =
            selectedFeatures.length === 0 ||
            selectedFeatures.every((feature) => facility.accessibilityFeatures.includes(feature))
        return categoryMatch && locationMatch && featureMatch
    })

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                    <Accessibility className="size-10" />
                    <h2 className="text-4xl">모두를 위한 공간</h2>
                </div>
                <p className="text-lg opacity-90">장애인 편의시설이 잘 갖춰진 식당과 카페를 찾아보세요</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <div>
                    <label className="block text-sm mb-2 text-gray-700">카테고리</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm transition-colors ${
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

                {/* Accessibility Features Quick Tags */}
                <div>
                    <label className="block text-sm mb-2 text-gray-700">편의시설 퀵태그</label>
                    <div className="flex flex-wrap gap-2">
                        {accessibilityFeatures.map((feature) => {
                            const Icon = feature.icon
                            const isSelected = selectedFeatures.includes(feature.name)
                            return (
                                <button
                                    key={feature.name}
                                    onClick={() => toggleFeature(feature.name)}
                                    className={`px-3 py-2 rounded-full text-sm transition-all flex items-center gap-2 ${
                                        isSelected
                                            ? 'bg-purple-500 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <Icon className="size-4" />
                                    {feature.name}
                                </button>
                            )
                        })}
                    </div>
                    {selectedFeatures.length > 0 && (
                        <button
                            onClick={() => setSelectedFeatures([])}
                            className="mt-2 text-sm text-purple-600 hover:text-purple-700 underline"
                        >
                            편의시설 필터 초기화
                        </button>
                    )}
                </div>

                <div>
                    <label className="block text-sm mb-2 text-gray-700">지역</label>
                    <div className="flex flex-wrap gap-2">
                        {locations.map((location) => (
                            <button
                                key={location}
                                onClick={() => setSelectedLocation(location)}
                                className={`px-4 py-2 rounded-full text-sm transition-colors ${
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

            {/* Facility Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFacilities.map((facility) => (
                    <Link
                        key={facility.id}
                        to={`/facility/${facility.id}`}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 group"
                    >
                        <div className="relative h-56 overflow-hidden">
                            <ImageWithFallback
                                src={facility.imageUrl}
                                alt={facility.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                                <Heart className="size-5 text-blue-500" />
                            </button>
                        </div>

                        <div className="p-5 space-y-3">
                            <div>
                                <h3 className="text-xl mb-1">{facility.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="size-4" />
                                    <span>{facility.location}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                    <span>{facility.rating}</span>
                                </div>
                                <span className="text-gray-400">·</span>
                                <span className="text-sm text-gray-600">리뷰 {facility.reviewCount}개</span>
                                <span className="text-gray-400">·</span>
                                <span className="text-sm text-gray-600">{facility.priceRange}</span>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {facility.accessibilityFeatures.slice(0, 3).map((feature, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredFacilities.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <Accessibility className="size-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">선택한 조건에 맞는 시설이 없습니다.</p>
                </div>
            )}
        </div>
    )
}
