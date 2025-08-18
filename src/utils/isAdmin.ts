// utils/isAdmin.ts
import type { UserDataType } from '@/types/userData'

export const ADMIN_EMAILS = import.meta.env.VITE_ADMIN_EMAILS.split(',')

export function isAdmin(user: UserDataType): boolean {
  return ADMIN_EMAILS.includes(user?.email ?? '')
}
