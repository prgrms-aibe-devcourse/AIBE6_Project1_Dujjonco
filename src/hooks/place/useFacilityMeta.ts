import { useMemo } from 'react'

import { AssistType, ContentType } from '@/constants/api-codes'
import type { Facility } from './useFacilityDetail'

export function useFacilityMeta(facility: Facility | null) {
    const contentTypeLabel = useMemo(() => {
        if (!facility) return ''

        const contentTypeLabelMap: Record<string, string> = {
            [ContentType.TOURISM]: '관광지',
            [ContentType.LODGING]: '숙박',
            [ContentType.RESTAURANT]: '음식점',
        }

        return contentTypeLabelMap[facility.content_type] ?? facility.content_type
    }, [facility])

    const activeAssistTypes = useMemo(() => {
        if (!facility) return []

        return Object.entries(AssistType).filter(([key]) => {
            const value = facility[key as keyof Facility]
            return value !== null && value !== undefined && value !== ''
        })
    }, [facility])

    return {
        contentTypeLabel,
        activeAssistTypes,
    }
}
