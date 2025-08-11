import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { dummyData } from '@/data/dummyData'
import StudyCard from '@/common/StudyCard'
import SearchEmptyState from '@/components/search/SearchEmptyState'

// dummyData 한 아이템의 타입 재사용
type Study = (typeof dummyData)[number]

export default function SearchResultPage() {
  const { query } = useParams<{ query: string }>()

  const results = useMemo<Study[]>(() => {
    if (!query) return []
    const lower = query.toLowerCase()

    return dummyData.filter((item) => {
      const title = (item.title ?? '').toLowerCase()
      const desc = (item.description ?? '').toLowerCase()
      const category = (item.category ?? '').toLowerCase()
      return (
        title.includes(lower) ||
        desc.includes(lower) ||
        category.includes(lower)
      )
    })
  }, [query])

  if (!query || results.length === 0) return <SearchEmptyState />

  return (
    <div className="w-[1400px] mx-auto px-[20px] py-[40px]">
      <h2 className="text-[24px] font-bold mb-[32px]">
        ‘{query}’으로 검색한 결과 입니다 ({results.length})
      </h2>

      {/* 3열 고정, 간격 40px */}
      <div className="grid grid-cols-3 gap-[40px]">
        {results.map((item, idx) => (
          <StudyCard
            key={`${item.title}-${idx}`}
            variant="horizontal"
            className="w-[440px]"
            thumbnailRatio="w-[440px] h-[256px]"
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
            memberCount={item.memberCount}
            time={item.time}
          />
        ))}
      </div>
    </div>
  )
}
