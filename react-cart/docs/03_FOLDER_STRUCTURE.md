# 03. 폴더 구조

## Phase 표시 기준
- 표시 없음 → **Phase 1에서 생성** (지금 만들 것)
- `[Phase 2]` → 찜하기/리뷰 단계에서 생성
- `[Phase 3]` → 관리자 페이지 단계에서 생성

> ⚠️ Phase 2, 3 표시 항목은 해당 단계 지시 전까지 생성하지 않는다.

---

## 전체 구조

```
shop-ts/
├── db.json
├── CLAUDE.md
├── docs/
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css                    # 전역 CSS 변수 + 리셋
    │
    ├── api/
    │   ├── client.ts                # axios 인스턴스
    │   ├── products.ts
    │   ├── orders.ts
    │   ├── wishlist.ts              # [Phase 2]
    │   └── reviews.ts               # [Phase 2]
    │
    ├── types/
    │   ├── product.ts
    │   ├── order.ts
    │   ├── wishlist.ts              # [Phase 2]
    │   ├── review.ts                # [Phase 2]
    │   └── admin.ts                 # [Phase 3]
    │
    ├── store/
    │   ├── cartStore.ts
    │   ├── toastStore.ts            # 토스트 알림 전역 상태 (UX 고도화)
    │   ├── loginModalStore.ts       # 로그인 필요 모달 상태 (UX 고도화)
    │   └── wishlistStore.ts         # [Phase 2]
    │
    ├── hooks/
    │   ├── useProducts.ts
    │   ├── useProduct.ts
    │   ├── useCreateOrder.ts
    │   ├── useDebounce.ts
    │   ├── useWishlist.ts           # [Phase 2]
    │   └── useReviews.ts            # [Phase 2]
    │
    ├── components/
    │   ├── common/
    │   │   ├── Button.tsx
    │   │   ├── Button.module.css
    │   │   ├── Input.tsx
    │   │   ├── Input.module.css
    │   │   ├── Badge.tsx
    │   │   ├── Badge.module.css
    │   │   ├── Spinner.tsx
    │   │   ├── Spinner.module.css
    │   │   ├── Skeleton.tsx
    │   │   ├── Skeleton.module.css
    │   │   ├── ErrorMessage.tsx
    │   │   ├── ErrorMessage.module.css
    │   │   ├── Modal.tsx            # [Phase 2]
    │   │   ├── Modal.module.css     # [Phase 2]
    │   │   ├── Toast.tsx            # 토스트 알림 (UX 고도화)
    │   │   ├── Toast.module.css
    │   │   ├── ProgressBar.tsx      # 페이지 전환 프로그레스 바 (UX 고도화)
    │   │   ├── ProgressBar.module.css
    │   │   ├── LoginRequiredModal.tsx     # 비로그인 시 모달 (UX 고도화)
    │   │   └── LoginRequiredModal.module.css
    │   │
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Header.module.css
    │   │   ├── Footer.tsx
    │   │   ├── Footer.module.css
    │   │   └── Layout.tsx
    │   │
    │   └── features/
    │       ├── product/
    │       │   ├── ProductCard.tsx
    │       │   ├── ProductCard.module.css
    │       │   ├── ProductGrid.tsx
    │       │   ├── ProductGrid.module.css
    │       │   ├── ProductFilter.tsx
    │       │   ├── ProductFilter.module.css
    │       │   ├── ProductSearch.tsx
    │       │   └── ProductSearch.module.css
    │       ├── cart/
    │       │   ├── CartItem.tsx
    │       │   ├── CartItem.module.css
    │       │   ├── CartSummary.tsx
    │       │   └── CartSummary.module.css
    │       ├── checkout/
    │       │   ├── CheckoutForm.tsx
    │       │   └── CheckoutForm.module.css
    │       ├── wishlist/            # [Phase 2]
    │       │   ├── WishlistButton.tsx
    │       │   └── WishlistButton.module.css
    │       └── review/              # [Phase 2]
    │           ├── ReviewList.tsx
    │           ├── ReviewList.module.css
    │           ├── ReviewForm.tsx
    │           └── ReviewForm.module.css
    │
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── HomePage.module.css
    │   ├── ProductDetailPage.tsx
    │   ├── ProductDetailPage.module.css
    │   ├── CartPage.tsx
    │   ├── CartPage.module.css
    │   ├── CheckoutPage.tsx
    │   ├── CheckoutPage.module.css
    │   ├── OrderCompletePage.tsx
    │   ├── OrderCompletePage.module.css
    │   ├── WishlistPage.tsx         # [Phase 2]
    │   └── admin/                   # [Phase 3]
    │       ├── AdminLayout.tsx
    │       ├── AdminDashboardPage.tsx
    │       ├── AdminProductsPage.tsx
    │       └── AdminOrdersPage.tsx
    │
    ├── test/
    │   └── setup.ts             # Vitest 전역 셋업 (@testing-library/jest-dom)
    │
    └── utils/
        ├── formatPrice.ts
        ├── formatPrice.test.ts  # Vitest 단위 테스트
        ├── formatDate.ts
        ├── formatDate.test.ts   # Vitest 단위 테스트
        └── validators.ts
```

> **테스트 파일 위치 규칙:** 단위 테스트(`*.test.ts/tsx`)는 대상 파일과 같은 폴더에 위치시킨다.

---

## 테스트 관련 루트 파일

```
react-cart/
├── vitest.config.ts             # Vitest 설정 (jsdom, globals, alias)
├── playwright.config.ts         # Playwright E2E 설정 (수정)
│
└── e2e/                         # Playwright E2E 테스트
    ├── helpers.ts               # 공통 헬퍼 (loginUser 등)
    ├── auth.spec.ts             # 로그인/회원가입/로그아웃 테스트
    ├── products.spec.ts         # 상품 목록/상세 테스트
    ├── cart.spec.ts             # 장바구니 테스트
    └── checkout.spec.ts         # 결제/주문 완료 테스트
```

---

## Phase 1에서 생성할 파일 목록 (명시적 정리)

```
src/main.tsx
src/App.tsx
src/index.css
src/api/client.ts
src/api/products.ts
src/api/orders.ts
src/types/product.ts
src/types/order.ts
src/store/cartStore.ts
src/hooks/useProducts.ts
src/hooks/useProduct.ts
src/hooks/useCreateOrder.ts
src/hooks/useDebounce.ts
src/components/common/Button.tsx + .module.css
src/components/common/Input.tsx + .module.css
src/components/common/Badge.tsx + .module.css
src/components/common/Spinner.tsx + .module.css
src/components/common/Skeleton.tsx + .module.css
src/components/common/ErrorMessage.tsx + .module.css
src/components/layout/Header.tsx + .module.css
src/components/layout/Footer.tsx + .module.css
src/components/layout/Layout.tsx
src/components/features/product/ProductCard.tsx + .module.css
src/components/features/product/ProductGrid.tsx + .module.css
src/components/features/product/ProductFilter.tsx + .module.css
src/components/features/product/ProductSearch.tsx + .module.css
src/components/features/cart/CartItem.tsx + .module.css
src/components/features/cart/CartSummary.tsx + .module.css
src/components/features/checkout/CheckoutForm.tsx + .module.css
src/pages/HomePage.tsx + .module.css
src/pages/ProductDetailPage.tsx + .module.css
src/pages/CartPage.tsx + .module.css
src/pages/CheckoutPage.tsx + .module.css
src/pages/OrderCompletePage.tsx + .module.css
src/utils/formatPrice.ts
src/utils/formatDate.ts
src/utils/validators.ts
db.json
```

---

## 폴더별 역할 규칙

### `api/`
- axios 호출이 발생하는 유일한 위치
- 반환 타입은 반드시 `Promise<T>` 명시

### `types/`
- `interface` → 객체 구조 (Product, Order)
- `type` → 유니온/유틸리티 (ProductCategory, SortOption)

### `store/`
- 서버 데이터는 절대 store에 넣지 않음
- 순수 클라이언트 상태만: 장바구니, UI 지속 상태

### `components/common/`
- store / api에 직접 의존하지 않는 순수 UI 컴포넌트

### `pages/`
- 훅과 컴포넌트를 조립하는 역할만
- 자체 비즈니스 로직 최소화


---

## Auth 추가 파일 목록 (Phase 2 완료 후 추가)

```
src/
├── api/
│   └── auth.ts                          # 로그인, 회원가입 API
│
├── types/
│   └── user.ts                          # User, LoginPayload, RegisterPayload, AuthResponse
│
├── store/
│   ├── authStore.ts                     # 로그인 상태 전역 관리 (Zustand + persist)
│   └── cartStore.ts                     # ★ 수정 — userId 기반 장바구니 분리
│
├── hooks/
│   └── useAuth.ts                       # useLogin, useRegister, useLogout
│
├── components/
│   └── layout/
│       ├── ProtectedRoute.tsx           # 비로그인 접근 차단 → /login 리다이렉트
│       └── Header.tsx                   # ★ 수정 — 로그인 상태에 따라 버튼 분기
│
├── pages/
│   ├── LoginPage.tsx
│   ├── LoginPage.module.css
│   ├── RegisterPage.tsx
│   └── RegisterPage.module.css
│
└── utils/
    └── validators.ts                    # ★ 수정 — loginSchema, registerSchema 추가

App.tsx                                  # ★ 수정 — ProtectedRoute 적용
```
