import { supabase } from '@/supabase/supabase'
import { useEffect, useState } from 'react'

export interface Facility {
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

export function useFacilityDetail(id?: string) {
    const [facility, setFacility] = useState<Facility | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id) {
            setFacility(null)
            setLoading(false)
            return
        }

        const fetchFacility = async () => {
            setLoading(true)
            setError(null)

            const { data, error } = await supabase.from('places').select('*').eq('content_id', id).single()

            if (error) {
                console.error(error)
                setError('장소 정보를 불러오지 못했습니다.')
                setFacility(null)
            } else {
                setFacility(data as Facility)
            }

            setLoading(false)
        }

        fetchFacility()
    }, [id])

    return {
        facility,
        loading,
        error,
    }
}
