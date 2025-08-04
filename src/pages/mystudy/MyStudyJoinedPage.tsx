import { useEffect, useState } from 'react'
import type { Study } from '@/types/study'
import MyStudyCard from '@/common/mystudy/MyStudyCard.tsx'
import MissionModal from '@/common/MissionModal.tsx'
import TransientModal from '@/common/TransientModal.tsx'
import StudyLeaveModal from '@/common/StudyLeaveModal'
import { studyData } from '@/data/mockData.ts'

export default function MyStudyJoinedPage() {
  const [studies, setStudies] = useState<Study[]>([])
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false)
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false)
  const [isTransitionLeaveModalOpen, setIsTransitionLeaveModalOpen] =
    useState(false)
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null)

  useEffect(() => {
    setStudies(studyData)
  }, [])

  return (
    <div className="flex flex-col gap-[40px] mt-[72px] pl-[60px] pr-[40px]">
      <div className="grid grid-cols-3 gap-[2px]">
        {studies.map((study, index) => (
          <MyStudyCard
            key={index}
            study={study}
            onLeftButtonClick={
              index === 1 ? undefined : () => setIsDailyModalOpen(true)
            }
            leftButtonText={index === 1 ? '스터디 시작 전' : '스터디 참여'}
            leftButtonDisabled={index === 1}
            onRightButtonClick={() => {
              setSelectedStudy(study)
              setIsLeaveModalOpen(true)
            }}
            rightButtonText="스터디 탈퇴"
          />
        ))}
      </div>

      {isDailyModalOpen && (
        <MissionModal
          isOpen={isDailyModalOpen}
          onClose={() => setIsDailyModalOpen(false)}
          onStart={() => setIsTransitionModalOpen(true)}
          title="데일리 미션"
          subtitle={
            <p className="whitespace-pre-line text-sm text-text4 text-center">
              내가 오늘 꼭 달성하고 싶은 목표를 설정해주세요!
              {'\n'}최대 5개까지 설정할 수 있습니다.
            </p>
          }
        />
      )}

      {isTransitionModalOpen && (
        <TransientModal
          isOpen={isTransitionModalOpen}
          onClose={() => setIsTransitionModalOpen(false)}
          type="start"
        />
      )}

      {isLeaveModalOpen && selectedStudy && (
        <StudyLeaveModal
          isOpen={isLeaveModalOpen}
          onClose={() => setIsLeaveModalOpen(false)}
          onSubmit={() => {
            setIsLeaveModalOpen(false)
            setSelectedStudy(null)
          }}
          onLeave={() => {
            setIsTransitionLeaveModalOpen(true)
          }}
        />
      )}
      {isTransitionLeaveModalOpen && (
        <TransientModal
          isOpen={isTransitionLeaveModalOpen}
          onClose={() => setIsTransitionLeaveModalOpen(false)}
          type="leave"
        />
      )}
    </div>
  )
}
