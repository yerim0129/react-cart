# 04. 코딩 컨벤션

## 네이밍 규칙

| 대상 | 규칙 | 예시 |
|---|---|---|
| 컴포넌트 파일 | PascalCase | `ProductCard.tsx` |
| CSS Modules 파일 | PascalCase + .module.css | `ProductCard.module.css` |
| 훅 파일 | camelCase, use 접두사 | `useProducts.ts` |
| 유틸 파일 | camelCase | `formatPrice.ts` |
| 타입/인터페이스 | PascalCase | `Product`, `CartItem` |
| 변수/함수 | camelCase | `productList`, `handleAddToCart` |
| 상수 | UPPER_SNAKE_CASE | `MAX_CART_QUANTITY` |
| CSS 클래스명 | camelCase (CSS Modules 내부) | `.productCard`, `.addButton` |

---

## CSS Modules 패턴

### 파일 구조 — 컴포넌트와 1:1 매칭
```
components/
└── common/
    ├── Button.tsx
    ├── Button.module.css   ← 반드시 같은 폴더에 위치
    ├── Input.tsx
    └── Input.module.css
```

### 기본 사용 패턴
```tsx
// Button.tsx
import clsx from 'clsx'
import styles from './Button.module.css'

interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  onClick?: () => void
}

const Button = ({ label, variant = 'primary', disabled, onClick }: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],         // styles.primary / styles.secondary
        disabled && styles.disabled
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
```

```css
/* Button.module.css */
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.primary {
  background-color: #2563eb;
  color: #fff;
}

.primary:hover {
  background-color: #1d4ed8;
}

.secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.secondary:hover {
  background-color: #e5e7eb;
}

.danger {
  background-color: #dc2626;
  color: #fff;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### CSS 변수 (전역 디자인 토큰) — index.css에 정의
```css
/* src/index.css */
:root {
  /* 색상 */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-danger: #dc2626;
  --color-success: #16a34a;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-500: #6b7280;
  --color-gray-700: #374151;
  --color-gray-900: #111827;

  /* 타이포그래피 */
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;

  /* 간격 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* 테두리 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* 그림자 */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

```css
/* 모듈 CSS에서 변수 활용 */
.card {
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
  background-color: var(--color-gray-50);
}
```

> CSS 변수를 사용하면 나중에 다크모드/테마 기능 추가 시
> `:root`의 값만 바꾸면 전체 적용됩니다. (고도화 대비)

---

## TypeScript 패턴

### 타입 정의 예시
```ts
// ✅ 올바른 패턴
export interface Product {
  id: number
  name: string
  price: number
  category: ProductCategory
  imageUrl: string
  stock: number
  description: string
}

export type ProductCategory = 'all' | 'clothing' | 'electronics' | 'food'
export type SortOption = 'latest' | 'price_asc' | 'price_desc'

// ❌ 금지
const product: any = {}
```

### 컴포넌트 props 타입
```ts
// ✅ 올바른 패턴
interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // ...
}
```

---

## 에러 / 로딩 처리 패턴
```tsx
// ✅ 반드시 처리
const { data, isLoading, isError } = useProducts()

if (isLoading) return <Spinner />
if (isError) return <ErrorMessage message="상품을 불러올 수 없습니다." />

return <ProductGrid products={data} />
```

---

## import 순서
```ts
// 1. React 관련
import { useState } from 'react'

// 2. 외부 라이브러리
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'

// 3. 내부 모듈 (@/ alias)
import { getProducts } from '@/api/products'
import type { Product } from '@/types/product'
import Button from '@/components/common/Button'

// 4. CSS Modules (항상 마지막)
import styles from './ProductCard.module.css'
```

---

## 이벤트 핸들러 네이밍
```tsx
// ✅ handle + 동작명
const handleAddToCart = () => { ... }
const handleQuantityChange = (value: number) => { ... }
const handleSubmit = (data: FormData) => { ... }

// ❌ 금지
const click = () => { ... }
const fn = () => { ... }
```
