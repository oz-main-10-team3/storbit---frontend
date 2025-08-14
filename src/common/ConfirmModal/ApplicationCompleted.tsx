import { IoIosClose } from 'react-icons/io'
import { createPortal } from 'react-dom'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import CommonButton from '@/common/CommonButton.tsx'
import { useState } from 'react'
import ToastMessage from '@/common/ToastMessage.tsx'

export interface ApplicationCompletedProps {
  isOpen: boolean
  onClose: () => void
  onCancel: () => void
  queueNumber: number
}

export default function ApplicationCompleted({
  isOpen,
  onClose,
  onCancel,
}: ApplicationCompletedProps) {
  const [showToast, setShowToast] = useState(false)
  if (!isOpen) return null
  const handleToast = () => {
    setShowToast(true)
  }
  return createPortal(
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
      <div className="relative w-[384px] h-[420px] bg-white rounded-[24px] px-[60px] py-[40px] flex flex-col justify-center items-center gap-[40px] shadow-md">
        {/* X 버튼 */}
        <IoIosClose
          onClick={onClose}
          className="absolute text-[#BDBDBD] text-[30px] top-[24px] right-[24px] cursor-pointer"
        />

        {/* 아이콘 + 텍스트 */}
        <div className="flex flex-col items-center gap-[16px]">
          <div className="text-[76px] text-primary">
            <AiOutlineCheckCircle />
          </div>
          <h2 className="text-[16px] text-[#8349FF] font-semibold">
            신청 완료!
          </h2>
          <h3 className="text-[20px] font-bold text-center">10번째 입니다</h3>
          <p className="text-center text-[#888] text-[14px] leading-snug">
            신청이 성공적으로 처리되었습니다.
            <br />
            기다려주신 만큼 더 좋은 경험이 될 거예요!
          </p>
        </div>

        {/* 버튼 2개 */}
        <div className="flex w-full gap-2">
          <CommonButton
            className="text-sm"
            variant="secondary"
            onClick={handleToast}
          >
            알림 받기
          </CommonButton>
          <CommonButton
            onClick={() => {
              onClose()
              onCancel()
            }}
            className="text-sm"
            variant="primary"
          >
            신청 취소
          </CommonButton>
        </div>
      </div>
      {showToast && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[9999]">
          <ToastMessage
            message="알림 신청 되었어요. 쪽지함을 확인해주세요."
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </div>,
    document.body
  )
}
