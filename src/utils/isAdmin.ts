// utils/isAdmin.ts
import type { UserDataType } from '@/types/userData'

export function isAdmin(user: UserDataType): boolean {
  return user?.email === 'admin@admin.com'
}
