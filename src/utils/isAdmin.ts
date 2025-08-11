// utils/isAdmin.ts
import type { UserDataWithToken } from '@/types/userData'

export function isAdmin(user: UserDataWithToken | null): boolean {
  return user?.user.email === 'admin@admin.com' || user?.user.user_id === 0
}
