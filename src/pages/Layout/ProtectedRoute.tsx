import { useUserInfo } from '@/store/userInfoStore'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
// import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const userInfo = useUserInfo((state) => state.userInfo)
  const [showAlert, setShowAlert] = useState(false)
  if (userInfo && userInfo.access_token) {
    return children
  }
  if (!showAlert) {
    // 안내 메시지 보여주기
    alert('로그인이 필요합니다.')
    setShowAlert(true)
  }

  // 확인 후 로그인 페이지로 이동
  if (showAlert) {
    return <Navigate to="/login" replace />
  }

  return null
}
