import { useMemo, useState } from 'react'
import CategoryBanner from '@/components/Category/CategoryBanner'
import StudyCard from '@/common/StudyCard'
import SortTab from '@/common/SortTab'
import { dummyData } from '@/data/dummyData'

type Order = 'latest' | 'popular'

interface PersonalizedPageProps {
  nickname?: string
}

export default function CustomRecommendPage({
  nickname = '뭉치면주먹밥',
}: PersonalizedPageProps) {
  // 상단 3개: 닉네임 맞춤 추천 (임시로 앞에서 3개)
  const top3 = useMemo(() => dummyData.slice(0, 3), [])

  // 하단 6개: 닉네임과 비슷한 사람들의 스터디
  const [order, setOrder] = useState<Order>('latest')

  const similar6 = useMemo(() => {
    const base = dummyData.slice(3) // 상단에 쓴 3개 제외
    if (order === 'popular') {
      // "인기순": 멤버 수 기준 내림차순 (mock)
      return [...base]
        .sort((a, b) => (b.memberCount ?? 0) - (a.memberCount ?? 0))
        .slice(0, 6)
    }
    // "최신순": 데이터 순서 유지 (mock)
    return base.slice(0, 6)
  }, [order])

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ 맞춤추천 전용 배너 */}
      <CategoryBanner filter="custom" />

      {/* 섹션 1: 닉네임을 위한 STUDY 3 */}
      <section className="px-4 pt-12 pb-8 mb-[88px]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[20px] font-semibold mb-4">
            {nickname}을 위한 STUDY 3
          </h2>
          <div className="flex gap-[40px]">
            {top3.map((item, i) => (
              <StudyCard
                key={`foryou-${i}`}
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                memberCount={item.memberCount}
                time={item.time ?? ''}
                variant="horizontal"
                thumbnailRatio="w-[440px] h-[256px]"
                className="w-[440px]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 2: 닉네임 비슷한 사람들의 STUDY (정렬 탭 포함) */}
      <section className="px-4 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-[24px]">
            <h2 className="text-[20px] font-semibold">
              {nickname}과(와) 비슷한 사람들의 STUDY
            </h2>
            <SortTab selected={order} onChange={setOrder} />
          </div>

          {/* 6개: 두 줄(3 + 3)로 보이도록 flex + wrap */}
          <div className="flex flex-wrap gap-[40px]">
            {similar6.map((item, i) => (
              <StudyCard
                key={`similar-${i}`}
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                memberCount={item.memberCount}
                time={item.time ?? ''}
                variant="horizontal"
                thumbnailRatio="w-[440px] h-[256px]"
                className="w-[440px]"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
