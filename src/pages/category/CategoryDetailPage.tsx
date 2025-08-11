import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import SideCategoryMenu from '@/pages/category/SideCategoryMenu'
import SortTab from '@/common/SortTab'
import StudyCard from '@/common/StudyCard'
import defaultThumbnail from '@/assets/images/default-thumbnail.png'
import { dummyData } from '@/data/dummyData'

// dummyData 아이템 타입 재사용
type Study = (typeof dummyData)[number]

const decodePath = (s?: string) =>
  s ? decodeURIComponent(s).replace(/-/g, ' ') : ''

export default function CategoryDetailPage() {
  const { category: rawCat } = useParams()
  const category = decodePath(rawCat)

  const [sortOrder, setSortOrder] = useState<'latest' | 'popular'>('latest')

  // 전역 dummyData 기반으로 목록 구성 (카테고리 필터 + 정렬)
  const list = useMemo<Study[]>(() => {
    const base = category
      ? dummyData.filter(
          (d) => (d.category ?? '').toLowerCase() === category.toLowerCase()
        )
      : dummyData

    if (sortOrder === 'popular') {
      return [...base].sort(
        (a, b) => (b.memberCount ?? 0) - (a.memberCount ?? 0)
      )
    }
    return base
  }, [category, sortOrder])

  // 상단 타이틀 고정
  const title = '전체 스터디'

  return (
    <div className="w-full mt-[80px]">
      <div className="max-w-[1400px] mx-auto flex gap-[40px] py-[40px]">
        <aside className="w-[200px] flex-shrink-0">
          <SideCategoryMenu />
        </aside>

        <section className="flex-1">
          <div className="flex justify-between items-center mb-[24px]">
            <h2 className="text-[20px] font-semibold">{title}</h2>
            <SortTab selected={sortOrder} onChange={setSortOrder} />
          </div>

          <div className="flex flex-wrap gap-x-[40px] gap-y-[40px]">
            {list.map((item, index) => (
              <StudyCard
                key={index}
                variant="horizontal"
                className="w-[360px]"
                thumbnailRatio="w-[360px] h-[200px]"
                imageUrl={item.imageUrl ?? defaultThumbnail}
                title={item.title}
                description={item.description}
                memberCount={item.memberCount}
                time={item.time}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
