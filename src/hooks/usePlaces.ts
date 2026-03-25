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

export function usePlaces(filters: Filters) {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlaces()
  }, [filters])

  async function fetchPlaces() {
    setLoading(true)

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
      `)

    // 지역 필터
    if (filters.location && filters.location !== '전체') {
      query = query.like('address', `%${filters.location}%`)
    }

    // 업종 필터
    if (filters.category && filters.category !== '전체') {
      query = query.eq('content_type', filters.category)
    }

    // 배리어프리 필터 (AND 조건)
    if (filters.wheelchair) query = query.not('wheelchair', 'is', null)
    if (filters.elevator)   query = query.not('elevator', 'is', null)
    if (filters.restroom)   query = query.not('restroom', 'is', null)
    if (filters.parking)    query = query.not('parking', 'is', null)

    const { data, error } = await query

    if (error) console.error(error)
    else setPlaces(data as Place[])

    setLoading(false)
  }

  return { places, loading }
}