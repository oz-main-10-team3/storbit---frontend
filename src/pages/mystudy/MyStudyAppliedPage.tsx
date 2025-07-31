// src/pages/mystudy/MyStudyAppliedPage.tsx
import { useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import mockData from '@/mystudymockdata/mockStudyData.json'
import type { Study } from '@/types/study.ts'
import CommonButton from '@/common/CommonButton.tsx'
import ApplicationCompleted from '@/common/ConfirmModal/ApplicationCompleted.tsx'
import ConfirmModal from '@/common/ConfirmModal.tsx'
import TransientModal from '@/common/TransientModal'

type StudyWithStatus = Study & {
  status: string
}

export default function MyStudyAppliedPage() {
  const [studies, setStudies] = useState<StudyWithStatus[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedQueue, setSelectedQueue] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState('default')
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const handleCancelClick = () => {
    setCancelModalOpen(true)
  }

  useEffect(() => {
    setStudies(mockData as StudyWithStatus[])
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
        {studies.map((study) => (
          <div
            key={study.id}
            className="w-[360px] rounded-lg p-4 border-none shadow-none"
          >
            <div className="relative">
              <img
                src={study.imageUrl}
                alt={study.title}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                {study.tags.map((tag, idx) => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 rounded-sm text-[10px] font-medium ${
                      idx === 0
                        ? 'border border-purple-500 text-purple-500 bg-white'
                        : 'bg-gray-300 text-gray-800'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 mb-2">
              <h3 className="text-sm font-semibold text-black">
                {study.title}
              </h3>
              <AiFillHeart className="text-purple-500 h-5 w-5" />
            </div>
            <div className="text-xs text-gray-500 line-clamp-2 mb-4">
              {study.description}
            </div>
            <div className="mt-4 flex gap-2">
              <CommonButton
                className="text-sm"
                variant="secondary"
                onClick={() => handleCancelClick()}
              >
                신청 취소
              </CommonButton>
              <CommonButton
                className="text-sm"
                variant="primary"
                onClick={() => handleOpenModal(study.id, study.status)}
              >
                신청 현황
              </CommonButton>
            </div>
          </div>
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
