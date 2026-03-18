import apiClient from './client'
import type { User, LoginPayload, RegisterPayload, AuthResponse } from '@/types/user'

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  // ⚠️ 학습용: 실서비스에서는 POST body로 전송 + 서버에서 bcrypt로 비교해야 함
  // GET 쿼리스트링에 비밀번호가 포함되면 브라우저 히스토리, 서버 로그에 평문 노출됨
  const { data } = await apiClient.get<User[]>(
    `/users?email=${payload.email}&password=${payload.password}`
  )
  if (data.length === 0) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.')
  }
  const user = data[0]
  return { user, token: `token-${user.id}` }
}

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
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
