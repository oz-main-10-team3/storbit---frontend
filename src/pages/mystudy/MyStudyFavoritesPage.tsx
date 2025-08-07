import { useState } from 'react'
import { myLikedStudies } from '@/data/mockData'
import MyStudyCard from '@/common/mystudy/MyStudyCard'
import StudyApplyModal from '@/common/StudyApplyModal'
import type { Study } from '@/types/study'
import TransientModal from '@/common/TransientModal.tsx'

// 닉네임은 로그인 유저 정보에서 받아야 하지만 지금은 하드코딩
const userNickname = '몽치면주먹밥'

export default function MyStudyFavoritesPage() {
  // Initialize with all studies, not just filtered ones
  const [likedStudies, setLikedStudies] = useState(myLikedStudies)

  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false)

  const handleHeartClick = (id: number, liked: boolean) => {
    setLikedStudies((prev) =>
      prev.map((study) =>
        study.id === id ? { ...study, isLiked: liked } : study
      )
    )
  }

  const handleApplyClick = (study: Study) => {
    setSelectedStudy(study)
    setIsApplyModalOpen(true)
  }

  const handleSubmit = () => {
    setIsApplyModalOpen(false)
    setSelectedStudy(null)
  }

  return (
    <div className="flex flex-col gap-[40px] mt-[72px] pl-[60px] pr-[40px]">
      <div className="grid grid-cols-3 gap-[2px]">
        {likedStudies.filter((study) => study.isLiked).length === 0 ? (
          <div className="m-auto col-span-3 flex justify-center items-center h-[300px] text-gray-400 text-center">
            찜한 스터디가 없습니다.
          </div>
        ) : (
          likedStudies
            .filter((study) => study.isLiked)
            .map((study) => {
              const isFull = study.currentMember >= study.maxMember
              return (
                <MyStudyCard
                  key={study.id}
                  study={study}
                  showHeart
                  onHeartClick={handleHeartClick}
                  rightButtonText={isFull ? '대기자 신청' : '스터디 신청'}
                  onRightButtonClick={() => handleApplyClick(study)}
                  isFullWidthSingleButton
                />
              )
            })
        )}
      </div>

      {selectedStudy && (
        <StudyApplyModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          onSubmit={handleSubmit}
          userNickname={userNickname}
          study={selectedStudy}
          onNext={() => {
            setIsTransitionModalOpen(true)
          }}
        />
      )}

      {isTransitionModalOpen && (
        <TransientModal
          isOpen={isTransitionModalOpen}
          onClose={() => setIsTransitionModalOpen(false)}
          type="application"
        />
      )}
    </div>
  )
}
