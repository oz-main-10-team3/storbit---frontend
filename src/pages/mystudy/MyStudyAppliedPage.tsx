// src/pages/mystudy/MyStudyAppliedPage.tsx
import { useEffect, useState } from 'react'
import type { Study } from '@/types/study'
import ApplicationCompleted from '@/common/ConfirmModal/ApplicationCompleted.tsx'
import ConfirmModal from '@/common/ConfirmModal.tsx'
import TransientModal from '@/common/TransientModal'
import MyStudyCard from '@/common/mystudy/MyStudyCard.tsx'
import { studyData } from '@/data/mockData.ts'

export default function MyStudyAppliedPage() {
  const [studies, setStudies] = useState<Study[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedQueue, setSelectedQueue] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState('default')
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const handleCancelClick = () => {
    setCancelModalOpen(true)
  }

  useEffect(() => {
    setStudies(studyData)
  }, [])

  const handleOpenModal = (id: number, status: string) => {
    setSelectedQueue(id)
    setSelectedStatus(status)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const isDefault = selectedStatus === 'default'

  return (
    <div className="flex flex-col gap-[40px] mt-[72px] pl-[60px] pr-[40px]">
      <div className="grid grid-cols-3 gap-[2px]">
        {studies.map((study, index) => (
          <MyStudyCard
            key={index}
            study={study}
            onLeftButtonClick={() => handleCancelClick()}
            onRightButtonClick={() => handleOpenModal(index, study.status)}
            leftButtonText="신청 취소"
            rightButtonText="신청 현황"
          />
        ))}
      </div>

      {/* 상태에 따라 다른 모달 표시 */}
      {modalOpen &&
        (isDefault ? (
          <ApplicationCompleted
            isOpen={modalOpen}
            onClose={handleCloseModal}
            queueNumber={selectedQueue}
          />
        ) : (
          <ConfirmModal
            isOpen={modalOpen}
            onClose={handleCloseModal}
            type={
              selectedStatus === '매칭 완료'
                ? 'matchingComplete'
                : selectedStatus === '미승인'
                  ? 'notApproved'
                  : selectedStatus === '대기'
                    ? 'wait'
                    : 'underReview'
            }
          />
        ))}

      {cancelModalOpen && (
        <TransientModal
          isOpen={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          type="userCancel"
        />
      )}
    </div>
  )
}
