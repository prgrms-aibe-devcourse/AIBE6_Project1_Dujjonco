import { useState, useEffect } from 'react'
import { supabase } from '../app/lib/supabase'

// 필터 타입 정의
interface Filters {
  category: string
  location: string
  wheelchair: boolean
  elevator: boolean
  restroom: boolean
  parking: boolean
}

// 장소 타입 정의
interface Place {
  content_id: string
  title: string
  address: string
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

const ITEMS_PER_PAGE = 20  // 한 페이지당 개수(조절가능)

export function usePlaces(filters: Filters, page: number = 1) {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)  // 전체 장소 수

  useEffect(() => {
    fetchPlaces()
  }, [filters, page])  // page 바뀔 때도 재실행

  async function fetchPlaces() {
    setLoading(true)

    // 페이지네이션 범위 계산
    const from = (page - 1) * ITEMS_PER_PAGE  
    const to = from + ITEMS_PER_PAGE - 1       

    let query = supabase
      .from('places')
      .select(`
        content_id,
        title,
        address,
        content_type,
        image_url,
        wheelchair,
        elevator,
        restroom,
        parking,
        braileblock,
        audioguide,
        signguide
      `, { count: 'exact' })  // 전체 개수도 같이 가져오기(페이지네이션용)

    // 지역 필터
    if (filters.location && filters.location !== '전체') {
      query = query.like('address', `%${filters.location}%`)
    }

    // 업종 필터
    if (filters.category && filters.category !== '전체') {
      query = query.eq('content_type', filters.category)
    }

    // 배리어프리 필터
    if (filters.wheelchair) query = query.not('wheelchair', 'is', null)
    if (filters.elevator)   query = query.not('elevator', 'is', null)
    if (filters.restroom)   query = query.not('restroom', 'is', null)
    if (filters.parking)    query = query.not('parking', 'is', null)

    // 페이지네이션 적용
    const { data, error, count } = await query.range(from, to)

    if (error) console.error(error)
    else {
      setPlaces(data as Place[])
      setTotalCount(count ?? 0)  // 전체 장소 수 저장
    }

    setLoading(false)
  }

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  return { places, loading, totalCount, totalPages }
}