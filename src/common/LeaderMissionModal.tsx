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
    }
  }

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="스터디 최종 목표"
      subtitle="스터디 시작하기 전 스터디 최종 목표를 설정해주세요. 최종 목표를 설정하면 변경이 어려워요."
      className="w-[460px] h-[376px]  p-8"
    >
      <div className="flex flex-col justify-between h-full">
        {/* 입력 + 저장 버튼 */}
        <div className="flex gap-2 items-center mb-[24px]">
          <InputField
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value)
              setSaved(false)
            }}
            placeholder="세계를 넘어 우주 정복!"
            className=" w-[300px] h-[48px] text-sm"
          />
          <CommonButton
            onClick={handleSave}
            disabled={!goal.trim()}
            variant={goal.trim() ? 'primary' : 'disabled'}
            className="w-[112px] h-[48px] text-sm"
          >
            저장
          </CommonButton>
        </div>

        {/* 다음 버튼 */}
        <CommonButton
          onClick={handleNext}
          disabled={!saved}
          variant={saved ? 'primary' : 'disabled'}
          className="w-full h-[48px] text-base"
        >
          다음
        </CommonButton>
      </div>
    </CommonModal>
  )
}
