import { create } from 'zustand'
import type { UserDataType } from '@/types/userData'
import { persist } from 'zustand/middleware'

type UserInfoState = {
  userInfo: UserDataType
  setUserInfo: (userInfo: UserDataType) => void
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
