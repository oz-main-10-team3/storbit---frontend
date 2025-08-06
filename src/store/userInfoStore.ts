import { create } from 'zustand'
import type { UserDataWithToken } from '@/types/userData'
import { persist } from 'zustand/middleware'

type UserInfoState = {
  userInfo: UserDataWithToken | null
  setUserInfo: (userInfo: UserDataWithToken | null) => void
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
