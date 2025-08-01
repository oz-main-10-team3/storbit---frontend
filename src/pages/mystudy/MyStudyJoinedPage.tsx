import { useEffect, useState } from 'react'
import type { Study } from '@/types/study'
import mockData from '@/mystudymockdata/mockStudyData.json'
import MyStudyCard from '@/common/mystudy/MyStudyCard.tsx'
import MissionModal from '@/common/MissionModal.tsx'
import TransientModal from '@/common/TransientModal.tsx'
import LeaderMissionModal from '@/common/LeaderMissionModal.tsx'

export default function MyStudyJoinedPage() {
  const currentUserId = 123 // 현재 로그인된 유저 ID

  const [studies, setStudies] = useState<Study[]>([])
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false)
  const [isCommonModalOpen, setIsCommonModalOpen] = useState(false)
  const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false)
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false)

  useEffect(() => {
    setStudies(mockData as Study[])
  }, [])

  return (
    <div className="flex flex-col gap-[40px] mt-[72px] pl-[60px] pr-[40px]">
      <div className="grid grid-cols-3 gap-[2px]">
        {studies.map((study, index) => (
          <MyStudyCard
            key={index}
            study={study}
            onLeftButtonClick={
              index === 1
                ? undefined
                : study.userId === currentUserId
                  ? () => setIsLeaderModalOpen(true)
                  : () => setIsDailyModalOpen(true)
            }
            leftButtonText={index === 1 ? '스터디 시작 전' : '스터디 참여'}
            leftButtonDisabled={index === 1}
            onRightButtonClick={() => alert('스터디 탈퇴')}
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
          subtitle="내가 오늘 꼭 달성하고 싶은 목표를 설정해주세요! 최대 5개까지 설정할 수 있습니다."
        />
      )}

      {isLeaderModalOpen && (
        <LeaderMissionModal
          isOpen={isLeaderModalOpen}
          onClose={() => setIsLeaderModalOpen(false)}
          onNext={() => setIsCommonModalOpen(true)}
        />
      )}

      {isCommonModalOpen && (
        <MissionModal
          isOpen={isCommonModalOpen}
          onClose={() => setIsCommonModalOpen(false)}
          onStart={() => setIsTransitionModalOpen(true)}
          title="공통 미션"
          subtitle="스터디 전원의 오늘 목표를 명확하게 작성해주세요! 최대 5개까지 작성이 가능합니다."
        />
      )}

      {isTransitionModalOpen && (
        <TransientModal
          isOpen={isTransitionModalOpen}
          onClose={() => setIsTransitionModalOpen(false)}
          type="start"
        />
      )}
    </div>
  )
}
