import { useState } from 'react'
import CommonModal from '@/common/CommonModal'
import InputField from '@/common/InputField'
import CommonButton from '@/common/CommonButton'

interface LeaderMissionModalProps {
  isOpen: boolean
  onClose: () => void
  onNext: () => void
}

export default function LeaderMissionModal({
  isOpen,
  onClose,
  onNext,
}: LeaderMissionModalProps) {
  const [goal, setGoal] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (goal.trim()) {
      setSaved(true)
    }
  }

  const handleNext = () => {
    if (saved) {
      onClose()
      onNext()
      setGoal('')
      setSaved(false)
    }
  }

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="스터디 최종 목표"
      subtitle={
        <p className="whitespace-pre-line text-sm text-text4 text-center">
          스터디 시작하기 전 스터디 최종 목표를 설정해주세요.
          {'\n'}최종 목표를 설정하면 변경이 어려워요.
        </p>
      }
      className="w-[460px] max-h-[90vh] p-8 overflow-y-auto"
    >
      <div className="flex flex-col justify-between gap-6">
        <div className="flex gap-2 items-center mx-auto">
          <InputField
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value)
              setSaved(false)
            }}
            placeholder="세계를 넘어 우주 정복!"
            className="w-[248px] h-[48px] text-sm "
          />
          <CommonButton
            onClick={handleSave}
            disabled={!goal.trim()}
            variant={goal.trim() ? 'primary' : 'disabled'}
            className="w-[112px] h-[48px] text-sm "
          >
            저장
          </CommonButton>
        </div>

        <CommonButton
          onClick={handleNext}
          disabled={!saved}
          variant={saved ? 'primary' : 'disabled'}
          className="w-[368px] h-[48px] text-base mx-auto"
        >
          다음
        </CommonButton>
      </div>
    </CommonModal>
  )
}
