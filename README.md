# ShopTS

React + TypeScript 기반 쇼핑몰 포트폴리오 프로젝트입니다.
실무에서 자주 쓰이는 패턴(서버 상태 관리, 폼 검증, 역할 기반 인증, 관리자 페이지)을 직접 구현했습니다.

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| UI | React 18, TypeScript 5 |
| 번들러 | Vite 5 |
| 라우팅 | React Router v6 |
| 서버 상태 | TanStack Query v5 |
| 클라이언트 상태 | Zustand (persist) |
| 폼 / 유효성 검사 | React Hook Form + Zod |
| HTTP | Axios |
| 스타일 | CSS Modules |
| Mock API | JSON Server |

---

## 주요 기능

### 사용자
- 상품 목록 조회, 카테고리 필터, 가격/최신 정렬, 검색 (debounce)
- 상품 상세 페이지, 수량 선택, 장바구니 담기
- 장바구니 수량 조절 / 삭제 / 금액 계산
- 배송지 입력 및 주문 완료
- 찜하기 (위시리스트) — 낙관적 UI 적용
- 상품 리뷰 작성 / 조회

### 인증
- 이메일 + 비밀번호 로그인 / 회원가입
- 로그인 상태 유지 (localStorage persist)
- 사용자별 독립 장바구니

### 관리자 (`/admin`)
- 상품 CRUD (추가 / 수정 / 삭제)
- 주문 목록 조회

---

## 구현 포인트

- **역할 기반 라우트 보호** — `ProtectedRoute` (로그인 필수) / `AdminRoute` (관리자 전용)
- **서버 상태와 클라이언트 상태 분리** — TanStack Query (API 데이터) / Zustand (장바구니, 인증)
- **낙관적 UI** — 위시리스트 토글 시 서버 응답 전에 UI 먼저 반영
- **전역 에러 처리** — `ErrorBoundary`로 예상치 못한 런타임 에러 캐치
- **폼 유효성 검사** — Zod 스키마를 React Hook Form에 연결, 배송지 / 로그인 / 회원가입 폼 적용
- **로딩 스켈레톤 UI** — 상품 목록 초기 로딩 시 Skeleton 컴포넌트 표시

---

## 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/{username}/react-cart.git
cd react-cart

# 2. 패키지 설치
npm install

# 3. 환경변수 설정
cp .env.example .env

# 4. 개발 서버 + API 서버 동시 실행
npm run dev:all
```

- 프론트엔드: http://localhost:5173
- API 서버: http://localhost:3001

---

## 테스트 계정

| 구분 | 이메일 | 비밀번호 |
|---|---|---|
| 일반 유저 | test@test.com | test1234 |
| 관리자 | admin@test.com | admin1234 |

---

## 프로젝트 구조

```
src/
├── api/           # Axios 기반 API 함수 (서버 통신 레이어)
├── components/
│   ├── common/    # 공통 컴포넌트 (Button, Input, Modal 등)
│   ├── features/  # 도메인별 컴포넌트 (product, cart, review 등)
│   └── layout/    # 레이아웃 컴포넌트 (Header, Footer, 라우트 보호)
├── hooks/         # TanStack Query 기반 커스텀 훅
├── pages/         # 페이지 컴포넌트
│   └── admin/     # 관리자 페이지
├── store/         # Zustand 스토어 (auth, cart, wishlist)
├── types/         # TypeScript 타입 정의
└── utils/         # 유틸 함수 및 Zod 스키마
```

---

## 페이지 구성

| 경로 | 페이지 | 접근 |
|---|---|---|
| `/` | 상품 목록 | 공개 |
| `/products/:id` | 상품 상세 | 공개 |
| `/login` | 로그인 | 공개 |
| `/register` | 회원가입 | 공개 |
| `/cart` | 장바구니 | 로그인 필요 |
| `/checkout` | 결제 | 로그인 필요 |
| `/order-complete` | 주문 완료 | 로그인 필요 |
| `/wishlist` | 찜하기 | 로그인 필요 |
| `/admin/products` | 상품 관리 | 관리자 전용 |
| `/admin/orders` | 주문 관리 | 관리자 전용 |
