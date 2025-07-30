import InputField from '@/common/InputField'
import { useState } from 'react'
import CommonButton from '@/common/CommonButton'
import { useNavigate } from 'react-router-dom'

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [checkNewPassword, setCheckNewPassword] = useState('')
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/auth/reset-password/success')
  }
  return (
    <div className="flex flex-col items-center justify-center bg-white h-[856px]">
      <div className="flex flex-col items-center justify-center gap-[64px]">
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <div className="text-[32px] font-semibold">비밀번호 찾기</div>
          <div className="flex flex-col items-center justify-center text-[16px] text-disabled-text">
            <div>test123@storbit.com의 비밀번호를 재설정 합니다</div>
            <div>
              영문, 숫자, 특수문자 포함하여 공백없이 8~20자 입력 해주세요
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[40px]">
          <div className="flex flex-col w-[400px] pace-y-3 gap-[12px]">
            <InputField
              className="w-full h-12 placeholder:text-text4"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="number"
              // error={error}
              // success={success}
            />
            <InputField
              className="w-full h-12 placeholder:text-text4"
              placeholder="새 비밀번호 확인"
              value={checkNewPassword}
              onChange={(e) => setCheckNewPassword(e.target.value)}
              type="number"
              // error={error}
              // success={success}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-[24px] w-full">
            <CommonButton className="text-[15px]" onClick={handleClick}>
              저장
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  )
}
