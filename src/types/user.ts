export interface User {
  id: number
  name: string
  email: string
  password: string     // 포트폴리오용 평문 저장 (실무: bcrypt 해싱 필요)
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
