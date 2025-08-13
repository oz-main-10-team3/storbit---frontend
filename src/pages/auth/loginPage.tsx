import { FaComment } from 'react-icons/fa'
import InputField from '@/common/InputField'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import CommonButton from '@/common/CommonButton'
import type { KakaoUserData, UserDataWithToken } from '@/types/userData'
import { api, mainApi } from '@/api/mainApi'
import { useUserInfo } from '@/store/userInfoStore'
import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorMessage } from '@/types/errorMessage'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUserInfo = useUserInfo((state) => state.setUserInfo)
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await api.post('/api/v1/auth/login/', {
        email,
        password,
      })

      if (!!res && res.status === 200) {
        const userData: UserDataWithToken = res.data

        setUserInfo(userData)
        navigate('/')
        return
      } else {
        return
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>
      if (!axiosError.status) return
      setErrorMessage({
        status: axiosError.status,
        message:
          axiosError.response?.data.detail ?? '알 수 없는 오류가 발생했습니다.',
      })
    }
  }

  const [searchParams] = useSearchParams()

  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI

  const handleKakaoLogin = () => {
    location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`
  }

  const getKakaoUserInfo = async (authorizationCode: string) => {
    mainApi
      .post<KakaoUserData>(`/auth/kakao/login/`, {
        code: authorizationCode,
      })
      .then((res: AxiosResponse<KakaoUserData>) => {
        alert(res)
        // console.log(res)
      })
  }

  useEffect(() => {
    const authorizationCode = searchParams.get('code')

    if (authorizationCode) {
      getKakaoUserInfo(authorizationCode)
    }
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-center bg-white h-[856px]">
      <div className="flex flex-col items-center justify-center gap-[32px]">
        <div className="flex flex-col items-center justify-center gap-[40px]">
          <div className="text-[32px] font-semibold">로그인</div>

          {/*카카오 간편 로그인 버튼*/}
          <button
            className="w-[348px] h-[52px] bg-[#FEE500] text-[#391C1A] rounded flex items-center text-[16px] justify-center font-normal cursor-pointer"
            onClick={handleKakaoLogin}
          >
            <FaComment className="mr-2" />
            카카오로 3초만에 가입하기
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-[40px]">
          <div className="flex items-center gap-[35px] w-full justify-center">
            <div className="shrink-0 w-[120px] h-[1px] bg-text4"></div>
            <div className="whitespace-nowrap text-text4 font-[20px]">또는</div>
            <div className="shrink-0 w-[120px] h-[1px] bg-text4"></div>
          </div>
          <div className="flex flex-col w-[348px] pace-y-3 gap-[12px]">
            <InputField
              className="w-full h-12 placeholder:text-text4"
              placeholder="example@onstudy.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={
                errorMessage?.status === 404 ? errorMessage?.message : undefined
              }
            />
            <InputField
              className="w-full h-12 placeholder:text-text4"
              placeholder="비밀번호(6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              error={
                errorMessage?.status === 401 ? errorMessage?.message : undefined
              }
            />
            <div className="flex text-[14px] text-text2 gap-[8px] font-normal">
              <Link className="" to="/auth/find-email">
                이메일 찾기
              </Link>
              <div>|</div>
              <Link className="" to="/auth/find-password">
                비밀번호 찾기
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[24px] w-full">
            <CommonButton onClick={handleLogin}>로그인</CommonButton>
            <Link
              className="flex text-[14px] text-text2 gap-[8px] font-normal"
              to="/auth/signup"
            >
              이메일로 가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
