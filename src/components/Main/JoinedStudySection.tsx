import { useState } from 'react'
import StudyCard from '@/common/StudyCard'
import ArrowNavigation from '@/common/ArrowNavigation'
import CommonButton from '@/common/CommonButton'

interface StudyCardData {
  imageUrl: string
  title: string
  description: string
  memberCount?: number
  time: string
}

interface JoinedStudySectionProps {
  nickname: string
  studies: StudyCardData[]
}

const JoinedStudySection = ({ nickname, studies }: JoinedStudySectionProps) => {
  const [index, setIndex] = useState(0)
  const VISIBLE = 3
  const CARD_WIDTH = 440
  const GAP = 40
  const maxIndex = Math.max(0, studies.length - VISIBLE)

  if (studies.length === 0) return null

  return (
    <section className="py-6 px-4">
      <div className="max-w-[1400px] mx-auto mb-[88px]">
        <div className="flex items-center justify-between mb-[32px]">
          <h2 className="text-xl font-semibold">{nickname}님의 스터디</h2>
          <ArrowNavigation
            onPrev={() => setIndex((prev) => Math.max(prev - 1, 0))}
            onNext={() => setIndex((prev) => Math.min(prev + 1, maxIndex))}
            isPrevDisabled={index === 0}
            isNextDisabled={index >= maxIndex}
          />
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300 gap-[40px]"
            style={{
              transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
              width: `${studies.length * (CARD_WIDTH + GAP)}px`,
            }}
          >
            {studies.map((item, i) => (
              <div
                key={`joined-${i}`}
                className="shrink-0 w-[440px] flex flex-col gap-2"
              >
                <StudyCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  description={item.description}
                  memberCount={item.memberCount}
                  time={item.time}
                  variant="horizontal"
                  thumbnailRatio="w-[440px] h-[256px]"
                  className="w-[440px]"
                />
                <CommonButton
                  variant="primary"
                  visualScale="md"
                  onClick={() => alert(`${item.title} 스터디 페이지로 이동`)}
                >
                  스터디 참여
                </CommonButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JoinedStudySection
