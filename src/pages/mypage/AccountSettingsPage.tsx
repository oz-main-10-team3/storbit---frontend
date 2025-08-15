import InputField from '@/common/InputField'
import CommonButton from '@/common/CommonButton'
import { Link, useNavigate } from 'react-router-dom'
import { FaComment } from 'react-icons/fa'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { useUserInfo } from '@/store/userInfoStore'
import { isKakaoUser } from '@/utils/isKakaoUser'
import defaultUserImg from '@/assets/images/default-profile.png'

export default function AccountSettingsPage() {
  const userInfo = useUserInfo((state) => state.userInfo)

  const navigate = useNavigate()

  const handleSubmit = (_e: React.FormEvent<HTMLFormElement>) => {
    // console.log('Form Data:', data)
    // 여기에 회원가입 로직을 추가하세요
    navigate('/auth/signup/terms') // 회원가입 성공 페이지로 이동
  }

  return (
    <div className="flex flex-col items-center justify-start bg-white mt-[88px] ml-[160px] pb-[20px]">
      <div className="flex flex-col items-center justify-center gap-[72px] self-start">
        <img
          src={userInfo?.profile_image ?? defaultUserImg}
          alt="유저프로필이미지"
          className="rounded-full w-[96px] h-[96px] self-start object-cover"
        />
        <div className="flex flex-col items-center justify-center gap-[32px] w-[400px]">
          <div className="text-[24px] font-semibold self-start">회원정보</div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-[40px] w-full"
          >
            <div className="flex flex-col pace-y-3 gap-[16px] w-full">
              <InputField
                className="w-full h-[48px] bg-disabled-fill placeholder:text-text4"
                placeholder={
                  isKakaoUser(userInfo) ? userInfo.nickname : userInfo?.fullname
                }
                type="text"
                disabled
              />

              <InputField
                className="w-full h-[48px] placeholder:text-text4 bg-disabled-fill"
                placeholder={userInfo?.email}
                type="email"
                disabled
              />

              <div className="flex w-full gap-[4px]">
                <InputField
                  className="w-[284px] h-[48px] placeholder:text-text4"
                  placeholder={userInfo?.nickname}
                  type="text"
                />

                <CommonButton
                  type="button"
                  variant="grayStyle"
                  className="w-full text-[16px] "
                >
                  중복확인
                </CommonButton>
              </div>
              <div className="flex w-full gap-[4px]">
                <InputField
                  className="w-[284px] h-[48px] placeholder:text-text4 bg-disabled-fill"
                  placeholder={
                    isKakaoUser(userInfo)
                      ? (userInfo.phone ?? '')
                      : userInfo?.phone_number
                  }
                  type="number"
                  disabled
                />
                <CommonButton
                  type="button"
                  variant="grayStyle"
                  className="w-full text-[16px]"
                >
                  변경
                </CommonButton>
              </div>

              <InputField
                className="w-full h-[48px] placeholder:text-text4"
                placeholder="비밀번호"
                type="password"
              />
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-[80px] w-full">
          <div className="flex flex-col w-full gap-[32px]">
            <div className="text-[24px] font-semibold">계정 연결하기</div>
            <CommonButton
              variant="grayStyle"
              className="flex justify-between items-center w-full h-[56px] px-[16px] bg-white hover:bg-[#f8f5f5]"
              onClick={() => {}}
            >
              <div className="flex items-center text-[16px] justify-center">
                <FaComment className="mr-2 text-[#fee500]" />
                <div>카카오톡으로 계정 연결하기</div>
              </div>
              <div className="flex items-center gap-[15px] text-disabled-text">
                <MdOutlineArrowForwardIos className="text-[20px] text-text2" />
              </div>
            </CommonButton>
          </div>
          <div className="flex flex-col gap-[24px] items-center justify-center">
            <CommonButton variant="disabled">변경내용 저장</CommonButton>
            <Link
              to="/auth/account-delete"
              className="text-[16px] text-text1 underline"
            >
              회원탈퇴
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
