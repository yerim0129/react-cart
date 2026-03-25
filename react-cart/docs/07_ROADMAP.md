# 07. 고도화 로드맵

## ⚠️ 이 문서의 사용 목적
구조 파악과 설계 참고용입니다.
**Claude Code는 이 문서를 읽더라도 선제적으로 파일을 생성하지 않습니다.**
각 Phase는 명시적인 Step 지시가 있을 때만 작업합니다.

---

## Phase 별 개발 계획

```
Phase 1 (현재 진행)   Phase 2               Phase 3
──────────────        ──────────────        ──────────────
상품 목록/필터         찜하기/위시리스트        관리자 페이지
상품 상세             리뷰/평점              상품 CRUD
장바구니              상품 상세 고도화        주문 관리
결제 폼                                     매출 통계
주문 완료
```

---

## Phase 2 — 찜하기 / 위시리스트

### 동작 방식
- 상품 카드 + 상품 상세에 하트 버튼
- `wishlists` 컬렉션에 POST / DELETE
- 위시리스트 전용 페이지 (`/wishlist`)

### 이때 생성할 파일
```
src/types/wishlist.ts
src/api/wishlist.ts
src/hooks/useWishlist.ts
src/store/wishlistStore.ts
src/components/features/wishlist/WishlistButton.tsx + .module.css
src/pages/WishlistPage.tsx + .module.css
```

### API 설계
```ts
// GET  /wishlists
// POST /wishlists       body: { productId, createdAt }
// DELETE /wishlists/:id
```

---

## Phase 2 — 리뷰 / 평점

### 동작 방식
- 상품 상세 페이지 하단 리뷰 목록 탭
- 별점(1~5) + 텍스트 리뷰 작성 폼
- 리뷰 작성 후 상품 `rating`, `reviewCount` 갱신

### 이때 생성할 파일
```
src/types/review.ts
src/api/reviews.ts
src/hooks/useReviews.ts
src/components/features/review/ReviewList.tsx + .module.css
src/components/features/review/ReviewForm.tsx + .module.css
src/components/common/Modal.tsx + .module.css
```

### API 설계
```ts
// GET  /reviews?productId=1
// POST /reviews    body: { productId, rating, content, author, createdAt }
```

---

## UX 고도화 — 완료 ✅

### 추가된 기능
| 기능 | 파일 | 설명 |
|---|---|---|
| 토스트 알림 | `store/toastStore.ts`, `components/common/Toast.tsx` | 장바구니 담기, 찜하기 등 피드백 |
| 버튼 로딩 스피너 | `Button.tsx` (`isLoading` prop 추가) | 비동기 작업 중 버튼 내 스피너 표시 |
| 페이지 프로그레스 바 | `components/common/ProgressBar.tsx` | 라우트 전환 시 상단 바 애니메이션 |
| 찜하기 헤더 뱃지 | `Header.tsx` | 찜한 상품 수 표시 |
| 로그인 필요 모달 | `store/loginModalStore.ts`, `components/common/LoginRequiredModal.tsx` | 비로그인 상태에서 액션 시 모달 표시 |

---

## 테스팅 — 완료 ✅

### Vitest 단위 테스트
| 파일 | 테스트 내용 |
|---|---|
| `utils/formatPrice.test.ts` | 가격 포맷 함수 |
| `utils/formatDate.test.ts` | 날짜 포맷 함수 |
| `components/common/Badge.test.tsx` | Badge 렌더링 |
| `components/common/Button.test.tsx` | 클릭, disabled, isLoading |
| `hooks/useDebounce.test.tsx` | 디바운스 타이밍 (fake timers) |

### Playwright E2E 테스트
| 파일 | 테스트 내용 |
|---|---|
| `e2e/auth.spec.ts` | 로그인 성공/실패, 로그아웃, 비로그인 접근, 회원가입 |
| `e2e/products.spec.ts` | 홈 렌더링, 상품 상세, 장바구니 추가, 검색, 404 |
| `e2e/cart.spec.ts` | 토스트 표시, 장바구니 확인, 빈 장바구니 |
| `e2e/checkout.spec.ts` | 결제 페이지, 주문 완료, 빈 장바구니 리다이렉트 |

---

## Phase 3 — 관리자 페이지 (Admin Dashboard)

### 페이지 구성
| 경로 | 페이지 | 기능 |
|---|---|---|
| `/admin` | 대시보드 | 총 주문 수, 매출, 상품 수 통계 카드 |
| `/admin/products` | 상품 관리 | 목록 테이블 + 추가/수정/삭제 |
| `/admin/orders` | 주문 관리 | 주문 목록 + 상태 변경 |

### 이때 생성할 파일
```
src/types/admin.ts
src/pages/admin/AdminLayout.tsx
src/pages/admin/AdminDashboardPage.tsx
src/pages/admin/AdminProductsPage.tsx
src/pages/admin/AdminOrdersPage.tsx
```

### 라우팅 구조 (중첩 라우트)
```tsx
<Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminDashboardPage />} />
  <Route path="products" element={<AdminProductsPage />} />
  <Route path="orders" element={<AdminOrdersPage />} />
</Route>
```

---

## CSS 확장 — 다크모드 (Phase 2 이후 선택)

Phase 1에서 CSS 변수 기반으로 만들어두면 추가 작업 최소화됩니다.

```css
/* index.css에 추가만 하면 됨 */
[data-theme='dark'] {
  --color-bg: #111827;
  --color-text: #f9fafb;
  --color-primary: #3b82f6;
}
```

---

## Phase 1에서 미리 해두는 것 (Phase 2~3 대비)

코드는 만들지 않지만, 아래는 Phase 1 작업 시 고려해야 합니다.

| 항목 | 이유 |
|---|---|
| `Product` 타입에 `rating`, `reviewCount` 포함 | Phase 2에서 상품 상세 수정 최소화 |
| `db.json`에 `wishlists: []`, `reviews: []` 포함 | 서버 재시작 없이 바로 사용 가능 |
| `Header`에 찜하기/관리자 링크 자리 확보 | Phase 2~3에서 링크만 활성화 |
| `App.tsx` 라우팅에 주석으로 Phase 2~3 경로 명시 | 추가 시 구조 파악 용이 |
