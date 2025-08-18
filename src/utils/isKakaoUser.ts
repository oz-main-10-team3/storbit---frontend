import type { KakaoUserType, UserDataType } from '@/types/userData'

// 타입 가드 함수
export function isKakaoUser(userInfo: UserDataType): userInfo is KakaoUserType {
  return (
    userInfo !== null && typeof userInfo === 'object' && 'kakao_id' in userInfo
  )
}
