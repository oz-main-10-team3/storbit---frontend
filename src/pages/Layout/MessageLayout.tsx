import { Link, Outlet } from 'react-router'

export default function MessageLayout() {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex gap-[10px] text-white">
        <Link
          className="bg-emerald-300 rounded-[5px] w-[100px] h-[30px] flex items-center justify-center"
          to="/mypage/messages/inbox"
        >
          받은쪽지함
        </Link>
        <Link
          className="bg-emerald-300 rounded-[5px] w-[100px] h-[30px] flex items-center justify-center"
          to="/mypage/messages/sent"
        >
          보낸쪽지함
        </Link>
        <Link
          className="bg-emerald-300 rounded-[5px] w-[100px] h-[30px] flex items-center justify-center"
          to="/mypage/messages/compose"
        >
          쪽지보내기
        </Link>
      </div>
      <Outlet />
    </div>
  )
}
