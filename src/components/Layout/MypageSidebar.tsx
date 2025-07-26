import { Link } from 'react-router-dom'

export default function MypageSidebar() {
  return (
    <div className="flex flex-col text-white gap-[10px]">
      <Link
        className="bg-amber-600 rounded-[5px] w-[120px] h-[40px] flex items-center justify-center"
        to="/mypage/account"
      >
        계정설정
      </Link>
      <Link
        className="bg-amber-600 rounded-[5px] w-[120px] h-[40px] flex items-center justify-center"
        to="/mypage/planner"
      >
        스터디 플래너
      </Link>
      <Link
        className="bg-amber-600 rounded-[5px] w-[120px] h-[40px] flex items-center justify-center"
        to="/mypage/messages/inbox"
      >
        쪽지함
      </Link>
    </div>
  )
}
