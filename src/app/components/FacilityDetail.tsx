import { Accessibility, ArrowLeft, Clock, DollarSign, MapPin, Phone, Star, ThumbsUp } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { facilities } from '../data/facilities'
import { ImageWithFallback } from './figma/ImageWithFallback'

export function FacilityDetail() {
    const { id } = useParams<{ id: string }>()
    const facility = facilities.find((f) => f.id === id)

    if (!facility) {
        return (
            <div className="text-center py-12">
                <Accessibility className="size-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl mb-4">시설을 찾을 수 없습니다</h2>
                <Link to="/" className="text-blue-500 hover:underline">
                    홈으로 돌아가기
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="size-5" />
                <span>목록으로</span>
            </Link>

            {/* Facility Header */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-96">
                    <ImageWithFallback
                        src={facility.imageUrl}
                        alt={facility.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h1 className="text-4xl mb-2">{facility.name}</h1>
                        <div className="flex items-center gap-3 text-lg">
                            <div className="flex items-center gap-1">
                                <Star className="size-5 fill-yellow-400 text-yellow-400" />
                                <span>{facility.rating}</span>
                            </div>
                            <span>·</span>
                            <span>리뷰 {facility.reviewCount}개</span>
                            <span>·</span>
                            <span>{facility.category}</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    {/* Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <MapPin className="size-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">위치</p>
                                <p>{facility.location}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <Clock className="size-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">영업시간</p>
                                <p>{facility.hours}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <DollarSign className="size-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">가격대</p>
                                <p>{facility.priceRange}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <Phone className="size-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">문의</p>
                                <p className="text-sm">{facility.contact}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-2xl mb-3">소개</h2>
                        <p className="text-gray-700 leading-relaxed">{facility.description}</p>
                    </div>

                    {/* Accessibility Features */}
                    <div>
                        <h2 className="text-2xl mb-3 flex items-center gap-2">
                            <Accessibility className="size-6 text-blue-500" />
                            편의시설
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {facility.accessibilityFeatures.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                                    <div className="size-2 bg-blue-500 rounded-full" />
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl mb-6">리뷰 ({facility.reviews.length})</h2>
                <div className="space-y-6">
                    {facility.reviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="size-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white">
                                            {review.userName.charAt(0)}
                                        </div>
                                        <div>
                                            <p>{review.userName}</p>
                                            <p className="text-sm text-gray-500">{review.accessibilityType}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 mb-1">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`size-4 ${
                                                    i < review.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500">{review.date}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                                <ThumbsUp className="size-4" />
                                <span>도움됨 {review.helpfulCount}</span>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add Review Button */}
                <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all">
                    리뷰 작성하기
                </button>
            </div>
        </div>
    )
}
