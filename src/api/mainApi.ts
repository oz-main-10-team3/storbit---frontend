import type { UserDataWithToken } from '@/types/userData'
import axios from 'axios'
// import { localStorageUtils } from '../utilities/localStorage'

const BASE_URL = 'http://localhost:5173'

export const api = axios.create({
  baseURL: BASE_URL,
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
        const parsed = JSON.parse(userInfo) as {
          state?: { userInfo?: UserDataWithToken }
        }
        const token = parsed?.state?.userInfo?.access_token

        if (token) {
          // console.log('✅ Access Token:', token)
          config.headers = config.headers || {} // 안전하게 초기화
          config.headers.Authorization = `Bearer ${token}`
        }
      }
    } catch (_error) {
      //ignore
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
