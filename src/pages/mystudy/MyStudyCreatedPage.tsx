import { useState } from 'react'
import ToastMessage from '@/common/ToastMessage'
import { recruitApplicantsByStudy } from '@/data/recruitStatusData.ts'
import { myCreatedStudies } from '@/data/mockData'
import type { Study } from '@/types/study'
import MyStudyCard from '@/common/mystudy/MyStudyCard.tsx'
import LeaderMissionModal from '@/common/LeaderMissionModal'
import MissionModal from '@/common/MissionModal'
import TransientModal from '@/common/TransientModal'
import RecruitStatusModal from '@/common/RecruitStatusModal'
import StudyDismantle from '@/common/StudyDismantle.tsx'

export default function MyStudyCreatedPage() {
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
  // 추가: 모집 취소 모달 상태
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  // Toast for member acceptance/rejection
  const [toastMessage, setToastMessage] = useState('')
  // 모집 지원자 상태 관리 (깊은 복사)
  const [recruitApplicantsByStudyState, setRecruitApplicantsByStudyState] =
    useState(() => ({ ...recruitApplicantsByStudy }))
  return (
    <div className="flex flex-col gap-[40px] mt-[72px] pl-[60px] pr-[40px]">
      <div className="grid grid-cols-3 gap-[2px]">
        {myCreatedStudies.map((study: Study) => {
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
            rightText = '모집 현황'
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
                  setIsDismantleModalOpen(true)
                } else {
                  alert(leftText)
                }
              }}
              onRightButtonClick={
                rightText === '모집 현황'
                  ? () => setRecruitModalStudyId(study.id)
                  : undefined
              }
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
        onClose={() => setIsDismantleModalOpen(false)}
        onSubmit={() => {
          setIsTransitionLeaveModalOpen(true)
        }}
        onLeave={() => {
          setIsDismantleModalOpen(false)
        }}
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
