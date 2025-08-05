import { useState } from 'react'
import SideCategoryMenu from '@/pages/category/SideCategoryMenu'
import SortTab from '@/common/SortTab'
import StudyCard from '@/common/StudyCard'
import defaultThumbnail from '@/assets/images/default-thumbnail.png'

const dummyData = [
  {
    imageUrl: defaultThumbnail,
    title: 'Python 웹크롤링 데이터 분석반',
    description:
      'BeautifulSoup, Selenium으로 웹 데이터를 수집하고 분석하는 실전형 스터디입니다.',
    memberCount: 4,
    time: '월, 수 오후 8시',
  },
  {
    imageUrl: defaultThumbnail,
    title: 'React 클론코딩 프로젝트 스터디',
    description:
      '넷플릭스, 인스타그램 클론코딩으로 실무 감각을 익히고 포트폴리오를 함께 만들어봐요.',
    memberCount: 6,
    time: '토요일 오후 5시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '알고리즘 문제풀이 매일 챌린지',
    description:
      '코테 준비하는 사람들 모여라! 백준, 프로그래머스 문제 매일 1개씩 풀고 서로 풀이 공유해요. 어려운 문제는 함께 토론하면서 실력 늘려봐요.',
    memberCount: 5,
    time: '수요일 오후 3시',
  },
]

export default function CategoryDetailPage() {
  const [sortOrder, setSortOrder] = useState<'latest' | 'popular'>('latest')

  return (
    <div className="w-full mt-[80px]">
      <div className="max-w-[1400px] mx-auto flex gap-[40px] py-[40px]">
        {/* 사이드 메뉴 */}
        <aside className="w-[200px] flex-shrink-0">
          <SideCategoryMenu />
        </aside>

        {/* 콘텐츠 영역 */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-[24px]">
            <h2 className="text-[20px] font-semibold">전체 스터디</h2>
            <SortTab selected={sortOrder} onChange={setSortOrder} />
          </div>

          <div className="flex flex-wrap gap-x-[40px] gap-y-[40px]">
            {(sortOrder === 'latest'
              ? dummyData
              : [...dummyData].reverse()
            ).map((item, index) => (
              <StudyCard
                key={index}
                imageUrl={item.imageUrl}
                title={item.title}
                description={item.description}
                memberCount={item.memberCount}
                time={item.time}
                variant="horizontal"
                thumbnailRatio="w-[360px] h-[200px]"
                className="w-[360px]"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
