  # 배포관련
  - [개발 테스트 링크](https://freeway-chi.vercel.app/)<br>
  - [배포용 레포](https://github.com/hoehoeabi/freeway/tree/develop)

  ---
  
  # 배리어플레이스

  This is a code bundle for 배리어플레이스. The original project is available at https://www.figma.com/design/lkY5TVfA6KbzgtrZ3NoDfH/%EB%B0%B0%EB%A6%AC%EC%96%B4%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4.

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
```
 src/
├── app/
│   ├── components/
│   │   ├── comment/                          # 댓글 관련 컴포넌트
│   │   │   ├── comment-editor.tsx            # 댓글 작성/수정 에디터
│   │   │   ├── comment-item.tsx              # 댓글 단일 아이템
│   │   │   └── comment-list.tsx              # 댓글 목록
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx         # 이미지 로드 실패 시 대체 이미지 표시
│   │   ├── modal/
│   │   │   ├── alert-modal.tsx               # 확인/취소 알림 모달
│   │   │   └── post-editor-modal.tsx         # 게시글 작성/수정 모달
│   │   ├── post/                             # 게시글 관련 컴포넌트
│   │   │   ├── create-post-button.tsx        # 게시글 작성 버튼
│   │   │   ├── delete-post-button.tsx        # 게시글 삭제 버튼
│   │   │   ├── edit-post-button.tsx          # 게시글 수정 버튼
│   │   │   ├── like-post-button.tsx          # 게시글 좋아요 버튼
│   │   │   ├── post-feed.tsx                 # 게시글 목록 피드
│   │   │   └── post-item.tsx                 # 게시글 단일 아이템
│   │   ├── ui/                               # shadcn/ui 기본 UI 컴포넌트
│   │   ├── Community.tsx                     # 자유게시판 페이지
│   │   ├── FacilityDetail.tsx                # 시설 상세 페이지
│   │   ├── Header.tsx                        # 상단 네비게이션 바
│   │   ├── Home.tsx                          # 메인 홈 페이지
│   │   ├── Login.tsx                         # 로그인 폼
│   │   ├── LoginWrapper.tsx                  # 로그인 페이지 래퍼
│   │   ├── MyPage.tsx                        # 마이페이지 (프로필 수정)
│   │   ├── NotFound.tsx                      # 404 페이지
│   │   ├── PostDetailPage.tsx                # 게시글 상세 페이지
│   │   ├── Register.tsx                      # 회원가입 폼
│   │   ├── RegisterWrapper.tsx               # 회원가입 페이지 래퍼
│   │   ├── Root.tsx                          # 앱 루트 레이아웃 (Provider 묶음)
│   │   ├── fallback.tsx                      # 에러 발생 시 폴백 UI
│   │   └── loader.tsx                        # 로딩 스피너
│   ├── contexts/
│   │   └── AuthContext.tsx                   # 로그인/로그아웃/회원가입 전역 상태
│   ├── data/
│   │   └── facilities.tsx                    # 시설 정적 데이터
│   ├── services/
│   │   ├── auth.ts                           # Supabase 인증 API (로그인/회원가입/프로필)
│   │   ├── reviews.ts                        # 리뷰 관련 API
│   │   └── user.ts                           # 유저 정보 관련 API
│   ├── util/
│   │   └── time.ts                           # 날짜/시간 포맷 유틸
│   └── routes.tsx                            # 라우트 정의
├── constants/
│   └── api-codes.ts                          # API 열거형 상수
├── hooks/
│   ├── mutations/                            # 데이터 변경 훅 (CUD)
│   │   ├── comment/
│   │   │   ├── use-create-comment.ts         # 댓글 생성
│   │   │   ├── use-delete-comment.ts         # 댓글 삭제
│   │   │   └── use-update-comment.ts         # 댓글 수정
│   │   └── post/
│   │       ├── use-create-post.ts            # 게시글 생성
│   │       ├── use-delete-post.ts            # 게시글 삭제
│   │       ├── use-toggle-post-like.ts       # 게시글 좋아요 토글
│   │       └── use-update-post.ts            # 게시글 수정
│   ├── queries/                              # 데이터 조회 훅 (R)
│   │   ├── query-keys.ts                     # React Query 키 관리
│   │   ├── use-comments-data.ts              # 댓글 목록 조회
│   │   ├── use-post-data.ts                  # 게시글 단건 조회
│   │   ├── use-posts-data.ts                 # 게시글 목록 조회
│   │   └── use-user-nickname.ts              # 유저 닉네임 조회
│   ├── useFacilityDetail.ts                  # 장소 상세정보 조회 훅
│   ├── useFacilityMeta.ts                    # 장소 종류 조회 훅
│   ├── useBookmark                           # 장소 상세정보 내부 북마크 기능 훅
│   ├── usePlaces.ts                          # 장소 데이터 조회 훅
│   └── useReviews.ts                         # 리뷰 데이터 조회 훅
├── provider/
│   └── modal-provider.tsx                    # 모달 전역 Provider
├── store/
│   ├── alert-modal.ts                        # 알림 모달 Zustand 상태
│   └── post-editor-modal.ts                  # 게시글 에디터 모달 Zustand 상태
├── styles/
│   ├── fonts.css                             # 폰트 정의
│   ├── index.css                             # 글로벌 스타일
│   ├── tailwind.css                          # Tailwind 설정
│   └── theme.css                             # 테마 변수
├── supabase/
│   ├── query/
│   │   ├── post-comments.ts                  # 댓글 Supabase 쿼리
│   │   ├── post-images.ts                    # 게시글 이미지 Supabase 쿼리
│   │   └── post.ts                           # 게시글 Supabase 쿼리
│   └── supabase.ts                           # Supabase 클라이언트 초기화
├── database.types.ts                         # Supabase DB 타입 정의
├── main.tsx                                  # 앱 진입점
└── types.ts                                  # 공통 타입 정의

```

---
