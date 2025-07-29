import CommonModal from '../common/CommonModal'
import { cn } from '@/utils/cn'

interface TestModalProps {
  isOpen: boolean
  onClose: () => void
}

const TestModal = ({ isOpen, onClose }: TestModalProps) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="테스트 모달"
      subtitle="공통 모달이 잘 뜨는지 확인!"
    >
      <button
        className={cn(
          'px-4 py-2 text-white rounded',
          'bg-[#8349FF]'
        )}
        onClick={onClose}
      >
        닫기
      </button>
    </CommonModal>
  )
}

export default TestModal