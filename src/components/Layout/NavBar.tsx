import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className="flex gap-[20px] m-7 text-white">
      <Link
        className="bg-amber-600 rounded-[5px] w-[100px] h-[40px] flex items-center justify-center"
        to="/study/category/1"
      >
        카테고리
      </Link>
      <Link
        className="bg-amber-600 rounded-[5px] w-[100px] h-[40px] flex items-center justify-center"
        to="/"
      >
        홈
      </Link>
      <Link
        className="bg-amber-600 rounded-[5px] w-[100px] h-[40px] flex items-center justify-center"
        to="/mystudy/applied"
      >
        나의 스터디
      </Link>
      <Link
        className="bg-amber-600 rounded-[5px] w-[100px] h-[40px] flex items-center justify-center"
        to="/study/create"
      >
        스터디 만들기
      </Link>
      <Link
        className="bg-amber-600 rounded-[5px] w-[100px] h-[40px] flex items-center justify-center"
        to="/event"
      >
        이벤트
      </Link>
      <Link
        className="bg-blue-300 rounded-[5px] w-[100px] h-[40px] flex items-center justify-center"
        to="/mypage/account"
      >
        마이페이지
      </Link>
      <Link
        className="bg-blue-300 rounded-[5px] w-[100px] h-[40px] flex items-center justify-center"
        to="/auth/signup"
      >
        회원가입
      </Link>
      <Link
        className="bg-blue-300 rounded-[5px] w-[100px] h-[40px] flex items-center justify-center"
        to="/login"
      >
        로그인
      </Link>
    </div>
  )
}
