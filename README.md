  # 배포관련
  - [개발 테스트 링크](https://freeway-rho.vercel.app/)<br>
  - [배포용 레포](https://github.com/hoehoeabi/freeway)

  ---
  
  # 배리어플레이스

  This is a code bundle for 배리어플레이스. The original project is available at  <br> - [피그마 바로가기](https://www.figma.com/design/lkY5TVfA6KbzgtrZ3NoDfH/%EB%B0%B0%EB%A6%AC%EC%96%B4%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4.)

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  Run `npx ts-node scripts/upload-data.ts` to call data from api and load to supabase

---

### 💡 협업 가이드 (팀원 참고용)
- **상수 사용**: 지역 코드나 콘텐츠 타입은 `src/constants/api-codes.ts`에 정의된 객체를 사용해 주세요. (하드코딩 지양)
- **도메인 추가**: 새로운 기능이 생기면 `src/features/` 아래에 새로운 폴더를 생성하고 `components`, `hooks`, `services` 계층을 나눠서 작성합니다.
- **데이터 확인**: 모든 장소 데이터는 Supabase의 `places` 테이블에 공공 API 데이터가 이미 가공되어 들어있습니다. <br> scripts/upload-data.ts를 실행하여 각 지역별 식당,관광지,숙박업소 등의 리스트를 부른뒤 <br> 그 각 가게들의 접근성 관련정보들을 추가적으로 부른 후 테이블 스키마에 맞게 객체를 만들어 디비에 적재합니다 <br> 개발용 계정은 하루 천건의 데이터만 뽑아낼 수 있기에 지역과 업소코드를 선택후 천개가 안넘게 조절해가며 데이터를 불렀습니다.


---

# 📂 프로젝트 구조 및 아키텍처 (Project Structure) 
본 프로젝트는 **관심사의 분리(SoC)**를 극대화하고, 백엔드의 계층형 아키텍처(Layered Architecture) 개념을 프론트엔드에 적용하여 도메인(Feature) 중심 구조로 설계되었습니다.

## 1. 설계 원칙
- 도메인 기반 분리 (Feature-based): auth, post, comment 등 비즈니스 로직별로 폴더를 격리하여 유지보수성을 높였습니다.

- 계층화 (Layering): UI(components), 로직(hooks), 데이터 처리(services)를 분리하여 각 코드의 역할을 명확히 했습니다.

- 스크립트 격리: DB 적재용 스크립트(scripts/)를 런타임 코드(src/)와 분리하여 배포 최적화를 고려했습니다.

## 2. 폴더 트리

### App/component/facility : 각 가게의 상세피이지
### App/component/facility/review : 각 가게의 상세페이지에 달린 리뷰
### App/component/post : 사용자들이 사용하는 자유게시판 
### App/component/auth : 로그인 회원가입 마이페이지 등 사용자 정보들을 보여주는 화면에 쓰이는 컴포넌트들
```
src/
├── main.tsx                                     # 앱 진입점, React 마운트
├── vite-env.d.ts                                # Vite 환경변수 타입 선언
├── database.types.ts                            # Supabase DB 스키마 타입 자동생성
├── types.ts                                     # 공통 타입 정의 (UseMutationCallback 등)
│
├── assets/
│   └── default-avatar.png                       # 기본 프로필 이미지
│
├── constants/
│   └── api-codes.ts                             # 관광 API 코드 상수 (ContentType, AreaCode 등)
│
├── styles/
│   ├── index.css                                # 전역 CSS 진입점
│   ├── tailwind.css                             # Tailwind 지시어
│   ├── fonts.css                                # 폰트 설정
│   └── theme.css                                # 다크모드 테마 변수
│
├── lib/
│   ├── utils.ts                                 # shadcn/ui 유틸 (cn 함수)
│   └── time.ts                                  # 시간 포맷 유틸 (formatTimeAgo) 
│
├── store/
│   ├── alert-modal.ts                           # 알림 모달 전역 상태 (Zustand)
│   └── post-editor-modal.ts                     # 게시글 에디터 모달 전역 상태
│
├── provider/
│   └── modal-provider.tsx                       # 전역 모달 렌더링 프로바이더
│
├── supabase/
│   ├── supabase.ts                              # Supabase 클라이언트 초기화
│   └── query/
│       ├── place/
│       │   └── bookmark.ts                      # 북마크 CRUD 쿼리 
│       └── post/
│           ├── post.ts                          # 게시글 CRUD 쿼리
│           ├── post-comments.ts                 # 댓글 CRUD 쿼리 
│           └── post-images.ts                   # 게시글 이미지 업로드 
│
├── hooks/
│   ├── place/                                   # 장소 관련 커스텀 훅 
│   │   ├── useBookmark.ts                       # 북마크 추가/삭제/조회
│   │   ├── useFacilityDetail.ts                 # 시설 상세 정보 조회
│   │   ├── useFacilityMeta.ts                   # 시설 메타 정보 (카테고리, 보조장비 등)
│   │   ├── usePlaces.ts                         # 장소 목록 조회 + 필터링
│   │   └── useReviews.ts                        # 리뷰 목록/작성/수정/삭제
│   ├── queries/
│   │   ├── query-keys.ts                        # React Query 키 상수
│   │   ├── use-post-data.ts                     # 게시글 단건 조회
│   │   ├── use-posts-data.ts                    # 게시글 목록 조회
│   │   ├── use-comments-data.ts                 # 댓글 목록 조회
│   │   └── use-user-nickname.ts                 # 유저 닉네임 조회
│   └── mutations/
│       └── post/
│           ├── use-create-post.ts               # 게시글 생성
│           ├── use-delete-post.ts               # 게시글 삭제
│           ├── use-update-post.ts               # 게시글 수정
│           ├── use-toggle-post-like.ts          # 좋아요 토글 (낙관적 업데이트)
│           └── comment/
│               ├── use-create-comment.ts        # 댓글 생성
│               ├── use-delete-comment.ts        # 댓글 삭제
│               └── use-update-comment.ts        # 댓글 수정
│
└── app/
    ├── App.tsx                                  # 앱 루트 컴포넌트 (QueryClient, RouterProvider)
    ├── routes.tsx                               # React Router 라우트 정의
    ├── contexts/
    │   └── AuthContext.tsx                      # 인증 전역 상태 (로그인/로그아웃/유저 정보)
    ├── services/
    │   ├── auth.ts                              # 인증 서비스 (Supabase Auth 래핑)
    │   ├── user.ts                              # 유저 프로필 서비스
    │   └── reviews.ts                           # 리뷰 서비스 (reviewsService)
    ├── ui2/                                     # 커스텀 확장 UI 컴포넌트
    │   ├── button2.tsx                          # 커스텀 버튼
    │   ├── carousel2.tsx                        # 커스텀 캐러셀
    │   ├── dialog2.tsx                          # 커스텀 다이얼로그
    │   ├── input.tsx                            # 커스텀 인풋
    │   ├── popover.tsx                          # 커스텀 팝오버
    │   └── textarea.tsx                         # 커스텀 텍스트에어리어
    └── components/
        ├── auth/                                # 인증 관련 ← 루트에서 이동
        │   ├── Login.tsx                        # 로그인 UI (다크모드 적용)
        │   ├── LoginWrapper.tsx                 # 로그인 페이지 래퍼 (비로그인 전용 가드)
        │   ├── Register.tsx                     # 회원가입 UI (다크모드 적용)
        │   └── RegisterWrapper.tsx              # 회원가입 페이지 래퍼
        ├── common/                              # 공통 레이아웃/유틸 
        │   ├── Root.tsx                         # 레이아웃 루트 (Header + Outlet)
        │   ├── Header.tsx                       # 상단 네비게이션 바
        │   ├── NotFound.tsx                     # 404 페이지
        │   ├── ErrorFallback.tsx                # 에러 발생 시 대체 UI 
        │   ├── LoadingSpinner.tsx               # 로딩 스피너 
        │   ├── ImageWithFallback.tsx            # 이미지 로드 실패 시 대체 표시 
        │   └── header/
        │       └── theme-button.tsx             # 다크/라이트 모드 토글 버튼
        ├── home/                                # 메인 페이지 ← 루트에서 이동
        │   └── Home.tsx                         # 장소 목록, 검색, 필터, 북마크
        ├── place/                               # 장소 상세 
        │   ├── FacilityDetail.tsx               # 시설 상세 페이지
        │   └── review/
        │       ├── ReviewList.tsx               # 리뷰 목록
        │       ├── ReviewItem.tsx               # 리뷰 단건 카드
        │       ├── ReviewForm.tsx               # 리뷰 작성 폼
        │       ├── ReviewAverages.tsx           # 리뷰 평점 요약
        │       └── StarRatingInput.tsx          # 별점 입력 컴포넌트
        ├── post/                                # 커뮤니티 게시글
        │   ├── PostListPage.tsx                 # 게시글 목록 페이지
        │   ├── PostDetailPage.tsx               # 게시글 상세 페이지
        │   ├── post-feed.tsx                    # 게시글 피드 (목록 렌더링)
        │   ├── post-item.tsx                    # 게시글 단건 카드
        │   ├── create-post-button.tsx           # 게시글 작성 버튼
        │   ├── delete-post-button.tsx           # 게시글 삭제 버튼
        │   ├── edit-post-button.tsx             # 게시글 수정 버튼
        │   ├── like-post-button.tsx             # 좋아요 버튼
        │   └── comment/
        │       ├── comment-editor.tsx           # 댓글 작성 에디터
        │       ├── comment-item.tsx             # 댓글 단건
        │       └── comment-list.tsx             # 댓글 목록
        ├── user/                                # 마이페이지 ← 루트에서 이동
        │   ├── MyPage.tsx                       # 마이페이지 (프로필/통계, 다크모드 적용)
        │   ├── Bookmark.tsx                     # 북마크 목록 (다크모드 적용) 
        │   ├── ReviewPage.tsx                   # 내 리뷰 목록 (다크모드 적용)
        │   └── UserNickname.tsx                 # 유저 닉네임 표시 컴포넌트
        ├── modal/
        │   ├── alert-modal.tsx                  # 확인/취소 알림 모달
        │   └── post-editor-modal.tsx            # 게시글 작성/수정 모달
        └── ui/                                  # shadcn/ui 기본 컴포넌트
            ├── accordion.tsx
            ├── alert-dialog.tsx
            ├── alert.tsx
            ├── aspect-ratio.tsx
            ├── avatar.tsx
            ├── badge.tsx
            ├── breadcrumb.tsx
            ├── button1.tsx
            ├── calendar.tsx
            ├── card.tsx
            ├── carousel1.tsx
            ├── chart.tsx
            ├── checkbox.tsx
            ├── collapsible.tsx
            ├── command.tsx
            ├── context-menu.tsx
            ├── dialog.tsx
            ├── drawer.tsx
            ├── dropdown-menu.tsx
            ├── form.tsx
            ├── hover-card.tsx
            ├── input-otp.tsx
            ├── input.tsx
            ├── label.tsx
            ├── menubar.tsx
            ├── navigation-menu.tsx
            ├── pagination.tsx
            ├── popover.tsx
            ├── progress.tsx
            ├── radio-group.tsx
            ├── resizable.tsx
            ├── scroll-area.tsx
            ├── select.tsx
            ├── separator.tsx
            ├── sheet.tsx
            ├── sidebar.tsx
            ├── skeleton.tsx
            ├── slider.tsx
            ├── sonner.tsx
            ├── switch.tsx
            ├── table.tsx
            ├── tabs.tsx
            ├── textarea.tsx
            ├── toggle-group.tsx
            ├── toggle.tsx
            ├── tooltip.tsx
            ├── use-mobile.ts
            └── utils.ts

```

---
