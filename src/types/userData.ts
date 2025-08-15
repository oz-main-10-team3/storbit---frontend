export interface KakaoUserType {
  access_token: string
  refresh_token: string
  kakao_id: string
  nickname: string
  email: string
  profile_image: string
  phone: string | null
}

export interface EmailUserType {
  access: string
  refresh: string
  email: string
  nickname: string
  fullname: string
  phone_number: string
  profile_image: string
}

export type UserDataType = KakaoUserType | EmailUserType | null
