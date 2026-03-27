import { Accessibility, ArrowDownUp, CircleParking, DoorOpen } from 'lucide-react'

export const AreaCode = {
    SEOUL: '1',
    INCHEON: '2',
    DAEJEON: '3',
    DAEGU: '4',
    GWANGJU: '5',
    BUSAN: '6',
    ULSAN: '7',
    SEJONG: '8',
    GYEONGGI: '31',
    GANGWON: '32',
    CHUNGBUK: '33',
    CHUNGNAM: '34',
    GYEONGBUK: '35',
    GYEONGNAM: '36',
    JEONBUK: '37',
    JEONNAM: '38',
    JEJU: '39',
} as const

export const ContentType = {
    TOURISM: '12',
    LODGING: '32',
    RESTAURANT: '39',
} as const

export const AssistType = {
    parking: '장애인 주차장',
    publictransport: '대중교통 접근성',
    route: '접근로',
    ticketoffice: '매표소',
    promotion: '홍보물',
    wheelchair: '휠체어 접근',
    exit: '출입통로',
    elevator: '엘리베이터',
    restroom: '장애인 화장실',
    auditorium: '관람석',
    room: '장애인용 객실',
    handicapetc: '지체장애 기타',
    braileblock: '점자블록',
    helpdog: '안내견 동반',
    guidehuman: '안내요원',
    audioguide: '오디오 가이드',
    bigprint: '큰 활자 홍보물',
    brailepromotion: '점자 홍보물',
    guidesystem: '유도 안내 설비',
    blindhandicapetc: '시각장애 기타',
    signguide: '수화 안내',
    videoguide: '자막 비디오 가이드',
    hearingroom: '청각장애 객실',
    hearinghandicapetc: '청각장애 기타',
    stroller: '유모차',
    lactationroom: '수유실',
    babysparechair: '유아 보조의자',
    infantsfamilyetc: '영유아가족 기타',
} as const

export type AreaCodeType = (typeof AreaCode)[keyof typeof AreaCode]
export type ContentType = (typeof ContentType)[keyof typeof ContentType]
export type AssistType = (typeof AssistType)[keyof typeof AssistType]

export const BARRIER_ICONS = {
    wheelchair: { icon: Accessibility, label: '휠체어' },
    elevator: { icon: ArrowDownUp, label: '엘리베이터' },
    parking: { icon: CircleParking, label: '장애인주차' },
    restroom: { icon: DoorOpen, label: '장애인화장실' },
}

export function getActiveIcons(place: Record<string, string | null>) {
    return Object.entries(BARRIER_ICONS).filter(([key]) => place[key] !== null)
}
