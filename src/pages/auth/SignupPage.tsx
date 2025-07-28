import { Link } from 'react-router-dom'

export default function SignupPage() {
  return (
    <>
      <div className="text-2xl">회원가입페이지</div>
      <Link
        className="bg-emerald-300 rounded-[5px] w-[150px] h-[30px] flex items-center justify-center"
        to="/auth/signup/terms"
      >
        약관동의 페이지 이동
      </Link>
    </>
  )
}
