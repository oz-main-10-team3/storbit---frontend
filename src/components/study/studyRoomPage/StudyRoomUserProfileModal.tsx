import { useRef, type PropsWithChildren } from 'react'
import { IoIosClose } from 'react-icons/io'
import ModalWrapper from '@/common/ModalWrapper'
import type { StudyCardDataType } from '@/types/StudyCardDataType'
import defaultUserImg from '@/assets/images/default-profile.png'
import StudyTag from '@/common/tag/StudyTag'
import { FaFireAlt } from 'react-icons/fa'
import { BsClock } from 'react-icons/bs'
import CommonButton from '@/common/CommonButton'
import useClickOutside from '@/hooks/useClickOutside'

interface CommonModalBaseProps {
  isOpen: boolean
  onClose: () => void
  title: string
  className?: string
  selectedUserProfile: StudyCardDataType | null
}

type CommonModalProps = PropsWithChildren<CommonModalBaseProps>

export default function StudyRoomUserProfileModal({
  isOpen,
  onClose,
  title,
  className,
  selectedUserProfile,
}: CommonModalProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      onClose()
    }
  })
  if (!isOpen || !selectedUserProfile) return null
  const { userProfile, nickname } = selectedUserProfile

  return (
    <ModalWrapper className={className} ref={dropdownRef}>
      {/* X 버튼 */}
      <button
        className="absolute top-4 right-4 text-[#BDBDBD] text-xl cursor-pointer"
        onClick={onClose}
      >
        <IoIosClose />
      </button>
      {/* 타이틀 */}
      <h2 className="text-center mt-[20px] text-[24px] font-bold text-[#8349FF]">
        {title}
      </h2>
      <img
        src={userProfile ?? defaultUserImg}
        alt={`${nickname}의 유저 이미지`}
        onError={(e) => {
          if (e.currentTarget.src !== defaultUserImg) {
            e.currentTarget.src = defaultUserImg
          }
        }}
        className="rounded-full w-[144px] mt-[32px]"
      />
      {/* 콘텐츠 */}
      <div className="mt-[32px] w-full">
        <div className="flex gap-[16px] justify-center">
          <StudyTag variant="level" text="왕초급" />
          <div>{nickname}</div>
        </div>
        <div className="flex flex-col gap-[8px] mt-[32px] text-[20px] text-text">
          <div className="flex items-center justify-between">
            <div className="flex gap-[12px] items-center">
              <FaFireAlt className="text-primary" />
              <div>연속출석</div>
            </div>
            <div>7일</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-[12px] items-center">
              <BsClock className="text-primary" />
              <div>총스터디시간</div>
            </div>
            <div>9999시간</div>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-[4px] mt-[40px]">
        <CommonButton variant="secondary" className="border border-primary">
          응원하기
        </CommonButton>
        <CommonButton variant="primary">경고하기</CommonButton>
      </div>
    </ModalWrapper>
  )
}
