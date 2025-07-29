import { useEffect } from 'react'
import { cn } from '@/utils/cn'
import { IoCheckmarkCircle } from 'react-icons/io5'

interface ToastMessageProps {
  message: string
  duration?: number
  onClose?: () => void
  className?: string
}

const ToastMessage = ({ message, duration = 3000, onClose, className }: ToastMessageProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={cn(
        'absolute top-[-64px] left-1/2 -translate-x-1/2 z-50',
        'inline-flex items-center h-[48px] rounded-lg bg-white shadow-md px-4 gap-2',
        className
      )}
    >
      <div className="w-6 h-6 flex items-center justify-center rounded-full">
        <IoCheckmarkCircle className="text-[#8E61FF] w-[24px] h-[24px]" />
      </div>
      <span className="text-sm text-gray-700 whitespace-nowrap">{message}</span>
    </div>
  )
}

export default ToastMessage