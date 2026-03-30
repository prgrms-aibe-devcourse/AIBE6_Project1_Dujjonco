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
  
  # 프리웨이

  This is a code bundle for 배리어플레이스. The original project is available at  <br> - [피그마 바로가기](https://www.figma.com/design/lkY5TVfA6KbzgtrZ3NoDfH/%EB%B0%B0%EB%A6%AC%EC%96%B4%ED%94%8C%EB%A0%88%EC%9D%B4%EC%8A%A4.)

---

# 💡 협업 가이드 (팀원 참고용)
- **상수 사용**: 지역 코드나 콘텐츠 타입은 `src/constants/api-codes.ts`에 정의된 객체를 사용해 주세요. (하드코딩 지양)
- **도메인 추가**: 새로운 기능이 생기면 `src/features/` 아래에 새로운 폴더를 생성하고 `components`, `hooks`, `services` 계층을 나눠서 작성합니다.
- **데이터 확인**: 모든 장소 데이터는 Supabase의 `places` 테이블에 공공 API 데이터가 이미 가공되어 들어있습니다. <br> scripts/upload-data.ts를 실행하여 각 지역별 식당,관광지,숙박업소 등의 리스트를 부른뒤 <br> 그 각 가게들의 접근성 관련정보들을 추가적으로 부른 후 테이블 스키마에 맞게 객체를 만들어 디비에 적재합니다 <br> 개발용 계정은 하루 천건의 데이터만 뽑아낼 수 있기에 지역과 업소코드를 선택후 천개가 안넘게 조절해가며 데이터를 불렀습니다.


---



# 📂 Project Structure

```
src
├── app
│   ├── components      # 공통 및 페이지별 컴포넌트 (Home, Facility, Community 등)
│   ├── contexts        # AuthContext 등 전역 컨텍스트
│   ├── services        # API 호출 및 비즈니스 로직 (Auth, Review 등)
│   └── ui/ui2          # Reusable UI Components (Shadcn, Custom UI)
├── hooks               # Custom Hooks (Queries, Mutations, useBookmark 등)
├── lib                 # 공용 유틸리티 및 Supabase Client 설정
├── store               # Zustand를 활용한 전역 상태 관리
└── supabase            # SQL Query 정의 및 타입 정의 파일

```

---
