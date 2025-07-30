import CommonButton from '@/common/CommonButton'
import { Link } from 'react-router-dom'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { FaComment } from 'react-icons/fa'

export default function FindEmailSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-white h-[856px]">
      <div className="flex flex-col items-center justify-center gap-[64px]">
        <div className="flex flex-col items-center justify-center gap-[24px]">
          <div className="text-[32px] font-semibold">계정찾기 완료!</div>
          <div className="flex flex-col justify-center items-center text-[16px] text-disabled-text">
            <div>01012345678로 가입된 계정이 있어요</div>
            <div>기존 계정을 통해 로그인 하세요</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-[32px]">
          <div className="flex flex-col w-[400px] pace-y-3 gap-[12px]">
            <CommonButton
              variant="grayStyle"
              className="flex justify-between items-center w-full h-[56px] px-[16px] bg-white hover:bg-[#f8f5f5]"
              onClick={() => {}}
            >
              <div className="flex items-center">
                <FaComment className="mr-2 text-[#fee500]" />
                <div>tes****@storbit.com</div>
              </div>
              <div className="flex items-center gap-[15px] text-disabled-text">
                <div>25.12.31</div>
                <MdOutlineArrowForwardIos className="text-[20px] text-text2" />
              </div>
            </CommonButton>
            <CommonButton
              variant="grayStyle"
              className="flex justify-between items-center w-full h-[56px] px-[16px] bg-white hover:bg-[#f8f5f5]"
              onClick={() => {}}
            >
              <div className="flex items-center">
                <div>tes****@storbit.com</div>
              </div>
              <div className="flex items-center gap-[15px] text-disabled-text">
                <div>25.12.31</div>
                <MdOutlineArrowForwardIos className="text-[20px] text-text2" />
              </div>
            </CommonButton>
          </div>
          <div className="flex flex-col justify-center items-center gap-[24px] w-full">
            <Link
              to="/auth/find-password"
              className='className="flex text-[16px] text-text2 gap-[8px] font-light underline'
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
