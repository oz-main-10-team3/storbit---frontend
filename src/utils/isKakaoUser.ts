import type { KakaoUserData, UserInfo } from '@/types/userData'

// 타입 가드 함수
export function isKakaoUser(userInfo: UserInfo): userInfo is KakaoUserData {
  return (
    userInfo !== null && typeof userInfo === 'object' && 'kakao_id' in userInfo
  )
}
