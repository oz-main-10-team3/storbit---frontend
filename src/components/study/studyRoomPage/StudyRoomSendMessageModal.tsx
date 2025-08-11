import { useRef, type PropsWithChildren } from 'react'
import { IoIosClose } from 'react-icons/io'
import ModalWrapper from '@/common/ModalWrapper'
import CommonButton from '@/common/CommonButton'
import useClickOutside from '@/hooks/useClickOutside'

interface CommonModalBaseProps {
  isOpen: boolean
  onClose: () => void
  title: string
  className?: string
  messageSender: string
}

type CommonModalProps = PropsWithChildren<CommonModalBaseProps>

export default function StudyRoomSendMessageModal({
  isOpen,
  onClose,
  title,
  className,
  messageSender,
}: CommonModalProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      onClose()
    }
  })
  if (!isOpen) return null

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

      {/* 콘텐츠 */}
      <div className="mt-6 w-full">
        <div className="flex text-[16px] gap-[16px]">
          <div className="font-semibold">받는사람</div>
          <div>{messageSender}</div>
        </div>
      </div>
      <div className="flex flex-col self-start mt-[16px] text-[16px] text-text gap-[16px]">
        <div className="flex">
          <div className="font-semibold">메세지</div>
          <div className="text-alertText ">*</div>
        </div>
        <textarea
          className="w-[480px] h-[104px] border border-[#bdbdbd] rounded-[4px] bg-white resize-none overflow-hidden px-[16px] py-[10px] placeholder:text-[14px] placeholder:text-[#bdbdbd]"
          placeholder="메세지를 작성해주세요"
        />
      </div>
      <CommonButton className="mt-[16px]">쪽지 보내기</CommonButton>
    </ModalWrapper>
  )
}
