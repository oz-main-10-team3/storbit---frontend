import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import hourGlassIcon from '@/assets/icons/HourglassIcon.png'
import matchingCompleteIcon from '@/assets/icons/MatchingCompletedIcon.png'
import failedicon from '@/assets/icons/FailedIcon.png'
import timerIcon from '@/assets/icons/TimerIcon.png'
import closeIcon from '@/assets/icons/CloseIcon.png'

interface CommonModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'underReview' | 'matchingComplete' | 'notApproved' | 'wait'
  handleClick?: () => void
}

export default function ConfirmModal({
  isOpen,
  onClose,
  type,
  handleClick,
}: CommonModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  const MODAL_CONFIG = {
    underReview: {
      icon: hourGlassIcon,
      title: '검토중',
      message: '방장이 확인하고 있어요',
      subMessage: '스터디팀에서 검토중 입니다.',
      subMessage2: '조금만 기다리면 좋은 소식이 있을 거예요!',
      buttonText: '신청 취소',
    },
    matchingComplete: {
      icon: matchingCompleteIcon,
      title: '매칭 완료',
      message: '멤버로 확정 되었어요',
      subMessage: '환영합니다!',
      subMessage2: '멋진 스터디 여정을 함께해요',
      buttonText: '스터디 확인하기',
    },
    notApproved: {
      icon: failedicon,
      title: '멤버미승인',
      message: '타이밍이 아쉬웠네요',
      subMessage: '아쉽긴 하지만 더 좋은 기회가 올 거예요!',
      subMessage2: '지금 바로 다른 스터디를 찾아볼까요?',
      buttonText: '새로운 스터디 찾기',
    },
    wait: {
      icon: timerIcon,
      title: '23:59',
      message: '잠깐만요!',
      subMessage: '방금 신청을 취소하셨어요',
      subMessage2: '24시간 후에 다시 신청할 수 있습니다.',
      buttonText: '새로운 스터디 찾기',
    },
  }

  const { icon, title, message, subMessage, subMessage2, buttonText } =
    MODAL_CONFIG[type]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    // 외부 클릭 시 창닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current && // ref current 가 존재하고
        e.target instanceof Node && // 클릭 이 node 이고
        !modalRef.current.contains(e.target) // null 이 아닐때
      ) {
        onClose() // 창닫힘
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="text-primary fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.2)]">
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[384px] h-[420px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] rounded-[24px] px-[60px] py-[40px] flex flex-col justify-center items-center gap-[40px]"
      >
        <img
          src={closeIcon}
          onClick={onClose}
          className="absolute top-[24px] right-[24px] cursor-pointer"
        />

        <div className="flex flex-col items-center gap-[32px]">
          <div className="flex flex-col items-center gap-[8px]">
            <img src={icon} className="h-[56px]" />
            <div className="text-[20px] font-medium">{title}</div>
          </div>
          <div className="flex flex-col items-center gap-[8px]">
            <div className="text-[24px] font-bold">{message}</div>
            <div className="text-[16px] text-text2 font-normal text-center">
              <div>{subMessage}</div>
              <div>{subMessage2}</div>
            </div>
          </div>
        </div>
        <button
          onClick={handleClick || onClose}
          className="bg-primary text-text3 text-[16px] w-full h-[48px] rounded-[4px] cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
    </div>,
    document.body
  )
}
