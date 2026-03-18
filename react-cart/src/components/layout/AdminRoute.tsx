import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

interface AdminRouteProps {
  children: React.ReactNode
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const user = useAuthStore((s) => s.user)

  if (user === null) {
    return <Navigate to="/login" replace />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default AdminRoute
