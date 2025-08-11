import InputField from '@/common/InputField'
import CommonButton from '@/common/CommonButton'
import { useNavigate } from 'react-router-dom'
import type { SignupForm } from '@/types/signupForm'
import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import signupFormSchema from '@/schemas/signupFormSchema'
import { api } from '@/api/mainApi'
import type { AxiosError } from 'axios'
import { useState } from 'react'
import type { ErrorMessage } from '@/types/errorMessage'
import { cn } from '@/utils/cn'

export default function SignupPage() {
  const navigate = useNavigate()
  const [submitErrorMessage, setSubmitErrorMessage] =
    useState<ErrorMessage | null>(null)
  const [nicknameCheckMessage, setNicknameCheckMessage] =
    useState<ErrorMessage | null>(null)

  const [codeCheckMessage, setCodeCheckMessage] = useState<ErrorMessage | null>(
    null
  )
  const [receivedAuthCode, setReceivedAuthCode] = useState<ErrorMessage | null>(
    null
  )
  const [enteredAuthCode, setEnteredAuthCode] = useState<string>('')
  const [isAvailableNickname, setIsAvailableNickname] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)

  const {
    control,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignupForm>({
    resolver: joiResolver(signupFormSchema), // Joi를 React Hook Form과 연결
    defaultValues: {
      fullname: '',
      email: '',
      nickname: '',
      phone_number: '',
      password: '',
      gender: '남', // 또는 '남'/'여' 중 기본값
    },
    mode: 'onChange', // 입력값이 변경될 때마다 유효성 검사
  })

  const handleDuplicateNicknameCheck = async () => {
    try {
      const nickname = getValues('nickname')
      const res = await api.post('/api/v1/users/nickname/duplication', {
        nickname,
      })
      if (res.status === 200) {
        setNicknameCheckMessage({
          status: res.status,
          message: res.data.detail,
        })
        setIsAvailableNickname(true)
        return
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>
      if (!axiosError.status) return
      setNicknameCheckMessage({
        status: axiosError.status,
        message:
          axiosError.response?.data.detail ?? '알 수 없는 오류가 발생했습니다.',
      })
    }
  }

  const onSubmit = async (data: SignupForm) => {
    try {
      const res = await api.post('/api/v1/users/signup/', data)
      if (res.status === 201) {
        navigate('/auth/signup/terms') // 회원가입 성공 페이지 이동
        return
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>
      if (!axiosError.status) return
      setSubmitErrorMessage({
        status: axiosError.status,
        message:
          axiosError.response?.data.detail ?? '알 수 없는 오류가 발생했습니다.',
      })
    }
  }

  const requestPhoneAuthCode = async () => {
    const phoneNumber = getValues('phone_number')
    try {
      const res = await api.post('/api/v1/auth/send-code', { phoneNumber })
      if (res.status === 200) {
        setReceivedAuthCode({ status: res.status, message: res.data.detail })
        return
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>
      if (!axiosError.status) return
      setReceivedAuthCode(null)
    }
  }

  const phoneAuthCodeverify = async () => {
    const phoneNumber = getValues('phone_number')
    try {
      const res = await api.post('/api/v1/auth/verify-code', {
        phoneNumber,
        code: enteredAuthCode,
      })
      if (res.status === 200) {
        setIsCodeVerified(true)
        setCodeCheckMessage({ status: res.status, message: res.data.detail })
        return
      }
      setIsCodeVerified(false)
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>
      if (!axiosError.status) return
      setCodeCheckMessage({
        status: axiosError.status,
        message:
          axiosError.response?.data.detail ?? '알 수 없는 오류가 발생했습니다.',
      })
      setIsCodeVerified(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white h-[856px]">
      <div className="flex flex-col items-center justify-center gap-[56px] w-[344px]">
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <div className="text-[32px] font-semibold">회원가입</div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-[40px]"
        >
          <div className="flex flex-col pace-y-3 gap-[16px]">
            <Controller
              name="fullname"
              control={control}
              rules={{ required: '이름은 필수입니다' }}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  className="w-full h-[48px] placeholder:text-text4"
                  placeholder="이름"
                  type="text"
                  error={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{ required: '이메일은 필수입니다' }}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  className="w-full h-[48px] placeholder:text-text4"
                  placeholder="이메일"
                  type="email"
                  error={fieldState.error?.message}
                />
              )}
            />
            <div className="flex w-full gap-[4px]">
              <Controller
                name="nickname"
                control={control}
                rules={{ required: '닉네임은 필수입니다' }}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    className="w-[224px] h-[48px] placeholder:text-text4"
                    placeholder="닉네임"
                    type="text"
                    error={
                      nicknameCheckMessage?.status === 409
                        ? nicknameCheckMessage?.message
                        : fieldState.error?.message
                    }
                    success={
                      nicknameCheckMessage?.status === 200
                        ? nicknameCheckMessage?.message
                        : undefined
                    }
                  />
                )}
              />
              <CommonButton
                type="button"
                variant="grayStyle"
                className="text-[16px]"
                onClick={handleDuplicateNicknameCheck}
              >
                중복확인
              </CommonButton>
            </div>
            <div className="flex w-full gap-[4px]">
              <Controller
                name="phone_number"
                control={control}
                rules={{ required: '휴대전화는 필수입니다' }}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    className="w-[224px] h-[48px] placeholder:text-text4"
                    placeholder="휴대전화"
                    type="number"
                    error={fieldState.error?.message}
                    success={receivedAuthCode?.message}
                  />
                )}
              />
              <CommonButton
                type="button"
                variant={receivedAuthCode ? 'secondary' : 'grayStyle'}
                className={cn(
                  'w-full text-[16px]',
                  receivedAuthCode ? 'border border-primary' : ''
                )}
                onClick={requestPhoneAuthCode}
              >
                {receivedAuthCode ? '재전송' : '인증번호전송'}
              </CommonButton>
            </div>
            {receivedAuthCode && (
              <div className="flex w-full gap-[4px]">
                <InputField
                  className="w-[224px] h-[48px] placeholder:text-text4"
                  value={enteredAuthCode}
                  onChange={(e) => setEnteredAuthCode(e.target.value)}
                  error={
                    codeCheckMessage?.status !== 200
                      ? codeCheckMessage?.message
                      : undefined
                  }
                  success={
                    codeCheckMessage?.status === 200
                      ? codeCheckMessage?.message
                      : undefined
                  }
                />
                <CommonButton
                  type="button"
                  variant="grayStyle"
                  disabled={!/^\d{6}$/.test(enteredAuthCode)}
                  className={cn(
                    'w-full text-[16px]',
                    /^\d{6}$/.test(enteredAuthCode) &&
                      'bg-secondary text-primary border border-primary hover:bg-secondary-hover '
                  )}
                  onClick={phoneAuthCodeverify}
                >
                  인증번호확인
                </CommonButton>
              </div>
            )}
            <Controller
              name="password"
              control={control}
              rules={{ required: '비밀번호는 필수입니다' }}
              render={({ field, fieldState }) => (
                <InputField
                  {...field}
                  className="w-full h-[48px] placeholder:text-text4"
                  placeholder="비밀번호"
                  type="password"
                  error={fieldState.error?.message}
                />
              )}
            />
            <div>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <div>성별*</div>
                    <div className="flex gap-[4px]">
                      {['남', '여'].map((genderOption) => (
                        <CommonButton
                          type="button"
                          key={genderOption}
                          variant={
                            field.value === genderOption
                              ? 'primary'
                              : 'secondary'
                          }
                          className="text-[16px] font-light border-primary border-[1px]"
                          onClick={() => field.onChange(genderOption)}
                        >
                          {genderOption === '남' ? '남자' : '여자'}
                        </CommonButton>
                      ))}
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <CommonButton
              variant="disabled"
              disabled={!isValid || !isAvailableNickname || !isCodeVerified}
              className={`text-[15px] w-full ${isValid && isAvailableNickname && isCodeVerified ? 'cursor-pointer bg-primary text-text3 hover:bg-primary-hover' : ''}  `}
            >
              다음
            </CommonButton>
            {submitErrorMessage && (
              <p className="text-xs text-alertText font-medium mt-1">
                * {submitErrorMessage.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
