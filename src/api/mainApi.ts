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

// api.interceptors.request.use(
//   (config) => {
//     const { getItemFromLocalStorage } = localStorageUtils()
//     const tokens = getItemFromLocalStorage('authkey')
//     if (tokens?.access) {
//       config.headers.Authorization = `bearer ${tokens.access}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )
