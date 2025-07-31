import { useState } from 'react'
import { cn } from '@/utils/cn'
import ToastMessage from '@/common/ToastMessage'
import CommonModal from '@/common/CommonModal'
import StudyCard from '@/common/StudyCard'
import defaultThumbnail from '@/assets/images/default-thumbnail.png'

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
    <>
      {/* ✅ 모달 */}
      <CommonModal
        isOpen={isOpen}
        onClose={onClose}
        title="테스트 모달"
        subtitle="공통 모달이 잘 뜨는지 확인!"
      >
        {showToast && (
          <ToastMessage
            message="멤버로 확정 되었어요! 이제 함께 스터디를 시작할 수 있어요"
            onClose={() => setShowToast(false)}
            duration={3000}
          />
        )}

        <button
          className={cn('px-4 py-2 text-white rounded mb-4', 'bg-[#8349FF]')}
          onClick={handleConfirm}
        >
          확인
        </button>
      </CommonModal>

    {/* vertical + 정사각형 이미지 + 사이즈 제어 */}
    <div className='ml-[100px]'>
    <StudyCard
      imageUrl={defaultThumbnail}
      title="정방향 카드"
      description="설명 텍스트"
      memberCount={4}
      time="토요일 오후 5시"
      variant="vertical"
      className="max-w-[320px] min-w-[260px] "
    />

    {/* horizontal + 가로 이미지 + 사이즈 조절 */}
    <StudyCard
      imageUrl={defaultThumbnail}
      title="가로형 카드"
      description="설명 텍스트"
      memberCount={8}
      time="화요일 오후 2시"
      variant="horizontal"
      className="w-full max-w-[440px] min-w-[360px]"
    />
    </div>
    </>
  )
}

export default TestModal