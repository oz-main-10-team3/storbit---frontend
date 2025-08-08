import { useLocation } from 'react-router-dom'
import CategoryBanner from '@/components/Category/CategoryBanner'
import { dummyData } from '@/data/dummyData'
import StudyCard from '@/common/StudyCard'
import CategorySectionSlider from '@/components/Category/CategorySectionSlider'

// 상단 타이틀
const sectionTitles: Record<string, string> = {
  best: '스토빗 BEST STUDY 3',
  popular: '실시간 HOT STUDY 3',
  weekend: '주말반 BEST STUDY 3',
  dawn: '새벽반 BEST STUDY 3',
  deadline: '마감임박 STUDY BEST 3',
  goal: '성공 STUDY BEST 3',
  beginner: '왕초보 BEST STUDY 3',
}

// 슬라이더 타이틀 접미어 (조건에 따라)
const getSliderSuffix = (filter: string) => {
  return filter === 'popular' ? 'HOT STUDY' : 'BEST STUDY'
}

// 대분류 카테고리들
const majorCategories = [
  '언어',
  '자격증',
  '디자인',
  'IT・프로그래밍',
  '경영・마케팅',
  '취미',
]

const CategoryShortcutPage = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const filter = queryParams.get('filter') ?? 'best'

  const sectionTitle = sectionTitles[filter] || ''
  const sliderSuffix = getSliderSuffix(filter)

  const top3 = dummyData.slice(0, 3)
  const rest = dummyData.slice(3)

  return (
    <div className="min-h-screen bg-white">
      {/* 배너 */}
      <CategoryBanner filter={filter} />

      {/* 상단: 타이틀 + 카드 3개 */}
      <section className="pt-12 pb-4 max-w-[1400px] mx-auto">
        {sectionTitle && (
          <h2 className="text-xl font-semibold mb-6">{sectionTitle}</h2>
        )}
        <div className="flex gap-[40px]">
          {top3.map((study, i) => (
            <StudyCard
              key={i}
              imageUrl={study.imageUrl}
              title={study.title}
              description={study.description}
              memberCount={study.memberCount}
              time={study.time ?? ''}
              variant="horizontal"
              thumbnailRatio="w-[440px] h-[256px]"
              className="w-[440px]"
            />
          ))}
        </div>
      </section>

      {/* 하단 슬라이더 섹션 */}
      <section className="max-w-[1400px] mx-auto">
        {majorCategories.map((category, i) => (
          <CategorySectionSlider
            key={i}
            title={`${category} ${sliderSuffix}`}
            data={rest}
            visibleCount={3}
          />
        ))}
      </section>
    </div>
  )
}

export default CategoryShortcutPage
