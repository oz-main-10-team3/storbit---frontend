import { useState } from 'react'
import CommonModal from '@/common/CommonModal'
import CommonButton from '@/common/CommonButton'
import Dropdown from '@/common/DropDown'
import { LEVEL_OPTIONS } from '@/constants/levelOptions'
import type { Study } from '@/types/study'

interface StudyApplyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (level: string, intro: string) => void
  userNickname: string
  study: Study
  onNext: () => void
}

export default function StudyApplyModal({
  isOpen,
  onClose,
  onSubmit,
  userNickname,
  study,
  onNext,
}: StudyApplyModalProps) {
  const [selectedLevel, setSelectedLevel] = useState('')
  const [introduction, setIntroduction] = useState('')
  const isDisabled = !selectedLevel || introduction.trim() === ''

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="스터디 신청서"
      className="w-[504px] h-[680px] p-8"
    >
      <div className="flex flex-col ml-[50px] gap-5 w-[368px] h-[680px]">
        {/* 닉네임 */}
        <div className="flex justify-between items-center text-sm text-text4">
          <span>닉네임</span>
          <span className="font-semibold">{userNickname}</span>
        </div>
        {/* 신청 스터디 */}
        <div className="flex justify-between items-center text-sm text-text4">
          <span>신청 스터디</span>
          <span className="font-semibold">{study.title}</span>
        </div>
        {/* 카테고리 */}
        <div className="flex justify-between items-center text-sm text-text4">
          <span>카테고리</span>
          <span className="font-semibold">{study.category}</span>
        </div>
        {/* 스터디 시간 */}
        <div className="flex justify-between items-center text-sm text-text4">
          <span>스터디 시간</span>
          <span className="font-semibold">
            {study.days + ' ' + study.time + '시'}
          </span>
        </div>
        {/* 나의 실력 */}
        <div className="flex items-center gap-2 text-sm font-semibold text-text1">
          <label className="whitespace-nowrap">
            나의 실력 <span className="text-red-500">*</span>
          </label>
          <Dropdown
            className="ml-[60px] w-[240px]"
            options={LEVEL_OPTIONS}
            selected={selectedLevel}
            onChange={setSelectedLevel}
            placeholder="자신의 레벨을 선택해주세요"
          />
        </div>
        {/* 소개 작성 */}
        <div className="flex flex-col gap-1 text-sm font-semibold text-text1">
          <label className="flex items-center gap-[2px]">
            소개 작성 <span className="text-red-500">*</span>
          </label>
          <textarea
            className="resize-none w-[368px] px-4 py-3 rounded-md border border-gray-300 text-sm text-text1 focus:outline-none focus:border-black placeholder:text-gray-400 h-[120px]"
            placeholder="자기소개를 입력해주세요"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
          />
        </div>
        <CommonButton
          className="w-full h-11 text-sm font-semibold"
          disabled={isDisabled}
          onClick={() => {
            onSubmit(selectedLevel, introduction)
            onNext()
          }}
          variant={isDisabled ? 'disabled' : 'primary'}
        >
          신청하기
        </CommonButton>
      </div>
    </CommonModal>
  )
}
