# 🚀 Freeway (AIBE6 Project1 - Dujjonco)
Figma AI 기반의 컴포넌트 설계와 Supabase를 활용한 커뮤니티 플랫폼

---

# 🌟 Project Overview
"Freeway는 공공api로부터 접근성이 좋은 시설 정보를 공유하고, 사용자들의 리뷰와 커뮤니티를 통해 더 나은 장소 경험을 제공하는 서비스입니다."

---

🛠 Tech Stack
Frontend
Core:

Styling:

State Management:

Backend & Database
Backend as a Service: supabase


---

# ✨ Key Features
Figma AI 기반 UI 구현: Figma AI 설계를 리액트 컴포넌트로 변환 및 고도화하여 정밀한 UI 구현.

Supabase 인증 시스템: Email 로그인을 포함한 안전한 사용자 인증 관리.

실시간 커뮤니티: 유저 간 게시글 작성, 댓글, 좋아요 기능 제공 (React Query 활용 최적화).

시설 리뷰 시스템: 별점 및 리뷰 등록 기능을 통한 장소 데이터 시각화.

다크 모드 지원: next-themes를 활용한 사용자 맞춤형 테마 제공.

---

# 🗄 Database Schema
프로젝트는 Public 스키마와 Auth 스키마를 분리하여 관리합니다.

auth.users: 기본 인증 정보 관리.

public.profiles: 사용자의 닉네임, 아바타 등 추가 프로필 정보 (Trigger를 통한 자동 연동).

public.posts: 커뮤니티 게시글 및 메타데이터.

public.reviews: 시설별 사용자 평점 및 리뷰 데이터.

---

# 🚀 Installation & Setup
- Repository Clone
```
git clone https://github.com/prgrms-aibe-devcourse/AIBE6_Project1_Dujjonco.git
```
- Dependency Install

```
npm install
```

- Environment Variables
.env 파일을 루트 디렉토리에 생성하고 아래 정보를 입력하세요.

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
- Run Development Server

```
npm run dev
```

- to call data from api and load to supabase
```
npx ts-node scripts/upload-data.ts
```

---
  
  # 배포관련
  - [개발 테스트 링크](https://freeway-rho.vercel.app/)<br>
  - [배포용 레포](https://github.com/hoehoeabi/freeway)

  ---
  
  # FreeWay

  This is a code bundle for FreeWay. The original project is available at  <br> - [피그마 바로가기](https://www.figma.com/design/lkY5TVfA6KbzgtrZ3NoDfH/%EB%B0%B0%EB%A6%AC%EC%96%B4%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4.)

---

# 💡 협업 가이드 (팀원 참고용)
- **상수 사용**: 지역 코드나 콘텐츠 타입은 `src/constants/api-codes.ts`에 정의된 객체를 사용해 주세요. (하드코딩 지양)
- **도메인 추가**: 새로운 기능이 생기면 `src/features/` 아래에 새로운 폴더를 생성하고 `components`, `hooks`, `services` 계층을 나눠서 작성합니다.
- **데이터 확인**: 모든 장소 데이터는 Supabase의 `places` 테이블에 공공 API 데이터가 이미 가공되어 들어있습니다. <br> scripts/upload-data.ts를 실행하여 각 지역별 식당,관광지,숙박업소 등의 리스트를 부른뒤 <br> 그 각 가게들의 접근성 관련정보들을 추가적으로 부른 후 테이블 스키마에 맞게 객체를 만들어 디비에 적재합니다 <br> 개발용 계정은 하루 천건의 데이터만 뽑아낼 수 있기에 지역과 업소코드를 선택후 천개가 안넘게 조절해가며 데이터를 불렀습니다.


---



# 📂 Project Structure

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
