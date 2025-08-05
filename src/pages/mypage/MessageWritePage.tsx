import CommonButton from '@/common/CommonButton'
import Dropdown from '@/common/DropDown'
import { useState } from 'react'

const studySelect = [
  {
    label: 'React 기초 스터디',
    value: 'React 기초 스터디',
  },
  {
    label: '토익 900달성 스터디',
    value: '토익 900달성 스터디',
  },
  {
    label: '알고리즘 마스터 스터디',
    value: '알고리즘 마스터 스터디',
  },
  { label: '코딩테스트 합격반', value: '코딩테스트 합격반' },
]

const recipients = [
  { label: '김민지', value: 'kimminji' },
  { label: '이준호', value: 'leejunho' },
  { label: '박서연', value: 'parkseoyeon' },
  { label: '최유진', value: 'choiyujin' },
  { label: '정하늘', value: 'junghaneul' },
]

export default function MessageWritePage() {
  const [selectStudy, setSelectStudy] = useState('')
  const [selectRecipient, setSelectRecipient] = useState('')
  return (
    <div className="flex flex-col gap-[24px] h-[856px]">
      <Dropdown
        options={studySelect}
        placeholder="선택해 주세요"
        selected={selectStudy}
        onChange={setSelectStudy}
        label={
          <div className="text-[16px] mb-[16px]">
            <div className="flex gap-[16px]">
              <div>
                <span>스터디 선택</span>
                <span className="text-alertText">*</span>
              </div>
              <div className="text-[14px] text-disabled-text">
                스터디장으로 활동 중인 스터디를 선택하세요.
              </div>
            </div>
          </div>
        }
        className="w-[664px]"
      />
      <Dropdown
        options={recipients}
        placeholder="선택해 주세요"
        selected={selectRecipient}
        onChange={setSelectRecipient}
        label={
          <div className="text-[16px] mb-[16px]">
            <span>받는사람</span>
            <span className="text-alertText">*</span>
          </div>
        }
        className="w-[664px]"
      />
      <textarea
        className="bg-white border border-[#bdbdbd] rounded-[4px] px-[16px] py-[10px] h-[208px] mt-[16px] resize-none overflow-auto"
        placeholder="내용을 작성하새요"
      />

      <CommonButton variant="disabled">쪽지 보내기</CommonButton>
    </div>
  )
}
