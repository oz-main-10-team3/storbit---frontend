import { isKakaoUser } from '@/utils/isKakaoUser'
import type { UserDataType } from '@/types/userData'

export function getAccessToken(user: UserDataType): string | null {
  if (!user) return null
  if (isKakaoUser(user)) return user.access_token
  return user.access ?? null
}
