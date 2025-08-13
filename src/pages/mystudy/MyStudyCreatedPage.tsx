import { useEffect, useState } from 'react'
import ToastMessage from '@/common/ToastMessage'
import type { RecruitApplicant } from '@/types/Applicant'
import type { Study } from '@/types/study'
import MyStudyCard from '@/common/mystudy/MyStudyCard.tsx'
import LeaderMissionModal from '@/common/LeaderMissionModal'
import MissionModal from '@/common/MissionModal'
import TransientModal from '@/common/TransientModal'
import RecruitStatusModal from '@/common/RecruitStatusModal'
import MemberStatusModal from '@/common/MemberStatusModal'
import StudyDismantle from '@/common/StudyDismantle.tsx'
import { api } from '@/api/mainApi.ts'
import type { AxiosError } from 'axios'
import useDismantledStudiesStore from '@/store/useDismantledStudiesStore.ts'

interface Member {
  id: number
  nickname: string
  attendanceRate: number
}

export default function MyStudyCreatedPage() {
  const [createdStudies, setCreatedStudies] = useState<Study[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [isCommonModalOpen, setIsCommonModalOpen] = useState(false)
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false)
  const [isTransitionLeaveModalOpen, setIsTransitionLeaveModalOpen] =
    useState(false)
  // 모집 현황 모달: 열려있는 studyId (없으면 null)
  const [recruitModalStudyId, setRecruitModalStudyId] = useState<number | null>(
    null
  )
  // 스터디 해체 모달 상태
  const [isDismantleModalOpen, setIsDismantleModalOpen] = useState(false)
  const [dismantleStudyId, setDismantleStudyId] = useState<number | null>(null)
  // 멤버 현황 모달 상태
  const [memberStatusModalStudyId, setMemberStatusModalStudyId] = useState<
    number | null
  >(null)
  const [studyMembers, setStudyMembers] = useState<Member[]>([])
  // 추가: 모집 취소 모달 상태
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  // Toast for member acceptance/rejection
  const [toastMessage, setToastMessage] = useState('')
  // 모집 지원자 상태 관리 (깊은 복사)
  const [recruitApplicantsByStudyState, setRecruitApplicantsByStudyState] =
    useState<Record<string, RecruitApplicant[]>>({})

  const { dismantledStudyIds, clearDismantledStudies } =
    useDismantledStudiesStore()

  useEffect(() => {
    clearDismantledStudies() // Clear on mount
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    api
      .get('/api/v1/my/studies/created', { signal: controller.signal })
      .then((response) => {
        const data: unknown = response.data
        const items: Study[] = Array.isArray(data)
          ? (data as Study[])
          : data &&
              typeof data === 'object' &&
              Array.isArray((data as { items?: unknown }).items)
            ? (data as { items: Study[] }).items
            : ([] as Study[])
        setCreatedStudies(
          items.filter((study) => !dismantledStudyIds.includes(study.id))
        )
      })
      .catch((_error: AxiosError<{ detail?: string }>) => {
        // 무소음 실패 처리: UI는 비워둠
        setCreatedStudies([])
      })

    return () => controller.abort()
  }, [dismantledStudyIds])

  useEffect(() => {
    if (recruitModalStudyId === null) return

    const controller = new AbortController()

    api
      .get(`/api/v1/studies/${recruitModalStudyId}/applicants`, {
        signal: controller.signal,
      })
      .then((response) => {
        const data: unknown = response.data
        const items: RecruitApplicant[] = Array.isArray(data)
          ? (data as RecruitApplicant[])
          : []
        setRecruitApplicantsByStudyState((prev) => ({
          ...prev,
          [recruitModalStudyId]: items,
        }))
      })
      .catch((_error: AxiosError<{ detail?: string }>) => {
        // 에러 처리
      })

    return () => controller.abort()
  }, [recruitModalStudyId])

  useEffect(() => {
    if (memberStatusModalStudyId === null) return

    const controller = new AbortController()

    api
      .get(`/api/v1/studies/${memberStatusModalStudyId}/members`, {
        signal: controller.signal,
      })
      .then((response) => {
        setStudyMembers(response.data)
      })
      .catch((_error: AxiosError<{ detail?: string }>) => {
        // 에러 처리
      })

    return () => controller.abort()
  }, [memberStatusModalStudyId])

  return (
    <div className="flex flex-col gap-[40px] mt-[72px] pl-[60px] pr-[40px]">
      <div className="grid grid-cols-3 gap-[2px]">
        {createdStudies.map((study: Study) => {
          const isSingle = study.isSingleButton
          const isDefault = study.status === 'default'

          let leftText: string
          let rightText: string | undefined
          let isFullWidthSingleButton = false

          if (isSingle) {
            leftText = '스터디 시작'
            rightText = undefined
            isFullWidthSingleButton = true
          } else {
            leftText = study.startStatus
              ? '스터디 시작'
              : isDefault
                ? '모집 취소'
                : '스터디 해체'
            rightText = isDefault ? '모집 현황' : '멤버 현황'
            isFullWidthSingleButton = false
          }

          return (
            <MyStudyCard
              key={study.id}
              study={study}
              leftButtonText={leftText}
              rightButtonText={rightText}
              onLeftButtonClick={() => {
                if (leftText === '스터디 시작') {
                  setModalOpen(true)
                } else if (leftText === '모집 취소') {
                  setIsCancelModalOpen(true)
                } else if (leftText === '스터디 해체') {
                  setDismantleStudyId(study.id)
                  setIsDismantleModalOpen(true)
                } else {
                  alert(leftText)
                }
              }}
              onRightButtonClick={() => {
                if (rightText === '모집 현황') {
                  setRecruitModalStudyId(study.id)
                } else if (rightText === '멤버 현황') {
                  setMemberStatusModalStudyId(study.id)
                }
              }}
              isFullWidthSingleButton={isFullWidthSingleButton}
              showHeart={false}
            />
          )
        })}
      </div>
      <LeaderMissionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNext={() => {
          setModalOpen(false)
          setIsCommonModalOpen(true)
        }}
      />
      <MissionModal
        isOpen={isCommonModalOpen}
        onClose={() => setIsCommonModalOpen(false)}
        onStart={() => {
          setIsCommonModalOpen(false)
          setIsTransitionModalOpen(true)
        }}
        title="공통 미션"
        subtitle={`스터디 전체의 오늘 목표를 명확하게 작성해주세요.\n최대 5개까지 작성이 가능해요.`}
      />
      {isTransitionModalOpen && (
        <TransientModal
          isOpen={isTransitionModalOpen}
          onClose={() => setIsTransitionModalOpen(false)}
          type="start"
        />
      )}
      {/* 모집 현황 모달: recruitModalStudyId가 있을 때만 렌더링 */}
      {recruitModalStudyId !== null && (
        <RecruitStatusModal
          isOpen
          onClose={() => setRecruitModalStudyId(null)}
          applicants={recruitApplicantsByStudyState[recruitModalStudyId] || []}
          onReject={(id) => {
            setRecruitApplicantsByStudyState((prev) => {
              const newArr = (prev[recruitModalStudyId!] ?? []).filter(
                (item) => item.id !== id
              )
              return { ...prev, [recruitModalStudyId!]: newArr }
            })
            setToastMessage('멤버로 거절되었어요! 다른 요청을 확인해보세요')
          }}
          onAccept={(id) => {
            setRecruitApplicantsByStudyState((prev) => {
              const newArr = (prev[recruitModalStudyId!] ?? []).filter(
                (item) => item.id !== id
              )
              return { ...prev, [recruitModalStudyId!]: newArr }
            })
            setToastMessage(
              '멤버로 확정 되었어요! 이제 함께 스터디를 시작할 수 있어요'
            )
          }}
          onConfirm={(id) => {
            setRecruitApplicantsByStudyState((prev) => {
              const newArr = (prev[recruitModalStudyId!] ?? []).map((item) =>
                item.id === id && item.status === '신청 확인'
                  ? { ...item, status: '검토중' }
                  : item
              )
              return { ...prev, [recruitModalStudyId!]: newArr }
            })
          }}
          onAcceptAll={() => {
            setRecruitApplicantsByStudyState((prev) => ({
              ...prev,
              [recruitModalStudyId!]: [],
            }))
            setToastMessage('전체 멤버가 확정되었어요! 함께 시작해봐요')
          }}
          onRejectAll={() => {
            setRecruitApplicantsByStudyState((prev) => ({
              ...prev,
              [recruitModalStudyId!]: [],
            }))
            setToastMessage('전체 신청자가 거절되었어요!')
          }}
        />
      )}
      {memberStatusModalStudyId !== null && (
        <MemberStatusModal
          isOpen
          onClose={() => setMemberStatusModalStudyId(null)}
          members={studyMembers}
        />
      )}
      {/* 모집 취소 TransientModal 추가 */}
      {isCancelModalOpen && (
        <TransientModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          type="cancel"
        />
      )}

      <StudyDismantle
        isOpen={isDismantleModalOpen}
        onClose={() => {
          setIsDismantleModalOpen(false)
          setDismantleStudyId(null)
        }}
        onSubmit={(reason: string, description: string) => {
          if (dismantleStudyId === null) return

          api
            .delete(`/api/v1/studies/${dismantleStudyId}`, {
              data: { reason, description },
            })
            .then(() => {
              setCreatedStudies((prev) =>
                prev.filter((study) => study.id !== dismantleStudyId)
              )
              setIsDismantleModalOpen(false)
              setDismantleStudyId(null)
              setIsTransitionLeaveModalOpen(true)
            })
            .catch((_error) => {
              //void
              // console.error('Error dismantling study:', error)
              // Optionally, show an error message to the user
            })
        }}
        onLeave={() => {}}
      />

      {isTransitionLeaveModalOpen && (
        <TransientModal
          isOpen={isTransitionLeaveModalOpen}
          onClose={() => setIsTransitionLeaveModalOpen(false)}
          type="dissolution"
        />
      )}

      {toastMessage && (
        <div className="fixed top-[70px] left-1/2 -translate-x-1/2 z-[9999]">
          <ToastMessage
            message={toastMessage}
            onClose={() => setToastMessage('')}
          />
        </div>
      )}
    </div>
  )
}
