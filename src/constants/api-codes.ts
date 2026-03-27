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

export type AreaCodeType = (typeof AreaCode)[keyof typeof AreaCode]
export type ContentType = (typeof ContentType)[keyof typeof ContentType]
