import CommonModal from '@/common/CommonModal'
import CommonButton from '@/common/CommonButton'
import Dropdown from '@/common/DropDown'
import { useState, useEffect } from 'react'
import { memberKickSchema } from '@/schemas/memberKickSchema'

const KICK_REASONS = [
  { label: '지속적인 무단 불참', value: '지속적 무단 불참' },
  { label: '스터디 규칙 위반', value: '규칙 위반' },
  { label: '타 멤버와의 갈등', value: '멤버 갈등' },
  { label: '비협조적인 태도', value: '비협조' },
  { label: '스터디 분위기 저해', value: '분위기 저해' },
  { label: '연락 두절 / 장기 미접속', value: '연락 두절' },
  { label: '기타 (직접 작성)', value: '기타' },
]

interface MemberKickModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reason: string, description: string) => void
}

export default function MemberKickModal({
  isOpen,
  onClose,
  onSubmit,
}: MemberKickModalProps) {
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState<{ [key: string]: string }>({})

  const validate = () => {
    const { error } = memberKickSchema.validate(
      { reason, description },
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
      if (reason) newSuccess.reason = '성공적으로 선택되었습니다.'
      if (description) newSuccess.description = '성공적으로 입력되었습니다.'
      setSuccess(newSuccess)
    }
  }

  useEffect(() => {
    if (isOpen) {
      validate()
    }
  }, [reason, description, isOpen])

  const handleKick = () => {
    if (Object.keys(errors).length > 0) return
    if (!reason || !description.trim()) return
    onSubmit(reason, description)
    setReason('')
    setDescription('')
  }

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} title="멤버 퇴출">
      <div className="flex flex-col gap-3 items-center">
        <span className="text-xs text-[#B7B7B7] mt-[-16px] mb-3 text-center">
          선택한 멤버는 스터디에서 바로 제외돼요.
          <br />
          퇴출된 멤버는 다시 참여할 수 없으니 신중하게 진행해 주세요.
        </span>
        <Dropdown
          label={
            <span className="text-[14px] text-[#222] font-medium">
              퇴출 사유<span className="text-alertText">*</span>
            </span>
          }
          placeholder="선택해 주세요"
          options={KICK_REASONS}
          selected={reason}
          onChange={setReason}
          className="w-full"
        />
        {errors.reason && (
          <p className="text-red-500 text-xs self-start">{errors.reason}</p>
        )}
        {success.reason && (
          <p className="text-green-500 text-xs self-start">{success.reason}</p>
        )}
        <div className="w-full">
          <span className="text-[14px] text-[#222] font-medium">
            상세 설명<span className="text-alertText">*</span>
          </span>
          <textarea
            placeholder="이유를 작성해주세요."
            className="w-full h-[100px] border border-gray-300 rounded-md px-4 py-2 mt-2 text-[14px] resize-none placeholder:text-gray-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {errors.description && (
          <p className="text-red-500 text-xs self-start">
            {errors.description}
          </p>
        )}
        {success.description && (
          <p className="text-green-500 text-xs self-start">
            {success.description}
          </p>
        )}
        <CommonButton
          variant={
            Object.keys(errors).length > 0 || !reason || !description
              ? 'disabled'
              : 'primary'
          }
          className="w-full mt-3"
          onClick={handleKick}
          disabled={Object.keys(errors).length > 0 || !reason || !description}
        >
          퇴출하기
        </CommonButton>
      </div>
    </CommonModal>
  )
}
