# 06. JSON Server & 상태 관리 설계

## db.json — 고도화 구조 포함

```json
{
  "products": [
    {
      "id": 1,
      "name": "클래식 화이트 티셔츠",
      "price": 29000,
      "category": "clothing",
      "imageUrl": "https://picsum.photos/seed/product1/400/400",
      "stock": 50,
      "description": "매일 입기 좋은 기본 화이트 티셔츠. 부드러운 면 소재로 편안한 착용감.",
      "rating": 4.3,
      "reviewCount": 12,
      "createdAt": "2024-01-15"
    },
    {
      "id": 2,
      "name": "슬림핏 블랙 슬랙스",
      "price": 59000,
      "category": "clothing",
      "imageUrl": "https://picsum.photos/seed/product2/400/400",
      "stock": 30,
      "description": "어떤 상황에서도 어울리는 슬림핏 슬랙스. 신축성 소재로 활동하기 편함.",
      "rating": 4.7,
      "reviewCount": 8,
      "createdAt": "2024-01-20"
    },
    {
      "id": 3,
      "name": "무선 블루투스 이어폰",
      "price": 89000,
      "category": "electronics",
      "imageUrl": "https://picsum.photos/seed/product3/400/400",
      "stock": 20,
      "description": "노이즈 캔슬링 기능이 탑재된 무선 이어폰. 최대 24시간 배터리.",
      "rating": 4.5,
      "reviewCount": 23,
      "createdAt": "2024-02-01"
    },
    {
      "id": 4,
      "name": "스마트 워치",
      "price": 199000,
      "category": "electronics",
      "imageUrl": "https://picsum.photos/seed/product4/400/400",
      "stock": 15,
      "description": "심박수, 수면 추적, GPS 기능이 내장된 스마트 워치.",
      "rating": 4.2,
      "reviewCount": 5,
      "createdAt": "2024-02-05"
    },
    {
      "id": 5,
      "name": "제주 유기농 녹차",
      "price": 18000,
      "category": "food",
      "imageUrl": "https://picsum.photos/seed/product5/400/400",
      "stock": 100,
      "description": "제주도에서 자란 유기농 찻잎으로 만든 프리미엄 녹차.",
      "rating": 4.8,
      "reviewCount": 31,
      "createdAt": "2024-02-10"
    },
    {
      "id": 6,
      "name": "프리미엄 견과류 믹스",
      "price": 24000,
      "category": "food",
      "imageUrl": "https://picsum.photos/seed/product6/400/400",
      "stock": 80,
      "description": "아몬드, 캐슈넛, 호두 등 엄선된 견과류 혼합 제품.",
      "rating": 4.6,
      "reviewCount": 17,
      "createdAt": "2024-02-12"
    },
    {
      "id": 7,
      "name": "린넨 반팔 셔츠",
      "price": 45000,
      "category": "clothing",
      "imageUrl": "https://picsum.photos/seed/product7/400/400",
      "stock": 40,
      "description": "여름에 시원하게 입을 수 있는 린넨 소재 반팔 셔츠.",
      "rating": 4.4,
      "reviewCount": 9,
      "createdAt": "2024-02-15"
    },
    {
      "id": 8,
      "name": "USB-C 고속 충전기",
      "price": 35000,
      "category": "electronics",
      "imageUrl": "https://picsum.photos/seed/product8/400/400",
      "stock": 60,
      "description": "65W 고속 충전 지원, 멀티 포트 USB-C 충전기.",
      "rating": 4.1,
      "reviewCount": 14,
      "createdAt": "2024-02-18"
    }
  ],
  "orders": [],
  "wishlists": [],
  "reviews": []
}
```

> `rating`, `reviewCount` 필드는 1차 개발에서 읽기 전용으로만 사용.
> `wishlists`, `reviews`는 고도화 시 실제 POST/DELETE 연동.

---

## 타입 정의

### types/product.ts
```ts
export interface Product {
  id: number
  name: string
  price: number
  category: ProductCategory
  imageUrl: string
  stock: number
  description: string
  rating: number        // 고도화 대비 — 1차에서는 표시만
  reviewCount: number   // 고도화 대비 — 1차에서는 표시만
  createdAt: string
}

export type ProductCategory = 'all' | 'clothing' | 'electronics' | 'food'
export type SortOption = 'latest' | 'price_asc' | 'price_desc'
```

### types/order.ts
```ts
import type { Product } from './product'

export interface CartItem {
  productId: number
  product: Product
  quantity: number
}

export interface ShippingInfo {
  name: string
  phone: string
  address: string
  detailAddress: string
  memo?: string
}

export interface CreateOrderPayload {
  items: CartItem[]
  shippingInfo: ShippingInfo
  totalPrice: number
  createdAt: string
}

export interface Order extends CreateOrderPayload {
  id: number
}
```

### types/wishlist.ts (고도화 대비 — 1차에서 파일만 생성)
```ts
export interface WishlistItem {
  id: number
  productId: number
  createdAt: string
}
```

### types/review.ts (고도화 대비 — 1차에서 파일만 생성)
```ts
export interface Review {
  id: number
  productId: number
  rating: number        // 1 ~ 5
  content: string
  author: string
  createdAt: string
}

export interface CreateReviewPayload {
  productId: number
  rating: number
  content: string
  author: string
}
```

### types/admin.ts (고도화 대비 — 1차에서 파일만 생성)
```ts
export interface AdminStats {
  totalOrders: number
  totalRevenue: number
  totalProducts: number
}
```

---

## Zustand 장바구니 스토어 (store/cartStore.ts)

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types/order'
import type { Product } from '@/types/product'

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id)
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          return {
            items: [...state.items, { productId: product.id, product, quantity }],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),

      getTotalCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
)
```

---

## 유틸 함수

### utils/formatPrice.ts
```ts
export const formatPrice = (price: number): string => {
  return `₩${price.toLocaleString('ko-KR')}`
}
```

### utils/formatDate.ts
```ts
export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
```

### utils/validators.ts
```ts
import { z } from 'zod'

export const shippingSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요.'),
  phone: z
    .string()
    .regex(/^01[0-9]-\d{3,4}-\d{4}$/, '올바른 전화번호 형식으로 입력해주세요. (예: 010-1234-5678)'),
  address: z.string().min(5, '주소를 입력해주세요.'),
  detailAddress: z.string().min(1, '상세 주소를 입력해주세요.'),
  memo: z.string().optional(),
})

export type ShippingFormValues = z.infer<typeof shippingSchema>
```


---

## Auth 추가 — db.json 업데이트

기존 db.json에 아래 두 항목을 추가합니다.

```json
{
  "products": [ ... ],
  "orders": [],
  "wishlists": [],
  "reviews": [],
  "users": [
    {
      "id": 1,
      "name": "테스트유저",
      "email": "test@test.com",
      "password": "test1234",
      "createdAt": "2024-01-01"
    }
  ],
  "carts": []
}
```

> ⚠️ 비밀번호 평문 저장은 포트폴리오 한정.
> README에 보안 안내 문구 필수 추가.
