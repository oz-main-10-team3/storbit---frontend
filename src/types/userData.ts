export interface UserData {
  user_id: number
  email: string
  nickname: string
  name: string
  phone: string
  birthday: string
  profile_image_url: string
}

export interface UserDataWithToken {
  access_token: string
  message?: string
  refresh_token: string
  user?: UserData
}

export interface KakaoUserData extends UserDataWithToken {
  kakao_id: string
  nickname: string
  email: string
  profile_image: string
}
