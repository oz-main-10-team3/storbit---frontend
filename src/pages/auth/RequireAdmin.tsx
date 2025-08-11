// src/components/auth/RequireAdmin.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAdmin } from '@/utils/isAdmin'
import { useUserInfo } from '@/store/userInfoStore.ts'

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { userInfo } = useUserInfo()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo || !isAdmin(userInfo)) {
      alert('관리자만 접근할 수 있습니다.')
      navigate('/login') // 또는 '/'로
    }
  }, [navigate, userInfo])

  if (!userInfo || !isAdmin(userInfo)) return null

  return { children }
}
