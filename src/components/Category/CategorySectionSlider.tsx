import { useState } from 'react'
import StudyCard from '@/common/StudyCard'
import ArrowNavigation from '@/common/ArrowNavigation'

interface StudyCardData {
  imageUrl: string
  title: string
  description: string
  memberCount?: number
  time: string
}

interface CategorySectionSliderProps {
  title: string
  data: StudyCardData[]
  visibleCount?: number
  cardWidth?: number
  gap?: number
}

const CategorySectionSlider = ({
  title,
  data,
  visibleCount = 3,
  cardWidth = 440,
  gap = 40,
}: CategorySectionSliderProps) => {
  const [index, setIndex] = useState(0)
  const maxIndex = Math.max(0, data.length - visibleCount)

  const totalWidth = data.length * cardWidth + (data.length - 1) * gap

  return (
    <section className="mt-[88px]">
      <div className="max-w-[1400px] mx-auto mb-[88px]">
        {/* 타이틀 + 화살표 */}
        <div className="flex items-center justify-between mb-[24px]">
          <h2 className="text-xl font-semibold">{title}</h2>
          <ArrowNavigation
            onPrev={() => setIndex((prev) => Math.max(prev - 1, 0))}
            onNext={() => setIndex((prev) => Math.min(prev + 1, maxIndex))}
            isPrevDisabled={index === 0}
            isNextDisabled={index >= maxIndex}
          />
        </div>

        {/* 슬라이더 */}
        <div className="relative overflow-hidden w-[1400px]">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${index * (cardWidth + gap)}px)`,
              width: `${totalWidth}px`,
              gap: `${gap}px`,
            }}
          >
            {data.map((item, i) => (
              <div
                key={i}
                className="shrink-0"
                style={{ width: `${cardWidth}px` }}
              >
                <StudyCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  description={item.description}
                  memberCount={item.memberCount}
                  time={item.time}
                  variant="horizontal"
                  thumbnailRatio={`w-[${cardWidth}px] h-[256px]`}
                  className={`w-[${cardWidth}px]`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategorySectionSlider
