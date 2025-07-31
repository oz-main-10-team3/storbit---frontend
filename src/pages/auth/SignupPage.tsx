import InputField from '@/common/InputField'
import CommonButton from '@/common/CommonButton'
import { useNavigate } from 'react-router-dom'
import type { SignupForm } from '@/types/signupForm'
import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import signupFormSchema from '@/schemas/signupFormSchema'

export default function SignupPage() {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignupForm>({
    resolver: joiResolver(signupFormSchema), // Joi를 React Hook Form과 연결
    defaultValues: {
      name: '',
      email: '',
      nickname: '',
      phone: '',
      password: '',
      gender: '남', // 또는 '남'/'여' 중 기본값
    },
    mode: 'onChange', // 입력값이 변경될 때마다 유효성 검사
  })

  const onSubmit = (_data: SignupForm) => {
    // console.log('Form Data:', data)
    // 여기에 회원가입 로직을 추가하세요
    navigate('/auth/signup/terms') // 회원가입 성공 페이지로 이동
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white h-[856px]">
      <div className="flex flex-col items-center justify-center gap-[56px] w-[344px]">
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <div className="text-[32px] font-semibold">계정찾기</div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-[40px]"
        >
          <div className="flex flex-col pace-y-3 gap-[16px]">
            <Controller
              name="name"
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
                    error={fieldState.error?.message}
                  />
                )}
              />
              <CommonButton
                type="button"
                variant="grayStyle"
                className="w-full text-[16px]"
              >
                중복확인
              </CommonButton>
            </div>
            <div className="flex w-full gap-[4px]">
              <Controller
                name="phone"
                control={control}
                rules={{ required: '휴대전화는 필수입니다' }}
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    className="w-[224px] h-[48px] placeholder:text-text4"
                    placeholder="휴대전화"
                    type="number"
                    error={fieldState.error?.message}
                  />
                )}
              />
              <CommonButton
                type="button"
                variant="grayStyle"
                className="w-full text-[16px]"
              >
                인증번호전송
              </CommonButton>
            </div>
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
          <div className="flex flex-col justify-center items-center gap-[24px] w-full">
            <CommonButton
              variant="disabled"
              disabled={!isValid}
              className={`text-[15px] w-full ${isValid ? 'cursor-pointer bg-primary text-text3 hover:bg-primary-hover' : ''}  `}
            >
              다음
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  )
}
