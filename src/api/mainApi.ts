import type { UserDataType } from '@/types/userData'
import { isKakaoUser } from '@/utils/isKakaoUser'
import axios from 'axios'

const BASE_URL = 'http://localhost:5173'
const API_MAIN_URL = import.meta.env.VITE_API_MAIN_URL

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const mainApi = axios.create({
  baseURL: API_MAIN_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    try {
      const userInfo = localStorage.getItem('userInfo')

      if (userInfo) {
        const { state } = JSON.parse(userInfo) as {
          state?: { userInfo?: UserDataType }
        }
        const user = state?.userInfo
        if (!user) return config // 로그인 안 된 경우

        let token: string | undefined

        if (isKakaoUser(user)) {
          token = user.access_token
        } else {
          token = user.access
        }

        if (token) {
          // console.log('✅ Access Token:', token)
          config.headers = config.headers || {} // 안전하게 초기화
          config.headers.Authorization = `Bearer ${token}`
        }
      }
    } catch {
      void 0
    }

    // multipart/form-data 시 Content-Type 제거 (axios가 자동 설정하게)
    if (
      config.data instanceof FormData &&
      config.headers &&
      'Content-Type' in config.headers
    ) {
      delete config.headers['Content-Type']
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

mainApi.interceptors.request.use(
  (config) => {
    try {
      const userInfo = localStorage.getItem('userInfo')

      if (userInfo) {
        const { state } = JSON.parse(userInfo) as {
          state?: { userInfo?: UserDataType }
        }
        const user = state?.userInfo
        if (!user) return config // 로그인 안 된 경우

        let token: string | undefined

        if (isKakaoUser(user)) {
          token = user.access_token
        } else {
          token = user.access
        }

        if (token) {
          // console.log('✅ Access Token:', token)
          config.headers = config.headers || {} // 안전하게 초기화
          config.headers.Authorization = `Bearer ${token}`
        }
      }
    } catch {
      void 0
    }

    // multipart/form-data 시 Content-Type 제거 (axios가 자동 설정하게)
    if (
      config.data instanceof FormData &&
      config.headers &&
      'Content-Type' in config.headers
    ) {
      delete config.headers['Content-Type']
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
