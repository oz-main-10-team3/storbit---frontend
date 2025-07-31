import InputField from '@/common/InputField'
import { useState } from 'react'
import CommonButton from '@/common/CommonButton'
import { useNavigate } from 'react-router-dom'

export default function FindEmailPage() {
  const [email, setEmail] = useState('')
  const [validationCode, setValidationCode] = useState('')
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/auth/find-email/success')
  }
  return (
    <div className="flex flex-col items-center justify-center bg-white h-[856px]">
      <div className="flex flex-col items-center justify-center gap-[64px]">
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <div className="text-[32px] font-semibold">계정찾기</div>
          <div className="text-[16px] text-disabled-text">
            가입 당시 입력했던 휴대전화번호를 입력하세요
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[40px]">
          <div className="flex flex-col w-[400px] pace-y-3 gap-[12px]">
            <div className="flex w-full gap-[4px]">
              <InputField
                className="w-[284px] h-12 placeholder:text-text4"
                placeholder="휴대전화"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="number"
                // error={error}
                // success={success}
              />
              <CommonButton variant="grayStyle" className="w-full text-[16px]">
                인증번호전송
              </CommonButton>
            </div>
            <div className="flex w-full gap-[4px]">
              <InputField
                className="w-[284px] h-12 placeholder:text-text4"
                placeholder="인증번호"
                value={validationCode}
                onChange={(e) => setValidationCode(e.target.value)}
                type="number"
                // error={error}
                // success={success}
              />
              <CommonButton variant="grayStyle" className="w-full text-[16px]">
                인증번호확인
              </CommonButton>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-[24px] w-full">
            <CommonButton className="text-[15px]" onClick={handleClick}>
              계정 찾기
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  )
}
