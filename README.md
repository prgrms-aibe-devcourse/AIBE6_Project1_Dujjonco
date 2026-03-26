
  # 배리어플레이스

  This is a code bundle for 배리어플레이스. The original project is available at https://www.figma.com/design/lkY5TVfA6KbzgtrZ3NoDfH/%EB%B0%B0%EB%A6%AC%EC%96%B4%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  Run `npx ts-node scripts/upload-data.ts` to call data from api and load to supabase

---

### 💡 협업 가이드 (팀원 참고용)(아직 미정 협의 필요)
- **상수 사용**: 지역 코드나 콘텐츠 타입은 `src/constants/api-codes.ts`에 정의된 객체를 사용해 주세요. (하드코딩 지양)
- **도메인 추가**: 새로운 기능이 생기면 `src/features/` 아래에 새로운 폴더를 생성하고 `components`, `hooks`, `services` 계층을 나눠서 작성합니다.
- **데이터 확인**: 모든 장소 데이터는 Supabase의 `places` 테이블에 공공 API 데이터가 이미 가공되어 들어있습니다.


---

# 📂 프로젝트 구조 및 아키텍처 (Project Structure) (아직 미정 협의 필요)
본 프로젝트는 **관심사의 분리(SoC)**를 극대화하고, 백엔드의 계층형 아키텍처(Layered Architecture) 개념을 프론트엔드에 적용하여 도메인(Feature) 중심 구조로 설계되었습니다.

## 1. 설계 원칙
- 도메인 기반 분리 (Feature-based): auth, post, comment 등 비즈니스 로직별로 폴더를 격리하여 유지보수성을 높였습니다.

- 계층화 (Layering): UI(components), 로직(hooks), 데이터 처리(services)를 분리하여 각 코드의 역할을 명확히 했습니다.

- 스크립트 격리: DB 적재용 스크립트(scripts/)를 런타임 코드(src/)와 분리하여 배포 최적화를 고려했습니다.

## 2. 폴더 트리(아직 미정 협의 필요)
```
  root/
├── .env                        # API 키 (DATA_API_KEY), Supabase 설정값
├── .gitignore                  # node_modules, .env 등 제외
├── package.json                # scripts에 "data:upload": "tsx scripts/upload-data.ts" 추가
├── tsconfig.json               # TypeScript 설정
├── scripts/                    # [관리자 전용] 데이터 관련 스크립트
│   └── upload-data.ts          # 공공 API -> Supabase 데이터 적재 스크립트
└── src/
    ├── api/                    # Supabase Client 설정 및 공통 API 인스턴스
    │   └── supabase.ts
    ├── assets/                 # 이미지, 로고, 전역 CSS (index.css)
    ├── constants/              # [중요] 전역 상수 및 설정
    │   └── api-codes.ts        # 지역코드, 콘텐츠타입, 배리어프리 아이콘 설정
    ├── components/             # [공통 UI] 프로젝트 어디서든 쓰이는 순수 컴포넌트
    │   ├── common/             # Button, Input, Modal, LoadingSpinner
    │   └── layout/             # Header, Footer, Sidebar, LayoutContainer
    ├── constants/              # [설정값] 변경되지 않는 고정 데이터
    │   └── api-codes.ts        # AreaCode, ContentType, BARRIER_ICONS 등
    ├── features/               # [도메인 중심] 핵심 비즈니스 로직 (백엔드 도메인과 대응)
    │   ├── auth/               # 인증 도메인
    │   │   ├── components/     # LoginForm, SignupForm
    │   │   ├── hooks/          # useAuth, useUser
    │   │   └── services/       # login, logout API 함수
    │   ├── comment/            # 댓글 서비스 도메인
    │   │   ├── components/     # 
    │   │   ├── hooks/          # 
    │   └── post/               # 자유게시판 도메인
    │       ├── components/     # 
    │       ├── hooks/          # 
    ├── hooks/                  # [전역 훅] 도메인에 종속되지 않는 공통 훅 (useLocalStorage 등)
    ├── pages/                  # [라우팅] 실제 URL 페이지 컴포넌트
    │   ├── Home.tsx            # 메인 페이지 (features/post 등 조합)
    │   ├── PlaceDetail.tsx     # 상세 페이지
    │   └── Login.tsx
    ├── types/                  # [전역 타입]
    │   └── database.types.ts   # Supabase CLI로 추출한 DB 스키마 타입
    └── utils/                  # [전역 유틸] 날짜 포맷, 문자열 조작 등 순수 함수
```

---
