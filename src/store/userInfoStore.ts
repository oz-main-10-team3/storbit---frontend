import { create } from 'zustand'
import type { UserInfo } from '@/types/userData'
import { persist } from 'zustand/middleware'

type UserInfoState = {
  userInfo: UserInfo
  setUserInfo: (userInfo: UserInfo) => void
}

export const useUserInfo = create<UserInfoState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: 'userInfo',
    }
  )
)
