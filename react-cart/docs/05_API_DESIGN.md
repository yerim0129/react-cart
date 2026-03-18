# 05. API 설계

## axios 클라이언트 설정 (api/client.ts)

```ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터 (추후 토큰 추가 용이)
apiClient.interceptors.request.use((config) => {
  return config
})

// 응답 인터셉터 (전역 에러 처리)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error.response?.data ?? error.message)
    return Promise.reject(error)
  }
)

export default apiClient
```

---

## 상품 API (api/products.ts)

```ts
import apiClient from './client'
import type { Product } from '@/types/product'

// 목록 조회
export const getProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get<Product[]>('/products')
  return data
}

// 단건 조회
export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/products/${id}`)
  return data
}
```

---

## 주문 API (api/orders.ts)

```ts
import apiClient from './client'
import type { Order, CreateOrderPayload } from '@/types/order'

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
  const { data } = await apiClient.post<Order>('/orders', payload)
  return data
}
```

---

## TanStack Query 훅 패턴

### Query Key 규칙
```ts
// 목록 조회
['products']

// 단건 조회
['products', id]

// 필터 포함
['products', { category, sort }]
```

### useProducts (hooks/useProducts.ts)
```ts
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/api/products'
import type { Product, ProductCategory, SortOption } from '@/types/product'

interface UseProductsOptions {
  category?: ProductCategory
  sort?: SortOption
  search?: string
}

export const useProducts = (options: UseProductsOptions = {}) => {
  return useQuery({
    queryKey: ['products', options],
    queryFn: getProducts,
    select: (data) => {
      let result = [...data]

      // 카테고리 필터
      if (options.category && options.category !== 'all') {
        result = result.filter((p) => p.category === options.category)
      }

      // 검색 필터
      if (options.search) {
        result = result.filter((p) =>
          p.name.toLowerCase().includes(options.search!.toLowerCase())
        )
      }

      // 정렬
      if (options.sort === 'price_asc') {
        result.sort((a, b) => a.price - b.price)
      } else if (options.sort === 'price_desc') {
        result.sort((a, b) => b.price - a.price)
      }

      return result
    },
    staleTime: 1000 * 60 * 5, // 5분
  })
}
```

### useProduct 단건 (hooks/useProduct.ts)
```ts
import { useQuery } from '@tanstack/react-query'
import { getProductById } from '@/api/products'

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}
```

### useCreateOrder — Mutation (hooks/useCreateOrder.ts)
```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder } from '@/api/orders'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '@/store/cartStore'

export const useCreateOrder = () => {
  const navigate = useNavigate()
  const clearCart = useCartStore((s) => s.clearCart)

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      clearCart()
      navigate('/order-complete', { state: { orderId: data.id } })
    },
  })
}
```

---

## TanStack Query Provider 설정 (main.tsx)

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
```
