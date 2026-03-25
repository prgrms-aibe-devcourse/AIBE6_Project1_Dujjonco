export interface Facility {
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

export const facilities: Facility[] = [
    {
        content_id: '1',
        content_type: '식당',
        title: '유니버설 다이닝 제주',
        address: '제주도 서귀포시',
        tel: '064-123-4567',
        lat: 33.25,
        lng: 126.56,
        image_url: 'https://images.unsplash.com/photo-1758346974833-080877659c5a',
        parking: '있음',
        wheelchair: '가능',
        restroom: '있음',
    },
    {
        content_id: '2',
        content_type: '카페',
        title: '모두의 카페',
        address: '서울 강남구',
        tel: '02-1234-5678',
        lat: 37.5,
        lng: 127.03,
        image_url: 'https://images.unsplash.com/photo-1721273076067-82c5d43995c8',
        parking: '있음',
        wheelchair: '가능',
        restroom: '있음',
    },
]
