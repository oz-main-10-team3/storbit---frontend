import { type ReactNode } from 'react'
import { IoIosClose } from 'react-icons/io'
import ModalWrapper from './ModalWrapper'

interface CommonModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export default function CommonModal({
  isOpen,
  onClose,
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
        className="absolute top-4 right-4 text-[#BDBDBD] text-xl"
        onClick={onClose}
      >
        <IoIosClose />
      </button>

      {/* 타이틀 */}
      <h2 className="text-center text-[24px] font-bold text-[#8349FF]">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-center text-[16px] text-[#BDBDBD]">{subtitle}</p>
      )}

      {/* 콘텐츠 */}
      <div className="mt-6 w-full">{children}</div>
    </ModalWrapper>
  )
}