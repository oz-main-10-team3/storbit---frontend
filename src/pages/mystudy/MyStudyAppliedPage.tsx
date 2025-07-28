import { useState } from 'react'
import Dropdown from '@/common/DropDown.tsx'

const studyTimes = [
  { label: '오전 12:00', value: '00:00' },
  { label: '오전 1:00', value: '01:00' },
  { label: '오전 2:00', value: '02:00' },
  { label: '오전 3:00', value: '03:00' },
  { label: '오전 5:00', value: '05:00' },
  { label: '오전 6:00', value: '06:00' },
  { label: '오전 7:00', value: '07:00' },
  { label: '오전 8:00', value: '08:00' },
  { label: '오전 9:00', value: '09:00' },
]

const studyLevels = [
  { label: '왕초보', value: 'noob' },
  { label: '초급', value: 'beginner' },
  { label: '중급', value: 'intermediate' },
  { label: '고급', value: 'advanced' },
  { label: '마스터', value: 'master' },
  { label: '무관', value: 'any' },
]

const studyMembers = Array.from({ length: 10 }, (_, i) => ({
  label: String(i + 1),
  value: i + 1,
}))

export default function StudyFilterPanel() {
  const [time, setTime] = useState<string | undefined>()
  const [level, setLevel] = useState<string | undefined>()
  const [member, setMember] = useState<number | undefined>()

  return (
    <section className="flex gap-10 p-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">스터디 시간</label>
        <Dropdown
          options={studyTimes}
          selected={time}
          onChange={setTime}
          placeholder="선택해 주세요"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">스터디 레벨</label>
        <Dropdown
          options={studyLevels}
          selected={level}
          onChange={setLevel}
          placeholder="선택해 주세요"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">스터디 인원</label>
        <Dropdown
          options={studyMembers}
          selected={member}
          onChange={setMember}
          placeholder="선택해 주세요"
        />
      </div>
    </section>
  )
}
