import { create } from 'zustand'
import type { KakaoUserData, UserDataWithToken } from '@/types/userData'
import { persist } from 'zustand/middleware'

type UserInfo = UserDataWithToken | KakaoUserData | null

type UserInfoState = {
  userInfo: UserInfo
  setUserInfo: (userInfo: {
    id: number
    nickname: string
    profileUrl: string
    email: string
  }) => void
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
