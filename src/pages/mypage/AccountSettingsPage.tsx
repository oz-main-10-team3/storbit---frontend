import { Link } from 'react-router-dom'

export default function AccountSettingsPage() {
  return (
    <>
      <div className="text-2xl">계정 설정</div>
      <Link
        className="bg-amber-600 rounded-[5px] w-[120px] h-[40px] flex items-center justify-center"
        to="/auth/account-delete"
      >
        회원 탈퇴
      </Link>
    </>
  )
}
