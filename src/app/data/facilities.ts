export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  accessibilityType: string;
  helpfulCount: number;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  accessibilityFeatures: string[];
  description: string;
  hours: string;
  priceRange: string;
  contact: string;
  reviews: Review[];
}

export const facilities: Facility[] = [
  {
    id: "1",
    name: "유니버설 다이닝 제주",
    location: "제주도 서귀포시",
    category: "레스토랑",
    imageUrl: "https://images.unsplash.com/photo-1758346974833-080877659c5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBmcmllbmRseSUyMHJlc3RhdXJhbnQlMjBvdXRkb29yfGVufDF8fHx8MTc3NDI1NjI1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviewCount: 127,
    accessibilityFeatures: ["휠체어 경사로", "장애인 화장실", "넓은 통로", "점자 메뉴판", "저상 테이블"],
    description: "제주 바다가 보이는 완전 무장애 레스토랑입니다. 휠체어 접근이 용이하며, 시각장애인을 위한 점자 메뉴와 청각장애인을 위한 진동벨 시스템을 갖추고 있습니다.",
    hours: "11:00 - 21:00",
    priceRange: "₩₩₩",
    contact: "064-123-4567",
    reviews: [
      {
        id: "r1",
        userName: "김민지",
        rating: 5,
        date: "2026-03-15",
        comment: "휠체어를 사용하는데 입구부터 테이블까지 전혀 불편함이 없었습니다. 직원분들도 장애인 응대 교육을 받으신 것 같아요. 음식도 맛있고 바다 뷰도 환상적이에요!",
        accessibilityType: "지체장애",
        helpfulCount: 45
      },
      {
        id: "r2",
        userName: "박준혁",
        rating: 5,
        date: "2026-03-10",
        comment: "시각장애가 있는데 점자 메뉴판과 직원의 친절한 설명 덕분에 편하게 식사했습니다. 화장실도 음성 안내가 있어서 좋았어요.",
        accessibilityType: "시각장애",
        helpfulCount: 38
      },
      {
        id: "r3",
        userName: "이수연",
        rating: 4,
        date: "2026-03-05",
        comment: "장애인 주차 공간도 넉넉하고, 엘리베이터도 있어서 2층 좌석 이용이 편했습니다. 다만 주말에는 예약 필수예요.",
        accessibilityType: "지체장애",
        helpfulCount: 32
      }
    ]
  },
  {
    id: "2",
    name: "모두의 카페",
    location: "서울 강남구",
    category: "카페",
    imageUrl: "https://images.unsplash.com/photo-1721273076067-82c5d43995c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc0MjU2MjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    reviewCount: 89,
    accessibilityFeatures: ["자동문", "넓은 좌석 간격", "높이 조절 테이블", "수어 가능 직원", "시각장애인 안내견 동반"],
    description: "모든 사람이 편안하게 이용할 수 있도록 설계된 유니버설 디자인 카페입니다. 수어 가능 직원이 상주하며 시각장애인 안내견 동반이 가능합니다.",
    hours: "10:00 - 22:00",
    priceRange: "₩₩",
    contact: "02-1234-5678",
    reviews: [
      {
        id: "r4",
        userName: "최서희",
        rating: 5,
        date: "2026-03-18",
        comment: "청각장애가 있는데 수어로 주문할 수 있어서 정말 편했어요. 태블릿 주문 시스템도 있어서 좋습니다. 커피 맛도 훌륭해요!",
        accessibilityType: "청각장애",
        helpfulCount: 52
      },
      {
        id: "r5",
        userName: "정우진",
        rating: 4,
        date: "2026-03-12",
        comment: "휠체어 사용자인데 테이블 높이가 딱 맞아서 편하게 이용했습니다. 화장실도 넓고 손잡이가 잘 되어 있어요.",
        accessibilityType: "지체장애",
        helpfulCount: 41
      },
      {
        id: "r6",
        userName: "강민아",
        rating: 5,
        date: "2026-03-08",
        comment: "안내견과 함께 갔는데 전혀 눈치 보지 않고 편하게 이용했어요. 직원분들도 안내견 응대에 익숙하셔서 좋았습니다.",
        accessibilityType: "시각장애",
        helpfulCount: 37
      }
    ]
  },
  {
    id: "3",
    name: "오션 액세스 레스토랑",
    location: "부산 해운대구",
    category: "이탈리안",
    imageUrl: "https://images.unsplash.com/photo-1770993023043-c7a9c7e7ca9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBmcmllbmRseSUyMGNhZmUlMjB0ZXJyYWNlfGVufDF8fHx8MTc3NDI1NjI1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviewCount: 156,
    accessibilityFeatures: ["해변 접근 경사로", "장애인 전용 주차", "음성 안내 시스템", "촉각 지도", "이동식 램프"],
    description: "해운대 해변을 바로 이용할 수 있는 완전 무장애 레스토랑입니다. 휠체어로 해변까지 접근 가능한 특수 경사로를 갖추고 있습니다.",
    hours: "12:00 - 23:00",
    priceRange: "₩₩₩₩",
    contact: "051-789-0123",
    reviews: [
      {
        id: "r7",
        userName: "윤지호",
        rating: 5,
        date: "2026-03-20",
        comment: "휠체어로 해변까지 갈 수 있는 경사로가 정말 감동이었어요. 부산 여행 중 가장 기억에 남는 곳입니다. 음식도 훌륭해요!",
        accessibilityType: "지체장애",
        helpfulCount: 68
      },
      {
        id: "r8",
        userName: "송미경",
        rating: 5,
        date: "2026-03-16",
        comment: "발레파킹 서비스가 있어서 주차 걱정 없이 이용했습니다. 직원분들이 휠체어 이동을 적극 도와주셔서 편했어요.",
        accessibilityType: "지체장애",
        helpfulCount: 55
      },
      {
        id: "r9",
        userName: "한동훈",
        rating: 4,
        date: "2026-03-11",
        comment: "음성 안내 시스템이 잘 되어 있어서 시각장애인도 편하게 이용할 수 있습니다. 예약 시 미리 말씀드리면 더 좋은 서비스를 받으실 수 있어요.",
        accessibilityType: "시각장애",
        helpfulCount: 43
      }
    ]
  },
  {
    id: "4",
    name: "배리어프리 브런치 하우스",
    location: "강원도 춘천시",
    category: "브런치 카페",
    imageUrl: "https://images.unsplash.com/photo-1577272410899-624637634e7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGRvZyUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc0MjU2MjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviewCount: 203,
    accessibilityFeatures: ["완전 평지 구조", "전동 휠체어 충전소", "높낮이 조절 세면대", "점자 블록", "수유실"],
    description: "춘천 호숫가에 위치한 완전 무장애 브런치 카페입니다. 전동 휠체어 충전 시설과 다양한 편의시설을 갖추고 있습니다.",
    hours: "09:00 - 20:00",
    priceRange: "₩₩",
    contact: "033-456-7890",
    reviews: [
      {
        id: "r10",
        userName: "임채원",
        rating: 5,
        date: "2026-03-21",
        comment: "전동 휠체어 배터리가 부족했는데 충전소가 있어서 정말 다행이었어요. 브런치도 맛있고 분위기도 좋습니다!",
        accessibilityType: "지체장애",
        helpfulCount: 71
      },
      {
        id: "r11",
        userName: "오세진",
        rating: 5,
        date: "2026-03-17",
        comment: "입구부터 테이블, 화장실까지 완전 평지라 이동이 너무 편했어요. 춘천 여행 갈 때마다 들르는 곳입니다.",
        accessibilityType: "지체장애",
        helpfulCount: 64
      },
      {
        id: "r12",
        userName: "배수지",
        rating: 5,
        date: "2026-03-13",
        comment: "아이 유모차와 함께 갔는데 턱이 전혀 없어서 정말 편했어요. 수유실도 깨끗하게 관리되어 있습니다.",
        accessibilityType: "일반",
        helpfulCount: 58
      }
    ]
  },
  {
    id: "5",
    name: "리버사이드 유니버설 카페",
    location: "경기도 양평군",
    category: "카페",
    imageUrl: "https://images.unsplash.com/photo-1664547654523-24e8a9121988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc3RhdXJhbnQlMjBvdXRkb29yJTIwc2VhdGluZ3xlbnwxfHx8fDE3NzQyNTYyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    reviewCount: 98,
    accessibilityFeatures: ["강변 접근로", "장애인 화장실", "점자 안내판", "보조기구 대여", "의료 지원 가능"],
    description: "남한강이 내려다보이는 힐링 카페입니다. 휠체어와 보행 보조기구 무료 대여 서비스를 제공합니다.",
    hours: "09:00 - 19:00",
    priceRange: "₩₩₩",
    contact: "031-234-5678",
    reviews: [
      {
        id: "r13",
        userName: "서유진",
        rating: 5,
        date: "2026-03-19",
        comment: "보행이 불편한 어머니를 모시고 갔는데 휠체어 대여 서비스가 있어서 정말 좋았어요. 강변 산책로도 무장애로 조성되어 있습니다.",
        accessibilityType: "일반",
        helpfulCount: 49
      },
      {
        id: "r14",
        userName: "나현우",
        rating: 4,
        date: "2026-03-14",
        comment: "주차장에서 카페까지 경사로가 잘 되어 있고, 강변까지 휠체어로 이동 가능해요. 자연을 만끽할 수 있는 좋은 곳입니다.",
        accessibilityType: "지체장애",
        helpfulCount: 42
      },
      {
        id: "r15",
        userName: "홍다은",
        rating: 4,
        date: "2026-03-09",
        comment: "점자 안내판이 있어서 시각장애인도 편하게 이용할 수 있어요. 직원분들도 친절하시고 음료도 맛있습니다.",
        accessibilityType: "시각장애",
        helpfulCount: 38
      }
    ]
  },
  {
    id: "6",
    name: "유니버설 한옥 레스토랑",
    location: "경북 경주시",
    category: "한식당",
    imageUrl: "https://images.unsplash.com/photo-1754494590589-0d5ba1aed922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhZmUlMjB0ZXJyYWNlfGVufDF8fHx8MTc3NDI1NjI1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviewCount: 134,
    accessibilityFeatures: ["한옥 무장애 개조", "이동식 경사로", "좌식 리프트", "외국어 점자 메뉴", "저시력자 조명"],
    description: "경주 토함산 자락의 전통 한옥을 무장애로 개조한 레스토랑입니다. 한국 전통 문화를 모두가 경험할 수 있도록 배려했습니다.",
    hours: "10:00 - 21:00",
    priceRange: "₩₩₩",
    contact: "054-567-8901",
    reviews: [
      {
        id: "r16",
        userName: "권민석",
        rating: 5,
        date: "2026-03-22",
        comment: "한옥인데도 휠체어 접근이 완벽해요! 좌식 리프트로 좌식 테이블도 이용할 수 있어서 전통 문화를 제대로 경험했습니다.",
        accessibilityType: "지체장애",
        helpfulCount: 79
      },
      {
        id: "r17",
        userName: "유정아",
        rating: 5,
        date: "2026-03-18",
        comment: "외국인 시각장애인 친구와 함께 갔는데 영어 점자 메뉴가 있어서 놀랐어요. 음식도 정갈하고 맛있습니다.",
        accessibilityType: "시각장애",
        helpfulCount: 65
      },
      {
        id: "r18",
        userName: "안준영",
        rating: 4,
        date: "2026-03-15",
        comment: "저시력자인데 조명이 적절해서 메뉴판을 읽기 편했어요. 한옥의 운치를 느끼면서도 편안하게 식사할 수 있었습니다.",
        accessibilityType: "시각장애",
        helpfulCount: 56
      }
    ]
  }
];
