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
src
├── App.css
├── App.tsx
├── app
│   ├── App.tsx
│   ├── components
│   │   ├── Community.tsx
│   │   ├── FacilityDetail.tsx
│   │   ├── Header.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── LoginWrapper.tsx
│   │   ├── MyPage.tsx
│   │   ├── NotFound.tsx
│   │   ├── PostDetailPage.tsx
│   │   ├── Register.tsx
│   │   ├── RegisterWrapper.tsx
│   │   ├── Root.tsx
│   │   ├── UserNickname.tsx
│   │   ├── bookmark.tsx
│   │   ├── comment
│   │   │   ├── comment-editor.tsx
│   │   │   ├── comment-item.tsx
│   │   │   └── comment-list.tsx
│   │   ├── fallback.tsx
│   │   ├── figma
│   │   │   └── ImageWithFallback.tsx
│   │   ├── header
│   │   │   └── theme-button.tsx
│   │   ├── loader.tsx
│   │   ├── modal
│   │   │   ├── alert-modal.tsx
│   │   │   └── post-editor-modal.tsx
│   │   ├── post
│   │   │   ├── create-post-button.tsx
│   │   │   ├── delete-post-button.tsx
│   │   │   ├── edit-post-button.tsx
│   │   │   ├── like-post-button.tsx
│   │   │   ├── post-feed.tsx
│   │   │   └── post-item.tsx
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button1.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel1.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       ├── tooltip.tsx
│   │       ├── use-mobile.ts
│   │       └── utils.ts
│   ├── contexts
│   │   └── AuthContext.tsx
│   ├── data
│   │   └── facilities.tsx
│   ├── features
│   │   └── posts
│   │       ├── components
│   │       ├── hooks
│   │       └── services
│   ├── lib
│   ├── page
│   ├── routes.tsx
│   ├── services
│   │   ├── auth.ts
│   │   ├── reviews.ts
│   │   └── user.ts
│   ├── ui2
│   │   ├── button2.tsx
│   │   ├── carousel2.tsx
│   │   ├── dialog2.tsx
│   │   ├── input.tsx
│   │   ├── popover.tsx
│   │   ├── sonner.tsx
│   │   └── textarea.tsx
│   └── util
│       └── time.ts
├── assets
│   └── default-avatar.png
├── constants
│   └── api-codes.ts
├── database.types.ts
├── hooks
│   ├── mutations
│   │   └── post
│   │       ├── comment
│   │       │   ├── use-create-comment.ts
│   │       │   ├── use-delete-comment.ts
│   │       │   └── use-update-comment.ts
│   │       ├── use-create-post.ts
│   │       ├── use-delete-post.ts
│   │       ├── use-toggle-post-like.ts
│   │       └── use-update-post.ts
│   ├── queries
│   │   ├── query-keys.ts
│   │   ├── use-comments-data.ts
│   │   ├── use-post-data.ts
│   │   ├── use-posts-data.ts
│   │   └── use-user-nickname.ts
│   ├── useBookmark.ts
│   ├── useFacilityDetail.ts
│   ├── useFacilityMeta.ts
│   ├── usePlaces.ts
│   └── useReviews.ts
├── index.css
├── lib
│   └── utils.ts
├── main.tsx
├── provider
│   └── modal-provider.tsx
├── store
│   ├── alert-modal.ts
│   └── post-editor-modal.ts
├── styles
│   ├── fonts.css
│   ├── index.css
│   ├── tailwind.css
│   └── theme.css
├── supabase
│   ├── query
│   │   ├── bookmark.ts
│   │   ├── post-comments.ts
│   │   ├── post-images.ts
│   │   ├── post.ts
│   │   └── review.ts
│   └── supabase.ts
├── types.ts
└── vite-env.d.ts

```

---
