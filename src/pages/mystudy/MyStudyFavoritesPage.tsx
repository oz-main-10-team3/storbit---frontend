import { useEffect, useState } from 'react'
import MyStudyCard from '@/common/mystudy/MyStudyCard'
import { StudyApplyModal } from '@/common/StudyApplyModal'
import type { Study } from '@/types/study'
import TransientModal from '@/common/TransientModal.tsx'
import type { ErrorMessage } from '@/types/errorMessage.ts'
import type { AxiosError } from 'axios'
import { api } from '@/api/mainApi.ts'

// 닉네임은 로그인 유저 정보에서 받아야 하지만 지금은 하드코딩
const userNickname = '몽치면주먹밥'

export default function MyStudyFavoritesPage() {
  const [likedStudies, setLikedStudies] = useState<Study[]>([])
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null)
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    api
      .get('/api/v1/my/studies/liked', { signal: controller.signal })
      .then((response) => {
        const data: unknown = response.data
        const items: Study[] = Array.isArray(data)
          ? (data as Study[])
          : data &&
              typeof data === 'object' &&
              Array.isArray((data as { items?: unknown }).items)
            ? (data as { items: Study[] }).items
            : ([] as Study[])
        setLikedStudies(items)
      })
      .catch((error: AxiosError<{ detail?: string }>) => {
        const status = error.response?.status
        if (!status) return
        setErrorMessage({
          status,
          message:
            error.response?.data?.detail ?? '알 수 없는 오류가 발생했습니다.',
        })
      })

    return () => controller.abort()
  }, [])

  const handleHeartClick = (id: number, liked: boolean) => {
    // Optimistic update
    const snapshot = likedStudies
    setLikedStudies((prev) =>
      prev.map((study) =>
        study.id === id ? { ...study, isLiked: liked } : study
      )
    )

    api
      .patch(`/api/v1/studies/${id}/like`, { isLiked: liked })
      .catch((error: AxiosError<{ detail?: string }>) => {
        // Rollback on failure and surface error without console
        setLikedStudies(snapshot)
        const status = error.response?.status
        if (!status) return
        setErrorMessage({
          status,
          message:
            error.response?.data?.detail ?? '알 수 없는 오류가 발생했습니다.',
        })
      })
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
        {!errorMessage &&
        likedStudies.filter((study) => study.isLiked).length === 0 ? (
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
