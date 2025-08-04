import { useState } from 'react'
import CommonModal from '@/common/CommonModal'
import CommonButton from '@/common/CommonButton'
import DropDown from '@/common/DropDown'

const reasons = [
  {
    label: '스터디 활동 참여가 어려워요',
    value: '스터디 활동 참여가 어려워요',
  },
  {
    label: '장기간 자리를 비우게 됐어요',
    value: '장기간 자리를 비우게 됐어요',
  },
  {
    label: '다른 사람이 리더 역할에 더 적합해요',
    value: '다른 사람이 리더 역할에 더 적합해요',
  },
  { label: '스터디 운영이 부담스러워요', value: '스터디 운영이 부담스러워요' },
  { label: '개인적인 사정이 있어요', value: '개인적인 사정이 있어요' },
  {
    label: '이미 다른 스터디를 운영 중이에요',
    value: '이미 다른 스터디를 운영 중이에요',
  },
  { label: '기타', value: '기타' },
]

interface LeaderDelegateModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (reason: string) => void
}

export default function LeaderDelegateModal({
  isOpen,
  onClose,
  onSubmit,
}: LeaderDelegateModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>('')

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[400px]"
      title={'방장 위임'}
    >
      <div className="flex flex-col items-center">
        <p className="text-[13px] text-[#B6B6B6] text-center mb-6">
          방장 역할을 넘기면 다시 되돌릴 수 없어요.
          <br />
          신중하게 선택해 주세요!
        </p>
        <div className="w-full mb-6">
          <label className="block text-[16px] font-semibold m-3 mb-2">
            위임 사유<span className="text-alertText m-1">*</span>
          </label>
          <DropDown
            options={reasons}
            placeholder="선택해 주세요"
            selected={selectedReason}
            onChange={setSelectedReason}
            className="text-[15px] w-[320px] h-[48px] m-3 "
          />
        </div>
        <CommonButton
          className="w-[320px] h-[48px] text-[16px] font-semibold bg-[#A259FF] text-white"
          onClick={() => selectedReason && onSubmit(selectedReason)}
          disabled={!selectedReason}
        >
          위임 하기
        </CommonButton>
      </div>
    </CommonModal>
  )
}
