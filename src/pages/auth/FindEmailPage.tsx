import { Link } from 'react-router-dom'

export default function FindEmailPage() {
  return (
    <>
      <div className="text-2xl">이메일 찾기</div>
      <Link
        className="bg-emerald-300 rounded-[5px] w-[150px] h-[30px] flex items-center justify-center"
        to="/auth/find-email/success"
      >
        이메일 찾기 완료
      </Link>
    </>
  )
}
