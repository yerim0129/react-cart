import apiClient from './client'
import type { User, LoginPayload, RegisterPayload, AuthResponse } from '@/types/user'

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
