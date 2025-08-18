import { useEffect, useState } from 'react'
import CommonModal from '@/common/CommonModal.tsx'
import Dropdown from '@/common/DropDown.tsx'
import CommonButton from '@/common/CommonButton.tsx'
import { studyDismantleSchema } from '@/schemas/studyDismantleSchema'

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
}: studyDismantleProps) {
  const [reason, setReason] = useState<string>()
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const { error } = studyDismantleSchema.validate(
      { reason, description },
      { abortEarly: false },
    )
    if (error) {
      const newErrors: { [key: string]: string } = {}
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message
      })
      setErrors(newErrors)
      setSuccess({})
    } else {
      setErrors({})
      const newSuccess: { [key: string]: string } = {}
      if (reason) newSuccess.reason = '성공적으로 선택되었습니다.'
      if (description) newSuccess.description = '성공적으로 입력되었습니다.'
      setSuccess(newSuccess)
    }
  }

  useEffect(() => {
    if (isOpen) {
      validate()
    }
  }, [reason, description, isOpen, validate])

  const handleSubmit = () => {
    if (Object.keys(errors).length > 0) return
    if (!reason || !description.trim()) return
    onSubmit(reason, description.trim())
    setReason(undefined)
    setDescription('')
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
        className="mb-1 w-[276px]"
      />
      {errors.reason && (
        <p className="text-red-500 text-xs mb-4">{errors.reason}</p>
      )}
      {success.reason && (
        <p className="text-green-500 text-xs mb-4">{success.reason}</p>
      )}

      <div className="mb-1">
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
      {errors.description && (
        <p className="text-red-500 text-xs mb-4">{errors.description}</p>
      )}
      {success.description && (
        <p className="text-green-500 text-xs mb-4">{success.description}</p>
      )}

      <CommonButton
        onClick={handleSubmit}
        disabled={Object.keys(errors).length > 0 || !reason || !description}
        className="w-full mt-6"
        variant={
          Object.keys(errors).length > 0 || !reason || !description
            ? 'disabled'
            : 'primary'
        }
      >
        해체 하기
      </CommonButton>
    </CommonModal>
  )
}
