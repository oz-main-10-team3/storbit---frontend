import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import checkIcon from '@/assets/icons/CheckIcon.png'
import studyStartIcon from '@/assets/icons/StudyStartIcon.png'

interface CommonModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'cancel' | 'start' | 'leave' | 'application' | 'dissolution'
  autoCloseDelay?: number // 초 단위, 기본값은 5초
}

export default function TransientModal({
  isOpen,
  onClose,
  type,
  autoCloseDelay = 5,
}: CommonModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  const MODAL_CONFIG = {
    cancel: {
      icon: checkIcon,
      title: '모집 취소 완료',
      message: '신청자들에게 알림이 전송되었어요.',
    },
    start: {
      icon: studyStartIcon,
      title: '스터디 시작',
      message: '최종 목표를 향해 달려봐요',
    },
    leave: {
      icon: checkIcon,
      title: '스터디 탈퇴 완료',
      message: '신청자들에게 알림이 전송되었어요.',
    },
    application: {
      icon: checkIcon,
      title: '신청 완료',
      message: '멤버가 되는동안 기다려주세요!',
    },
    dissolution: {
      icon: checkIcon,
      title: '스터디 해체 완료',
      message: '신청자들에게 알림이 전송되었어요.',
    },
  }

  const { icon, title, message } = MODAL_CONFIG[type]

  useEffect(() => {
    if (!isOpen) return

    const timer = setTimeout(() => {
      onClose()
    }, autoCloseDelay * 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [isOpen, onClose])

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
        className="w-[384px] h-[208px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] rounded-[24px] p-[20px] flex flex-col justify-center items-center gap-[15px]"
      >
        <img src={icon} className="w-[63px]" />
        <div className="flex flex-col items-center">
          <div className="text-[24px] font-bold">{title}</div>
          <div className="text-[16px] text-text font-normal">{message}</div>
          {/* <div>{countdown}초 후 이동합니다.</div> */}
        </div>
      </div>
    </div>,
    document.body
  )
}
