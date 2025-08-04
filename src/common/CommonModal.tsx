import { type PropsWithChildren, type ReactNode } from 'react'
import { IoIosClose } from 'react-icons/io'
import ModalWrapper from '@/common/ModalWrapper'

interface CommonModalBaseProps {
  isOpen: boolean
  onClose: () => void
  Icon?: React.ReactElement
  title: string
  subtitle?: ReactNode
  className?: string
}

type CommonModalProps = PropsWithChildren<CommonModalBaseProps>

export default function CommonModal({
  isOpen,
  onClose,
  Icon,
  title,
  subtitle,
  children,
  className,
}: CommonModalProps) {
  if (!isOpen) return null

  return (
    <ModalWrapper className={className}>
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
      <div className="mt-6 w-full">{children}</div>
    </ModalWrapper>
  )
}
