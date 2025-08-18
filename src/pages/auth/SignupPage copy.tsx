import InputField from '@/common/InputField'
import CommonButton from '@/common/CommonButton'
import { useNavigate } from 'react-router-dom'
import type { SignupForm } from '@/types/signupForm'
import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import signupFormSchema from '@/schemas/signupFormSchema'
import { mainApi } from '@/api/mainApi'
import type { AxiosError } from 'axios'
import { useState } from 'react'
import type { ErrorMessage } from '@/types/errorMessage'
import useCountdown from '@/hooks/useCountdown'
import { cn } from '@/utils/cn'

export default function SignupPage() {
  const navigate = useNavigate()
  const [submitErrorMessage, setSubmitErrorMessage] =
    useState<ErrorMessage | null>(null)

  const [codeCheckMessage, setCodeCheckMessage] = useState<ErrorMessage | null>(
    null
  )
  const [emailReceivedAuthCode, setEmailReceivedAuthCode] =
    useState<ErrorMessage | null>(null)
  const [enteredEmailCode, setEnteredEmailCode] = useState<string>('')
  const [isEmailCodeVerified, setIsEmailCodeVerified] = useState(false)
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false)

  const {
    timeLeft,
    start: EmailCodeVerifyCountStart,
    stop: EmailCodeVerifyCountStop,
  } = useCountdown({
    duration: 300,
  }) // 5분

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<SignupForm>({
    resolver: joiResolver(signupFormSchema), // Joi 스키마(유효성양식) React Hook Form과 연결
    defaultValues: {
      // form 기본값 지정
      fullname: '',
      email: '',
      nickname: '',
      phone_number: '',
      password: '',
      gender: 'M',
    },
    mode: 'onChange', // 입력값이 변경될 때마다 유효성 검사
  })

  const onSubmit = async (data: SignupForm) => {
    try {
      const res = await mainApi.post('/api/auth/signup/', data)
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

  const requestEmailAuthCode = async () => {
    const email = getValues('email')
    try {
      const res = await mainApi.post('/api/auth/send-code/', { email })
      if (res.status === 200) {
        setEmailReceivedAuthCode({
          status: res.status,
          message: res.data.detail,
        })
        setIsEmailCodeSent(true)
        EmailCodeVerifyCountStart() // 인증시간 5분 시작
        return
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>
      if (!axiosError.status) return
      setEmailReceivedAuthCode(null)
    }
  }

  const handleEmailCodeVerify = async () => {
    const email = getValues('email')
    try {
      const res = await mainApi.post('/api/auth/code-verify/', {
        email,
        code: enteredEmailCode,
      })
      if (res.status === 200) {
        setIsEmailCodeVerified(true)
        setCodeCheckMessage({ status: res.status, message: res.data.message })
        setIsEmailCodeSent(false)
        EmailCodeVerifyCountStop() // 인증 시간 종료

        return
      }
      setIsEmailCodeVerified(false)
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>
      if (!axiosError.status) return
      setCodeCheckMessage({
        status: axiosError.status,
        message:
          axiosError.response?.data.detail ?? '알 수 없는 오류가 발생했습니다.',
      })
      setIsEmailCodeVerified(false)
    }
  }

  return (
    <div className="flex flex-col mx-auto items-center justify-center gap-[56px] w-[344px] my-[113px]">
      <div className="text-[32px] font-semibold w-full text-center">
        회원가입
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-[40px] w-full"
      >
        <div className="flex flex-col pace-y-3 gap-[16px] w-full">
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
          <Controller
            name="nickname"
            control={control}
            rules={{ required: '닉네임은 필수입니다' }}
            render={({ field }) => (
              <InputField
                {...field}
                className="w-full h-[48px] placeholder:text-text4"
                placeholder="닉네임"
                type="text"
              />
            )}
          />
          <Controller
            name="phone_number"
            control={control}
            rules={{ required: '휴대전화는 필수입니다' }}
            render={({ field, fieldState }) => (
              <InputField
                {...field}
                className="w-full h-[48px] placeholder:text-text4"
                placeholder="휴대전화"
                type="number"
                error={fieldState.error?.message}
              />
            )}
          />
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
                    {['M', 'F'].map((genderOption) => (
                      <CommonButton
                        type="button"
                        key={genderOption}
                        variant={
                          field.value === genderOption ? 'primary' : 'secondary'
                        }
                        className="text-[16px] font-light border-primary border-[1px]"
                        onClick={() => field.onChange(genderOption)}
                      >
                        {genderOption === 'M' ? '남자' : '여자'}
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
            disabled={!isValid}
            className={`text-[15px] w-full ${isValid ? 'cursor-pointer bg-primary text-text3 hover:bg-primary-hover' : ''}  `}
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
              <div className="flex w-full gap-[4px]">
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: '이메일은 필수입니다' }}
                  render={({ field, fieldState }) => (
                    <InputField
                      {...field}
                      className="w-[224px] h-[48px] placeholder:text-text4"
                      placeholder="이메일"
                      type="email"
                      error={fieldState.error?.message}
                      success={emailReceivedAuthCode?.message}
                    />
                  )}
                />
                <CommonButton
                  type="button"
                  variant={emailReceivedAuthCode ? 'secondary' : 'grayStyle'}
                  className={cn(
                    'w-full text-[16px]',
                    emailReceivedAuthCode ? 'border border-primary' : ''
                  )}
                  onClick={requestEmailAuthCode}
                >
                  {emailReceivedAuthCode ? '재전송' : '인증번호전송'}
                </CommonButton>
              </div>
              {emailReceivedAuthCode && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex w-full gap-[4px]">
                    <InputField
                      className="w-[224px] h-[48px] placeholder:text-text4"
                      value={enteredEmailCode}
                      onChange={(e) => setEnteredEmailCode(e.target.value)}
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
                      className={cn(
                        'w-full text-[16px]',
                        /^\d{6}$/.test(enteredEmailCode) &&
                          'bg-secondary text-primary border border-primary hover:bg-secondary-hover '
                      )}
                      onClick={handleEmailCodeVerify}
                    >
                      인증번호확인
                    </CommonButton>
                  </div>
                  <div>
                    {isEmailCodeSent ? (
                      <div className="pl-[2px] mt-[8px]">
                        <p className="text-[12px] text-red-500">
                          {timeLeft > 0
                            ? `* 남은 시간 ${Math.floor(timeLeft / 60)
                                .toString()
                                .padStart(2, '0')}:${(timeLeft % 60)
                                .toString()
                                .padStart(
                                  2,
                                  '0'
                                )} 내에 인증번호를 입력해 주세요`
                            : '* 인증 시간이 만료되었습니다'}
                        </p>
                      </div>
                    ) : undefined}
                  </div>
                </div>
              )}
              <Controller
                name="nickname"
                control={control}
                rules={{ required: '닉네임은 필수입니다' }}
                render={({ field }) => (
                  <InputField
                    {...field}
                    className="w-full h-[48px] placeholder:text-text4"
                    placeholder="닉네임"
                    type="text"
                  />
                )}
              />
              <Controller
                name="phone_number"
                control={control}
                rules={{ required: '휴대전화는 필수입니다' }}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    className="w-full h-[48px] placeholder:text-text4"
                    placeholder="휴대전화"
                    type="number"
                    error={fieldState.error?.message}
                  />
                )}
              />

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
                disabled={!isValid || !isEmailCodeVerified}
                className={`text-[15px] w-full ${isValid && isEmailCodeVerified ? 'cursor-pointer bg-primary text-text3 hover:bg-primary-hover' : ''}  `}
              >
                다음
              </CommonButton>
              {submitErrorMessage && isEmailCodeVerified && (
                <p className="text-xs text-alertText font-medium mt-1">
                  * {submitErrorMessage.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
