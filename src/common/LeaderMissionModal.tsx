import { useState, useEffect } from 'react'
import CommonModal from '@/common/CommonModal'
import InputField from '@/common/InputField'
import CommonButton from '@/common/CommonButton'
import { missionSchema } from '@/schemas/missionSchema'

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
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const validate = (value: string) => {
    const { error } = missionSchema.validate({ mission: value })
    if (error) {
      setError(error.details[0].message)
      setSuccess('')
    } else {
      setError('')
      setSuccess('성공적으로 입력되었습니다.')
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setError('')
    }
  }, [isOpen])

  const handleSave = () => {
    validate(goal)
    if (!error && goal.trim()) {
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
        <div className="flex flex-col items-center mx-auto">
          <div className="flex gap-2 items-center">
            <InputField
              value={goal}
              onChange={(e) => {
                setGoal(e.target.value)
                validate(e.target.value)
                setSaved(false)
              }}
              placeholder="세계를 넘어 우주 정복!"
              className="w-[248px] h-[48px] text-sm "
            />
            <CommonButton
              onClick={handleSave}
              disabled={!!error || !goal.trim()}
              variant={!error && goal.trim() ? 'primary' : 'disabled'}
              className="w-[112px] h-[48px] text-sm "
            >
              저장
            </CommonButton>
          </div>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          {success && <p className="text-green-500 text-xs mt-1">{success}</p>}
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
