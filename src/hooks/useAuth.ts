import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { login, register } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import type { LoginPayload, RegisterPayload } from '@/types/user'

export const useLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: ({ user, token }) => {
      setAuth(user, token)
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname ?? '/'
      navigate(from, { replace: true })
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
  const user = useAuthStore((s) => s.user)

  return () => {
    if (user) clearCart(user.id)
    logout()
    navigate('/login')
  }
}
