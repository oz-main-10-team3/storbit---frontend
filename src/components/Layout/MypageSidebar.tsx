import { NavLink, useLocation } from 'react-router-dom'
import { useUserInfo } from '@/store/userInfoStore'
import defaultUserImg from '@/assets/images/default-profile.png'
import { isKakaoUser } from '@/utils/isKakaoUser'

const MENUITEMS = [
  { path: '/mypage/account', label: '계정 설정' },
  { path: '/mypage/planner', label: '스터디 플래너' },
  {
    path: '/mypage/messages/inbox',
    label: '쪽지함',
    matchPaths: [
      '/mypage/messages/inbox',
      '/mypage/messages/sent',
      '/mypage/messages/compose',
    ],
  },
] as const

export default function MypageSidebar() {
  const location = useLocation()
  const currentPath = location.pathname
  const userInfo = useUserInfo((state) => state.userInfo)

  return (
    <div className="flex flex-col justify-start items-center gap-[45px] w-[272px] ml-[260px] mt-[88px]">
      <div className="flex flex-col items-center gap-[23px] w-full">
        <div className="w-[272px] flex justify-between gap-[20px]">
          <img
            src={userInfo?.profile_image || defaultUserImg}
            alt="유저프로필이미지"
            className="w-[80px] h-[80px] shrink-0 object-cover rounded-full"
          />
          <div className="flex flex-col justify-center w-full text-left">
            <div className="text-[20px]">
              {isKakaoUser(userInfo)
                ? userInfo.nickname
                : (userInfo?.nickname ?? '닉네임')}
            </div>
            <div className="text-[15px] text-text4">
              {isKakaoUser(userInfo)
                ? userInfo.email
                : (userInfo?.email ?? '이메일')}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-around items-center text-[12px] h-[64px] border-primary border-[1px] px-[31px] rounded-[4px]">
          <div className="flex flex-col items-center justify-center">
            <div>총 공부시간</div>
            <div className="font-light text-text2">1234 시간</div>
          </div>
          <div className="h-[26px] border-[0.5px] border-primary scale-x-50 origin-left">
            {/*세로줄 UI*/}
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>참여한 스터디</div>
            <div className="font-light text-text2">99+</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[40px] text-sm text-text font-medium self-start">
        {MENUITEMS.map((item) => {
          const { path, label } = item

          const isMatched =
            ('matchPaths' in item
              ? item.matchPaths.some((mp) => currentPath.startsWith(mp))
              : false) || currentPath.startsWith(path)

          return (
            <NavLink
              key={path}
              to={path}
              className={() =>
                `text-[20px] transition-colors duration-150 ${
                  isMatched ? 'text-primary font-bold' : 'text-[#BDBDBD]'
                }`
              }
            >
              {label}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
