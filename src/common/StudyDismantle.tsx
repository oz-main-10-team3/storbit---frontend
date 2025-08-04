import { useState } from 'react'
import CommonModal from '@/common/CommonModal.tsx'
import Dropdown from '@/common/DropDown.tsx'
import CommonButton from '@/common/CommonButton.tsx'

interface studyDismantleProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reason: string, description: string) => void
  onLeave: () => void
}

const REASON_OPTIONS = [
  { label: '활동이 어려워졌어요', value: '활동이 어려워졌어요' },
  { label: '스터디원 참여율이 낮았어요', value: '스터디원 참여율이 낮았어요' },
  { label: '목표를 달성했어요', value: '목표를 달성했어요' },
  { label: '활동 방식이 맞지 않았어요', value: '활동 방식이 맞지 않았어요' },
  { label: '다른 스터디로 옮겼어요', value: '다른 스터디로 옮겼어요' },
  { label: '개인적인 사정이 있어요', value: '개인적인 사정이 있어요' },
  { label: '기타 (직접 작성)', value: '기타 (직접 작성)' },
]

export default function StudyDismantle({
  isOpen,
  onClose,
  onSubmit,
  onLeave,
}: studyDismantleProps) {
  const [reason, setReason] = useState<string>()
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    if (!reason || !description.trim()) return
    onSubmit(reason, description.trim())
    setReason(undefined)
    setDescription('')
    onLeave()
    onClose()
  }

  return (
    <CommonModal
      className="w-[560px] h-[598] p-4"
      isOpen={isOpen}
      onClose={onClose}
      title="스터디 해체"
      subtitle={
        <>
          스터디를 해체하면 그동안의 기록이 모두 사라져요.
          <br />한 번 삭제되면 복구할 수 없어요.
        </>
      }
    >
      <Dropdown
        label={
          <>
            해체 사유<span className="text-alertText">*</span>
          </>
        }
        options={REASON_OPTIONS}
        selected={reason}
        onChange={(value) => setReason(value)}
        placeholder="선택해 주세요"
        className="mb-6 w-[276px]"
      />

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          상세 설명<span className="text-alertText">*</span>
        </label>
        <textarea
          className="w-[480px] border border-gray-300 rounded-md px-3 py-2 h-[104px] resize-none text-sm outline-none"
          placeholder="이유를 작성해주세요."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <CommonButton
        onClick={handleSubmit}
        disabled={!reason || description.trim() === ''}
        className="w-full"
        variant={!reason || description.trim() === '' ? 'disabled' : 'primary'}
      >
        해체 하기
      </CommonButton>
    </CommonModal>
  )
}
