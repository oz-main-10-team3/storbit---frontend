import { useState } from 'react'
import StudyCard from '@/common/StudyCard'
import { dummyData } from '@/data/dummyData'
import MainBanner from '@/components/Main/MainBanner'
import CategoryShortcutTabs from '@/components/Main/CategoryShortcutTabs'
import ArrowNavigation from '@/common/ArrowNavigation'
import JoinedStudySection from '@/components/Main/JoinedStudySection'
import { useQuery } from '@tanstack/react-query'
import { mainApi } from '@/api/mainApi'
import type { StudyRoomsResponse } from '@/types/StudyCardDataType'
import { formatSchedule } from '@/utils/formatSchedule'
import { isoToKoreanTime } from '@/utils/isoToKoreanTime'

const isLoggedIn = false // 추후 로그인 구현 시 교체 예정

const MainPage = () => {
  const imgBaseUrl = import.meta.env.VITE_API_MAIN_URL

  const { data: newData = [] } = useQuery({
    queryKey: ['eventList', { type: 'new' }],
    queryFn: async () => {
      const response = await mainApi.get<StudyRoomsResponse>('/api/study-rooms')
      return response.data.results
    },
  })
  // 슬라이드 인덱스 상태
  const [hotIndex, setHotIndex] = useState(0)
  const [newIndex, setNewIndex] = useState(0)
  const [steadyIndex, setSteadyIndex] = useState(0)

  // 보여질 카드 수
  const HOT_VISIBLE = 3
  const NEW_VISIBLE = 3
  const STEADY_VISIBLE = 4

  // 데이터
  const hotData = dummyData.slice(0, 10)
  // const newData = dummyData.slice(0, 10)
  const steadyData = dummyData.slice(0, 10)

  // 인덱스 최대값 보정
  const maxHotIndex = Math.max(0, hotData.length - HOT_VISIBLE)
  const maxNewIndex = Math.max(0, newData.length - NEW_VISIBLE)
  const maxSteadyIndex = Math.max(0, steadyData.length - STEADY_VISIBLE)

  const user = {
    nickname: '뭉치면주먹밥',
    joinedStudies: dummyData.slice(0, 6),
  }

  return (
    <>
      <MainBanner />
      <CategoryShortcutTabs />
      {isLoggedIn && (
        <JoinedStudySection
          nickname={user.nickname}
          studies={user.joinedStudies}
        />
      )}

      {/* HOT STUDY */}
      <section className="py-6 px-4">
        <div className="max-w-[1400px] mx-auto mb-[88px]">
          <div className="flex items-center justify-between mb-[32px]">
            <h2 className="text-[20px] font-semibold">오늘의 HOT STUDY 10</h2>
            <ArrowNavigation
              onPrev={() => setHotIndex((prev) => Math.max(prev - 1, 0))}
              onNext={() =>
                setHotIndex((prev) => Math.min(prev + 1, maxHotIndex))
              }
              isPrevDisabled={hotIndex === 0}
              isNextDisabled={hotIndex >= maxHotIndex}
            />
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 gap-[40px]"
              style={{
                transform: `translateX(-${hotIndex * (440 + 40)}px)`,
                width: `${hotData.length * (440 + 40)}px`,
              }}
            >
              {hotData.map((item, index) => (
                <div key={`hot-${index}`} className="shrink-0 w-[440px]">
                  <StudyCard
                    id={item.id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    description={item.description}
                    memberCount={item.memberCount}
                    time={item.time}
                    variant="horizontal"
                    thumbnailRatio="w-[440px] h-[256px]"
                    className="w-[440px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW STUDY */}
      <section className="py-6 px-4">
        <div className="max-w-[1400px] mx-auto mb-[88px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-semibold">NEW STUDY</h2>
            <ArrowNavigation
              onPrev={() => setNewIndex((prev) => Math.max(prev - 1, 0))}
              onNext={() =>
                setNewIndex((prev) => Math.min(prev + 1, maxNewIndex))
              }
              isPrevDisabled={newIndex === 0}
              isNextDisabled={newIndex >= maxNewIndex}
            />
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 gap-[40px]"
              style={{
                transform: `translateX(-${newIndex * (440 + 40)}px)`,
                width: `${newData.length * (440 + 40)}px`,
              }}
            >
              {newData.map((item, index) => (
                <div
                  key={`new-${index}`}
                  className="shrink-0 w-[440px] cursor-pointer"
                >
                  <StudyCard
                    id={item.id}
                    imageUrl={`${imgBaseUrl}${item.thumbnail_url}`}
                    title={item.title}
                    description={item.description}
                    memberCount={item.accepted_count}
                    maxMember={item.member}
                    time={formatSchedule(
                      item.schedule,
                      isoToKoreanTime(item.start_time)
                    )}
                    level={item.level}
                    category={item.category}
                    variant="horizontal"
                    thumbnailRatio="w-[440px] h-[256px]"
                    className="w-[440px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STEADY STUDY */}
      <section className="py-6 px-4">
        <div className="max-w-[1400px] mx-auto mb-[120px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">STEADY STUDY</h2>
            <ArrowNavigation
              onPrev={() => setSteadyIndex((prev) => Math.max(prev - 1, 0))}
              onNext={() =>
                setSteadyIndex((prev) => Math.min(prev + 1, maxSteadyIndex))
              }
              isPrevDisabled={steadyIndex === 0}
              isNextDisabled={steadyIndex >= maxSteadyIndex}
            />
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 gap-[40px]"
              style={{
                transform: `translateX(-${steadyIndex * (320 + 40)}px)`,
                width: `${steadyData.length * (320 + 40)}px`,
              }}
            >
              {steadyData.map((item, index) => (
                <div
                  key={`steady-${index}`}
                  className="shrink-0 w-[320px] cursor-pointer"
                >
                  <StudyCard
                    id={item.id}
                    imageUrl={item.imageUrl}
                    title={item.title}
                    description={item.description}
                    memberCount={item.memberCount}
                    time={item.time}
                    variant="vertical"
                    thumbnailRatio="w-[320px] h-[320px]"
                    className="w-[320px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MainPage
