import { useRef, type PropsWithChildren, type ReactNode } from 'react'
import { IoIosClose } from 'react-icons/io'
import ModalWrapper from '@/common/ModalWrapper'
import { useInboxMessageStore } from '@/store/useInboxMessageStore'
import StudyRoomInboxMessage from '@/components/study/studyRoomPage/StudyRoomInboxMessage'
import CommonButton from '@/common/CommonButton'
import useClickOutside from '@/hooks/useClickOutside'

interface CommonModalBaseProps {
  isOpen: boolean
  onClose: () => void
  Icon?: React.ReactElement
  title: string
  subtitle?: ReactNode
  className?: string
}

type CommonModalProps = PropsWithChildren<CommonModalBaseProps>

export default function StudyRoomMessageInboxModal({
  isOpen,
  onClose,
  Icon,
  title,
  subtitle,
  className,
}: CommonModalProps) {
  const inboxMessages = useInboxMessageStore((state) => state.inboxMessages)
  const dropdownRef = useRef<HTMLDivElement>(null)
  useClickOutside(dropdownRef, () => {
    if (isOpen) {
      onClose()
    }
  })

  if (!isOpen) return null

  const handleOpenInboxMessage = () => {
    window.open('/mypage/messages/inbox', '_blank', 'noopener,noreferrer')
  }

  return (
    <ModalWrapper className={className} ref={dropdownRef}>
      {/* X 버튼 */}
      <button
        className="absolute top-4 right-4 text-[#BDBDBD] text-xl cursor-pointer"
        onClick={onClose}
      >
        <IoIosClose />
      </button>
      {Icon}
      {/* 타이틀 */}
      <h2 className="text-center mt-[20px] text-[24px] font-bold text-[#8349FF]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-[8px] text-center text-[16px] text-[#BDBDBD]">
          {subtitle}
        </p>
      )}

      {/* 콘텐츠 */}
      <div className="overflow-scroll scrollbar-hide mt-[40px] mb-[48px] h-[400px]">
        {inboxMessages.map((message) => (
          <StudyRoomInboxMessage key={message.id} message={message} />
        ))}
      </div>
      <CommonButton className="h-[48px]" onClick={handleOpenInboxMessage}>
        전체 쪽지함 보기
      </CommonButton>
    </ModalWrapper>
  )
}
