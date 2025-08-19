import { useState, useEffect } from 'react'
import CommonModal from '@/common/CommonModal'
import Dropdown from '@/common/DropDown'
import CommonButton from '@/common/CommonButton'
import { studyLeaveSchema } from '@/schemas/studyLeaveSchema'

interface StudyLeaveModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reason: string, description: string) => void
  onLeave: () => void
}

const REASON_OPTIONS = [
  { label: '시간이 맞지 않아서요', value: '시간 문제' },
  { label: '개인 사정으로 어려워졌어요', value: '개인 사정' },
  { label: '진행 방식이 잘 맞지 않았어요', value: '방식 문제' },
  { label: '스터디 목표와 달라서요', value: '목표 불일치' },
  { label: '참여율이 낮아 아쉬웠어요', value: '참여율 문제' },
  { label: '다른 스터디에 집중하려고요', value: '다른 스터디' },
  { label: '기타 (직접 입력)', value: '기타' },
]

export default function StudyLeaveModal({
  isOpen,
  onClose,
  onSubmit,
  onLeave,
}: StudyLeaveModalProps) {
  const [reason2, setReason2] = useState<string>()
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const { error } = studyLeaveSchema.validate(
      { reason: reason2, description },
      { abortEarly: false }
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
      if (reason2) newSuccess.reason = '성공적으로 선택되었습니다.'
      if (description) newSuccess.description = '성공적으로 입력되었습니다.'
      setSuccess(newSuccess)
    }
  }, [reason2, description])

  const handleSubmit = () => {
    if (Object.keys(errors).length > 0) return
    if (!reason2 || !description.trim()) return
    onSubmit(reason2, description.trim())
    setReason2(undefined)
    setDescription('')
    onLeave()
    onClose()
  }

  return (
    <CommonModal
      className="w-[560px] h-[598] p-4"
      isOpen={isOpen}
      onClose={onClose}
      title="스터디 탈퇴"
      subtitle={
        <>
          함께한 시간 고마웠어요!
          <br />더 좋은 기회들이 기다리고 있을 거예요
        </>
      }
    >
      <Dropdown
        label={
          <>
            탈퇴 사유<span className="text-alertText">*</span>
          </>
        }
        options={REASON_OPTIONS}
        selected={reason2}
        onChange={(value) => setReason2(value)}
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
          탈퇴 설명<span className="text-alertText">*</span>
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
        disabled={Object.keys(errors).length > 0 || !reason2 || !description}
        className="w-full mt-6"
        variant={
          Object.keys(errors).length > 0 || !reason2 || !description
            ? 'disabled'
            : 'primary'
        }
      >
        탈퇴 하기
      </CommonButton>
    </CommonModal>
  )
}
