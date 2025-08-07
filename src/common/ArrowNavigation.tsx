import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface ArrowNavigationProps {
  onPrev: () => void
  onNext: () => void
  isPrevDisabled?: boolean
  isNextDisabled?: boolean
}

export default function ArrowNavigation({
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
}: ArrowNavigationProps) {
  return (
    <div className="flex gap-[8px] items-center">
      <button
        onClick={onPrev}
        disabled={isPrevDisabled}
        className="flex items-center justify-center w-[32px] h-[32px] text-[#8349FF] disabled:opacity-30
          cursor-pointer"
      >
        <FiChevronLeft className="w-[20px] h-[20px]" />
      </button>
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="flex items-center justify-center w-[32px] h-[32px] text-[#8349FF] disabled:opacity-30 cursor-pointer"
      >
        <FiChevronRight className="w-[20px] h-[20px]" />
      </button>
    </div>
  )
}
