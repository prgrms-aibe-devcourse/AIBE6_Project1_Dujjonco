import { Accessibility, ArrowLeft, MapPin, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { supabase } from '../lib/supabase'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Facility {
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

export function FacilityDetail() {
    const { id } = useParams<{ id: string }>()
    const [facility, setFacility] = useState<Facility | null>(null)

    useEffect(() => {
        if (id) fetchFacility()
    }, [id])

    const fetchFacility = async () => {
        const { data, error } = await supabase.from('places').select('*').eq('content_id', id).single()

        if (error) {
            console.error(error)
        } else {
            setFacility(data)
        }
    }

    if (!facility) {
        return <div className="text-center py-12">로딩중...</div>
    }

    return (
        <div className="space-y-6">
            {/* 뒤로가기 */}
            <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="size-5" />
                <span>목록으로</span>
            </Link>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                {/* 이미지 */}
                <div className="relative h-96">
                    <ImageWithFallback
                        src={facility.image_url || '/fallback.png'}
                        alt={facility.title}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h1 className="text-4xl mb-2">{facility.title}</h1>
                        <p className="opacity-90">{facility.content_type}</p>
                    </div>
                </div>

                {/* 내용 */}
                <div className="p-8 space-y-6">
                    {/* 기본 정보 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <MapPin className="size-5 text-blue-600" />
                            <p>{facility.address}</p>
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
                        <h2 className="text-2xl mb-3 flex items-center gap-2">
                            <Accessibility className="size-6 text-blue-500" />
                            편의시설
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {facility.wheelchair && <div className="p-3 bg-blue-50 rounded-lg">휠체어 접근 가능</div>}

                            {facility.parking && <div className="p-3 bg-blue-50 rounded-lg">장애인 주차 가능</div>}

                            {facility.restroom && <div className="p-3 bg-blue-50 rounded-lg">장애인 화장실</div>}
                        </div>

                        {!facility.wheelchair && !facility.parking && !facility.restroom && (
                            <p className="text-gray-400">등록된 편의시설 정보 없음</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
