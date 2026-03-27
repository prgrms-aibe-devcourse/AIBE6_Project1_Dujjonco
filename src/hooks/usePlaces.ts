import { supabase } from '@/supabase/supabase'
import { useEffect, useState } from 'react'

// 필터 타입 정의
interface Filters {
    category: string
    location: string
    wheelchair: boolean
    elevator: boolean
    restroom: boolean
    parking: boolean
    sortType: 'latest' | 'rating'
}

// 장소 타입 정의
interface Place {
    content_id: string
    title: string
    address: string
    area_code: string
    content_type: string
    image_url: string
    wheelchair: string | null
    elevator: string | null
    restroom: string | null
    parking: string | null
    braileblock: string | null
    audioguide: string | null
    signguide: string | null
}

const ITEMS_PER_PAGE = 20

export function usePlaces(filters: Filters, page: number = 1) {
    const [places, setPlaces] = useState<Place[]>([])
    const [loading, setLoading] = useState(true)
    const [totalCount, setTotalCount] = useState(0)

    const filtersKey = JSON.stringify(filters)
    useEffect(() => {
        fetchPlaces()
    }, [filtersKey, page])

    async function fetchPlaces() {
        setLoading(true)

        const from = (page - 1) * ITEMS_PER_PAGE
        const to = from + ITEMS_PER_PAGE - 1

        let query = supabase.from('places').select(
            `
        content_id,
        title,
        address,
        area_code,
        content_type,
        image_url,
        wheelchair,
        elevator,
        restroom,
        parking,
        braileblock,
        audioguide,
        signguide
      `,
            { count: 'exact' },
        )

        // 지역 필터 (area_code로 검색)
        if (filters.location && filters.location !== '전체') {
            query = query.eq('area_code', filters.location)
        }

        // 업종 필터
        if (filters.category && filters.category !== '전체') {
            query = query.eq('content_type', filters.category)
        }

        // 배리어프리 필터 (AND 조건)
        if (filters.wheelchair) query = query.not('wheelchair', 'is', null)
        if (filters.elevator) query = query.not('elevator', 'is', null)
        if (filters.restroom) query = query.not('restroom', 'is', null)
        if (filters.parking) query = query.not('parking', 'is', null)

        // 정렬
        if (filters.sortType === 'latest') {
            query = query.order('created_at', { ascending: false })
        }
        // 평점순은 reviews 데이터 쌓인 후 추가 예정

        // 페이지네이션
        const { data, error, count } = await query.range(from, to)

        if (error) console.error(error)
        else {
            setPlaces(data as Place[])
            setTotalCount(count ?? 0)
        }

        setLoading(false)
    }

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return { places, loading, totalCount, totalPages }
}
