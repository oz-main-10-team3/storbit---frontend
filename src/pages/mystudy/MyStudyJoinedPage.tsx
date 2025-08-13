import { useEffect, useState } from 'react'
import type { Study } from '@/types/study'
import MyStudyCard from '@/common/mystudy/MyStudyCard.tsx'
import MissionModal from '@/common/MissionModal.tsx'
import TransientModal from '@/common/TransientModal.tsx'
import StudyLeaveModal from '@/common/StudyLeaveModal'
import { api } from '@/api/mainApi.ts'
import type { AxiosError } from 'axios'
import type { ErrorMessage } from '@/types/errorMessage.ts'

export function MyStudyJoinedPage() {
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null)
  const [studies, setStudies] = useState<Study[]>([])
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false)
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false)
  const [isTransitionLeaveModalOpen, setIsTransitionLeaveModalOpen] =
    useState(false)
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    api
      .get('/api/v1/my/studies/joined', { signal: controller.signal })
      .then((response) => {
        const data: unknown = response.data
        const items: Study[] = Array.isArray(data)
          ? (data as Study[])
          : data &&
              typeof data === 'object' &&
              Array.isArray((data as { items?: unknown }).items)
            ? (data as { items: Study[] }).items
            : ([] as Study[])
        setStudies(items)
      })
      .catch((error: AxiosError<{ detail?: string }>) => {
        const status = error.response?.status
        if (!status) return
        setErrorMessage({
          status,
          message:
            error.response?.data?.detail ?? '알 수 없는 오류가 발생했습니다.',
        })
        setStudies([])
      })

    return () => controller.abort()
  }, [])

  return (
    <div className="flex flex-col gap-[40px] mt-[72px] pl-[60px] pr-[40px]">
      <div className="grid grid-cols-3 gap-[2px]">
        {!errorMessage &&
          studies.map((study, index) => (
            <MyStudyCard
              key={study.id}
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
          onSubmit={async (reason: string, description: string) => {
            if (!selectedStudy) return
            try {
              await api.post(`/api/v1/my/studies/${selectedStudy.id}/leave`, {
                reason,
                description,
              })
              // 로컬 리스트에서 제거
              setStudies((prev) =>
                prev.filter((s) => s.id !== selectedStudy.id)
              )
            } catch (e) {
              const err = e as AxiosError<{ detail?: string }>
              const status = err.response?.status ?? 500
              setErrorMessage({
                status,
                message:
                  err.response?.data?.detail ??
                  '탈퇴 처리 중 오류가 발생했습니다.',
              })
            } finally {
              setIsLeaveModalOpen(false)
              setSelectedStudy(null)
            }
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
