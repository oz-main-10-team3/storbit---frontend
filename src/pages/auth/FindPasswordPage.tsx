import { Link } from 'react-router-dom'

export default function FindPasswordPage() {
  return (
    <>
      <div className="text-2xl">비밀번호 찾기</div>
      <Link
        className="bg-emerald-300 rounded-[5px] w-[150px] h-[30px] flex items-center justify-center"
        to="/auth/reset-password"
      >
        비밀번호 재설정
      </Link>
    </>
  )
}
