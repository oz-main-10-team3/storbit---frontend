import { NavLink, Outlet } from 'react-router-dom'

export default function MessageLayout() {
  const baseStyle = 'text-[#bdbdbd] '
  const activeStyle = 'text-text2' // 원하는 활성화 스타일
  return (
    <div className="flex flex-col gap-[24px] mt-[88px] ml-[160px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-[12px] text-[20px]">
          <NavLink
            to="/mypage/messages/inbox"
            className={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          >
            받은쪽지
          </NavLink>
          <div>|</div>
          <NavLink
            to="/mypage/messages/sent"
            className={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          >
            보낸쪽지
          </NavLink>
          <div>|</div>
          <NavLink
            to="/mypage/messages/compose"
            className={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          >
            쪽지보내기
          </NavLink>
        </div>
        <div className="text-[16px] text-[#bdbdbd] cursor-pointer">
          전체 삭제
        </div>
      </div>
      <Outlet />
    </div>
  )
}
