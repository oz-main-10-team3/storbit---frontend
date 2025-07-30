import { useState } from 'react'
import { cn } from '@/utils/cn'
import ToastMessage from '@/common/ToastMessage'
import CommonModal from '@/common/CommonModal'

interface TestModalProps {
  isOpen: boolean
  onClose: () => void
}

const TestModal = ({ isOpen, onClose }: TestModalProps) => {
  const [showToast, setShowToast] = useState(false)

  const handleConfirm = () => {
    setShowToast(true)
  }

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="테스트 모달"
      subtitle="공통 모달이 잘 뜨는지 확인!"
    >
      {/* ToastMessage */}
      {showToast && (
        <ToastMessage
          message="멤버로 확정 되었어요! 이제 함께 스터디를 시작할 수 있어요"
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}

      <button
        className={cn('px-4 py-2 text-white rounded', 'bg-[#8349FF]')}
        onClick={handleConfirm}
      >
        확인
      </button>
    </CommonModal>
  )
}

export default TestModal
