import CommonButton from '@/common/CommonButton'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

export default function ResetPasswordSuccessPage() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/login')
  }
  return (
    <div className="flex flex-col items-center justify-center bg-white h-[856px]">
      <div className="flex flex-col items-center justify-center gap-[40px] w-[400px]">
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <div className="text-[32px] font-semibold">비밀번호 변경 완료!</div>
          <AiOutlineCheckCircle className="text-[76px] text-primary" />
        </div>
        <div className="flex flex-col items-center justify-center gap-[40px] w-full">
          <div className="flex flex-col items-center justify-center text-[16px] text-text1 font-light">
            <div>비밀번호가 변경되었어요!</div>
            <div>이제 새 비밀번호로 로그인할 수 있습니다.</div>
          </div>
          <CommonButton className="text-[15px] w-full" onClick={handleClick}>
            로그인
          </CommonButton>
        </div>
      </div>
    </div>
  )
}
