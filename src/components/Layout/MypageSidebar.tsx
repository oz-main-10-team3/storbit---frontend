import { NavLink } from 'react-router-dom'
import profileImage from '@/assets/images/default-profile.png'

const menuItems = [
  { path: '/mypage/account', label: '계정 설정' },
  { path: '/mypage/planner', label: '스터디 플래너' },
  { path: '/mypage/messages/inbox', label: '쪽지함' },
]

export default function MypageSidebar() {
  return (
    <div className="flex flex-col justify-center items-center gap-[45px] w-[272px] ml-[260px] mt-[88px]">
      <div className="flex flex-col items-center gap-[23px] w-full">
        <div className="w-full flex justify-between gap-[20px]">
          <img
            src={profileImage}
            alt="유저프로필이미지"
            className="rounded-full w-[80px]"
          />
          <div className="flex flex-col justify-center text-left w-full">
            <div className="text-[20px]">뭉치면 주먹밥</div>
            <div className="text-[15px] text-text4">example@onstudy.com</div>
          </div>
        </div>
        <div className="flex w-full justify-around items-center text-[12px] h-[64px] border-primary border-[1px] px-[31px] rounded-[4px]">
          <div className="flex flex-col items-center justify-center">
            <div>총 공부시간</div>
            <div className="text-text2 font-light">1234 시간</div>
          </div>
          <div className="h-[26px] border-[0.5px] border-primary scale-x-50 origin-left">
            {/*세로줄 UI*/}
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>참여한 스터디</div>
            <div className="text-text2 font-light">99+</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[40px] text-sm text-text font-medium self-start">
        {menuItems.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `text-[20px] transition-colors duration-150 ${
                isActive ? 'text-primary font-bold' : 'text-[#BDBDBD]'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
