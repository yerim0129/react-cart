# 09. Auth 설계 (이메일/비밀번호 인증)

## 개요
JSON Server 기반 이메일 + 비밀번호 인증 구조입니다.
실제 JWT 서버는 아니지만 실무와 동일한 패턴으로 설계합니다.

---

## 접근 권한 규칙

| 페이지 | 경로 | 비로그인 접근 |
|---|---|---|
| 홈 (상품 목록) | `/` | ✅ 허용 |
| 상품 상세 | `/products/:id` | ✅ 허용 |
| 로그인 | `/login` | ✅ 허용 (로그인 시 → 홈 리다이렉트) |
| 회원가입 | `/register` | ✅ 허용 (로그인 시 → 홈 리다이렉트) |
| 장바구니 | `/cart` | ❌ → /login 리다이렉트 |
| 결제 | `/checkout` | ❌ → /login 리다이렉트 |
| 주문 완료 | `/order-complete` | ❌ → /login 리다이렉트 |
| 찜하기 | `/wishlist` | ❌ → /login 리다이렉트 |

> 장바구니 담기 버튼: 비로그인 상태에서 클릭 시 /login으로 이동

---

## 인증 흐름

```
1. 회원가입
   POST /users { name, email, password, createdAt }
   → 이메일 중복 체크 후 저장
   → 자동 로그인 처리 (가입 후 토큰 발급)

2. 로그인
   GET /users?email=...&password=...
   → 매칭 유저 반환
   → 가짜 토큰 생성: "token-{userId}"
   → authStore에 { user, token } 저장 (localStorage persist)

3. 로그아웃
   authStore 초기화
   cartStore 초기화 (해당 유저 장바구니 비움)
   → /login 이동

4. 페이지 진입 시
   authStore.token 확인
   → 없으면 ProtectedRoute가 /login으로 리다이렉트
   → 있으면 페이지 렌더링
```

---

## 타입 정의 (types/user.ts)

```ts
export interface User {
  id: number
  name: string
  email: string
  password: string     // 포트폴리오용 평문 저장 (실무: bcrypt 해싱)
  createdAt: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}
```

---

## API 레이어 (api/auth.ts)

```ts
import apiClient from './client'
import type { User, LoginPayload, RegisterPayload, AuthResponse } from '@/types/user'

// 로그인
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await apiClient.get<User[]>(
    `/users?email=${payload.email}&password=${payload.password}`
  )
  if (data.length === 0) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.')
  }
  const user = data[0]
  return { user, token: `token-${user.id}` }
}

// 회원가입
export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  // 이메일 중복 체크
  const { data: existing } = await apiClient.get<User[]>(
    `/users?email=${payload.email}`
  )
  if (existing.length > 0) {
    throw new Error('이미 사용 중인 이메일입니다.')
  }
  const { data: user } = await apiClient.post<User>('/users', {
    ...payload,
    createdAt: new Date().toISOString().split('T')[0],
  })
  return { user, token: `token-${user.id}` }
}
```

---

## Zustand authStore (store/authStore.ts)

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/user'

interface AuthState {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      login: (user, token) => set({ user, token, isLoggedIn: true }),

      logout: () => set({ user: null, token: null, isLoggedIn: false }),
    }),
    { name: 'auth-storage' }
  )
)
```

---

## 커스텀 훅 (hooks/useAuth.ts)

```ts
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { login, register } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import type { LoginPayload, RegisterPayload } from '@/types/user'

export const useLogin = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: ({ user, token }) => {
      setAuth(user, token)
      navigate(-1)           // 이전 페이지로 복귀 (장바구니 → 로그인 → 장바구니)
    },
  })
}

export const useRegister = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
    onSuccess: ({ user, token }) => {
      setAuth(user, token)
      navigate('/')
    },
  })
}

export const useLogout = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const clearCart = useCartStore((s) => s.clearCart)

  return () => {
    logout()
    clearCart()
    navigate('/login')
  }
}
```

---

## ProtectedRoute (components/layout/ProtectedRoute.tsx)

```tsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const location = useLocation()

  if (!isLoggedIn) {
    // 로그인 후 원래 페이지로 돌아오기 위해 현재 경로 저장
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
```

---

## App.tsx 라우팅 구조

```tsx
import ProtectedRoute from '@/components/layout/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* 공개 라우트 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* 보호 라우트 */}
        <Route path="cart" element={
          <ProtectedRoute><CartPage /></ProtectedRoute>
        } />
        <Route path="checkout" element={
          <ProtectedRoute><CheckoutPage /></ProtectedRoute>
        } />
        <Route path="order-complete" element={
          <ProtectedRoute><OrderCompletePage /></ProtectedRoute>
        } />
        <Route path="wishlist" element={
          <ProtectedRoute><WishlistPage /></ProtectedRoute>
        } />
      </Route>

      {/* Phase 3 - 관리자 (추후 추가) */}
      {/* <Route path="/admin" element={<AdminLayout />}>...</Route> */}
    </Routes>
  )
}
```

---

## cartStore 변경 사항 (store/cartStore.ts)

로그인 유저별 장바구니 분리를 위해 아래 항목 수정합니다.

```ts
// 기존: 단일 items 배열
// 변경: userId를 키로 하는 Map 구조

interface CartState {
  itemsByUser: Record<number, CartItem[]>   // { userId: CartItem[] }

  // userId를 받아서 해당 유저 장바구니만 반환
  getItems: (userId: number) => CartItem[]
  addItem: (userId: number, product: Product, quantity?: number) => void
  removeItem: (userId: number, productId: number) => void
  updateQuantity: (userId: number, productId: number, quantity: number) => void
  clearCart: (userId?: number) => void      // userId 없으면 전체 초기화
  getTotalPrice: (userId: number) => number
  getTotalCount: (userId: number) => number
}
```

---

## 폼 유효성 검사 스키마 (utils/validators.ts 추가)

```ts
// 로그인 스키마
export const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상 입력해주세요.'),
})

// 회원가입 스키마
export const registerSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상 입력해주세요.'),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordConfirm'],
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
```

---

## db.json 추가 구조

```json
{
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

> ⚠️ 포트폴리오 한정으로 비밀번호 평문 저장.
> README에 "실제 서비스에서는 bcrypt 해싱 필요" 명시할 것.

---

## README 필수 안내 문구

```markdown
## ⚠️ 보안 안내
이 프로젝트는 포트폴리오 목적으로 JSON Server를 사용합니다.
비밀번호가 평문으로 저장되며, 실제 서비스에서는 반드시 bcrypt 등 해싱 처리가 필요합니다.
실무 환경에서는 Supabase Auth 또는 자체 백엔드 서버로 교체하세요.
```
