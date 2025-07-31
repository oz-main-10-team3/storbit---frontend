import { FaComment } from 'react-icons/fa'
import InputField from '@/common/InputField'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CommonButton from '@/common/CommonButton'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // console.log(!!emailSchema.validate(email), emailSchema.validate(email).error)
  return (
    <div className="flex flex-col items-center justify-center bg-white h-[856px]">
      <div className="flex flex-col items-center justify-center gap-[32px]">
        <div className="flex flex-col items-center justify-center gap-[40px]">
          <div className="text-[32px] font-semibold">로그인</div>

          {/*카카오 간편 로그인 버튼*/}
          <button className="w-[348px] h-[52px] bg-[#FEE500] text-[#391C1A] rounded flex items-center text-[16px] justify-center font-normal cursor-pointer">
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
              // error={error}
              // success={success}
            />
            <InputField
              className="w-full h-12 placeholder:text-text4"
              placeholder="비밀번호(6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // error={error}
              // success={success}
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
            <CommonButton>로그인</CommonButton>
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
