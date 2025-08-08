import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PiMedal, PiTarget } from 'react-icons/pi'
import { TbFocus2, TbBomb } from 'react-icons/tb'
import { FaFireAlt, FaStar } from 'react-icons/fa'
import { LuSunMedium, LuFilePen } from 'react-icons/lu'

type Tab = {
  label: string
  filter:
    | 'best'
    | 'popular'
    | 'custom'
    | 'weekend'
    | 'dawn'
    | 'deadline'
    | 'goal'
    | 'beginner'
  icon: React.ReactNode
}

const tabs: Tab[] = [
  { label: 'BEST', filter: 'best', icon: <PiMedal size={28} /> },
  { label: '실시간 인기', filter: 'popular', icon: <FaFireAlt size={28} /> },
  { label: '맞춤추천', filter: 'custom', icon: <FaStar size={28} /> },
  { label: '주말집중', filter: 'weekend', icon: <TbFocus2 size={28} /> },
  { label: '새벽챌린지', filter: 'dawn', icon: <LuSunMedium size={28} /> },
  { label: '마감임박', filter: 'deadline', icon: <TbBomb size={28} /> },
  { label: '목표달성', filter: 'goal', icon: <PiTarget size={28} /> },
  { label: '초보스터디', filter: 'beginner', icon: <LuFilePen size={28} /> },
]

const CategoryShortcutTabs = () => {
  const navigate = useNavigate()

  const handleClick = (tab: Tab) => {
    if (tab.filter === 'custom') {
      // 맞춤추천은 전용 페이지로
      navigate('/studies/custom')
    } else {
      // 나머지는 필터 파라미터로 이동
      navigate(`/studies?filter=${tab.filter}`)
    }
  }

  return (
    <section className="py-6 px-4">
      <div className="max-w-[1400px] mx-auto mt-[72px] mb-[72px] flex gap-[32px] justify-center flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.filter}
            onClick={() => handleClick(tab)}
            className="flex flex-col items-center gap-[8px] cursor-pointer"
          >
            <div className="w-[72px] h-[72px] rounded-[28px] bg-[#6B46C1] flex items-center justify-center text-white">
              {tab.icon}
            </div>
            <span className="text-[16px]">{tab.label}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default CategoryShortcutTabs
