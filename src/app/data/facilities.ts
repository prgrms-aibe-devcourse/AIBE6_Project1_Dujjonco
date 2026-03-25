export interface Review {
    id: string
    userName: string
    rating: number
    date: string
    comment: string
    accessibilityType: string
    helpfulCount: number
}

export interface Facility {
    id: string
    name: string
    location: string
    category: string
    imageUrl: string
    rating: number
    reviewCount: number
    accessibilityFeatures: string[]
    description: string
    hours: string
    priceRange: string
    contact: string
    reviews: Review[]
}

export const facilities: Facility[] = [
    {
        id: '1',
        name: '유니버설 다이닝 제주',
        location: '제주도 서귀포시',
        category: '레스토랑',
        imageUrl:
            'https://images.unsplash.com/photo-1758346974833-080877659c5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBmcmllbmRseSUyMHJlc3RhdXJhbnQlMjBvdXRkb29yfGVufDF8fHx8MTc3NDI1NjI1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.8,
        reviewCount: 127,
        accessibilityFeatures: ['휠체어 경사로', '장애인 화장실', '넓은 통로', '점자 메뉴판', '저상 테이블'],
        description:
            '제주 바다가 보이는 완전 무장애 레스토랑입니다. 휠체어 접근이 용이하며, 시각장애인을 위한 점자 메뉴와 청각장애인을 위한 진동벨 시스템을 갖추고 있습니다.',
        hours: '11:00 - 21:00',
        priceRange: '₩₩₩',
        contact: '064-123-4567',
        reviews: [
            {
                id: 'r1',
                userName: '김민지',
                rating: 5,
                date: '2026-03-15',
                comment:
                    '휠체어를 사용하는데 입구부터 테이블까지 전혀 불편함이 없었습니다. 직원분들도 장애인 응대 교육을 받으신 것 같아요. 음식도 맛있고 바다 뷰도 환상적이에요!',
                accessibilityType: '지체장애',
                helpfulCount: 45,
            },
            {
                id: 'r2',
                userName: '박준혁',
                rating: 5,
                date: '2026-03-10',
                comment:
                    '시각장애가 있는데 점자 메뉴판과 직원의 친절한 설명 덕분에 편하게 식사했습니다. 화장실도 음성 안내가 있어서 좋았어요.',
                accessibilityType: '시각장애',
                helpfulCount: 38,
            },
            {
                id: 'r3',
                userName: '이수연',
                rating: 4,
                date: '2026-03-05',
                comment:
                    '장애인 주차 공간도 넉넉하고, 엘리베이터도 있어서 2층 좌석 이용이 편했습니다. 다만 주말에는 예약 필수예요.',
                accessibilityType: '지체장애',
                helpfulCount: 32,
            },
        ],
    },
    {
        id: '2',
        name: '모두의 카페',
        location: '서울 강남구',
        category: '카페',
        imageUrl:
            'https://images.unsplash.com/photo-1721273076067-82c5d43995c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc0MjU2MjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        rating: 4.6,
        reviewCount: 89,
        accessibilityFeatures: [
            '자동문',
            '넓은 좌석 간격',
            '높이 조절 테이블',
            '수어 가능 직원',
            '시각장애인 안내견 동반',
        ],
        description:
            '모든 사람이 편안하게 이용할 수 있도록 설계된 유니버설 디자인 카페입니다. 수어 가능 직원이 상주하며 시각장애인 안내견 동반이 가능합니다.',
        hours: '10:00 - 22:00',
        priceRange: '₩₩',
        contact: '02-1234-5678',
        reviews: [
            {
                id: 'r4',
                userName: '최서희',
                rating: 5,
                date: '2026-03-18',
                comment:
                    '청각장애가 있는데 수어로 주문할 수 있어서 정말 편했어요. 태블릿 주문 시스템도 있어서 좋습니다. 커피 맛도 훌륭해요!',
                accessibilityType: '청각장애',
                helpfulCount: 52,
            },
            {
                id: 'r5',
                userName: '정우진',
                rating: 4,
                date: '2026-03-12',
                comment:
                    '휠체어 사용자인데 테이블 높이가 딱 맞아서 편하게 이용했습니다. 화장실도 넓고 손잡이가 잘 되어 있어요.',
                accessibilityType: '지체장애',
                helpfulCount: 41,
            },
            {
                id: 'r6',
                userName: '강민아',
                rating: 5,
                date: '2026-03-08',
                comment:
                    '안내견과 함께 갔는데 전혀 눈치 보지 않고 편하게 이용했어요. 직원분들도 안내견 응대에 익숙하셔서 좋았습니다.',
                accessibilityType: '시각장애',
                helpfulCount: 37,
            },
        ],
    },
]
