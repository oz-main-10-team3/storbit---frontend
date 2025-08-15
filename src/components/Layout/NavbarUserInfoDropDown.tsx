import { useUserInfo } from '@/store/userInfoStore'
import { Link, useNavigate } from 'react-router-dom'
import { CiMail } from 'react-icons/ci'
import CommonButton from '@/common/CommonButton'
import { isKakaoUser } from '@/utils/isKakaoUser'

export default function NavbarUserInfoDropDown({
  setIsDropdownOpen,
}: {
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const userInfo = useUserInfo((state) => state.userInfo)
  const navigate = useNavigate()
  const handleClose = () => {
    setIsDropdownOpen(false)
  }
  return (
    <div className="absolute top-10 right-10 text-text bg-white shadow-lg rounded-[10px] w-[264px] h-[204px] z-50 px-[24px] py-[16px]">
      {userInfo && (
        <div>
          <div className="flex items-center gap-[8px]">
            <img
              className="w-[56px] h-[56px] rounded-full shrink-0 object-cover"
              src={
                isKakaoUser(userInfo)
                  ? userInfo.profile_image
                  : userInfo.user?.profile_image_url
              }
              alt={`${isKakaoUser(userInfo) ? userInfo.nickname : userInfo.user?.name}의 프로필 이미지`}
            />
            <div>
              <div className="flex items-center justify-between">
                <div className="text-[15px]">
                  {isKakaoUser(userInfo)
                    ? userInfo.nickname
                    : userInfo.user?.nickname}
                </div>
                <Link
                  to="/mypage/messages/inbox"
                  className="cursor-pointer"
                  onClick={handleClose}
                >
                  <CiMail />
                </Link>
              </div>
              <div className="text-[12px] text-text4">
                {isKakaoUser(userInfo) ? userInfo.email : userInfo.user?.email}
              </div>
            </div>
          </div>
          <CommonButton
            className="mt-[8px] rounded-[4px] h-[32px]"
            onClick={() => {
              navigate('/mypage/planner')
              handleClose()
            }}
          >
            마이페이지
          </CommonButton>
          <div className="flex flex-col gap-[8px] text-[12px] text-text4 mt-[16px]">
            <Link to="/mystudy/created" onClick={handleClose}>
              내 스터디 리스트
            </Link>
            <Link to="/mystudy/applied" onClick={handleClose}>
              스터디 신청 내역
            </Link>
            <Link to="/mystudy/favorites" onClick={handleClose}>
              찜한 스터디
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
