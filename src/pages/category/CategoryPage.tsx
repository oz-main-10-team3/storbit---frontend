import { useState } from 'react'
import StudyCard from '@/common/StudyCard'
import SideCategoryMenu from '@/pages/category/SideCategoryMenu'
import defaultThumbnail from '@/assets/images/default-thumbnail.png'
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

const dummyData = [
  {
    imageUrl: defaultThumbnail,
    title: 'Python 웹크롤링 데이터 분석반',
    description: '파이썬으로 웹 데이터 수집부터 분석까지! BeautifulSoup, Selenium 사용법 배우고 실제 프로젝트 만들어봐요. 매주 실습 과제로 포트폴리오도 완성해요.',
    memberCount: 4,
    time: '월, 수 오후 8시',
  },
  {
    imageUrl: defaultThumbnail,
    title: 'React 클론코딩 프로젝트 스터디',
    description: '넷플릭스, 인스타그램 같은 유명 서비스 클론코딩해봐요! 컴포넌트 설계부터 상태관리까지 실무 개발 경험 쌓으면서 취업 준비도 함께해요.',
    memberCount: 5,
    time: '토요일 오후 5시',
  },
  {
    imageUrl: defaultThumbnail,
    title: '알고리즘 문제풀이 매일 챌린지',
    description: '코테 준비하는 사람들 모여라! 백준, 프로그래머스 문제 매일 1개씩 풀고 서로 풀이 공유해요. 어려운 문제는 함께 토론하면서 실력 늘려봐요.',
    memberCount: 5,
    time: '수요일 오후 3시',
  },
]

export default function CategoryPage() {
  const [startIndex, setStartIndex] = useState(0)
  const maxVisible = 3
  const newStudyData = dummyData.concat(dummyData) // 최대 6개까지 보이게
  const visibleNewStudies = newStudyData.slice(startIndex, startIndex + maxVisible)

  const handleNext = () => {
    if (startIndex + maxVisible < newStudyData.length) {
      setStartIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="w-full mt-[80px]">
      <div className="max-w-[1400px] mx-auto flex gap-[40px] py-[40px]">
        <aside className="w-[200px] flex-shrink-0">
          <SideCategoryMenu />
        </aside>

        <section className="flex-1 flex flex-col gap-[64px]">

          {/* 주간 인기 스터디 */}
          <div>
            <h2 className="text-[20px] font-semibold mb-[24px]">주간 인기 STUDY</h2>
            <div className="flex flex-wrap gap-x-[40px] gap-y-[40px]">
              {dummyData.map((item, index) => (
                <StudyCard
                  key={`weekly-${index}`}
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
          </div>

          {/* 신규 스터디 */}
          <div>
            <div className="flex justify-between items-center mt-[80px] mb-[24px]">
              <h2 className="text-[20px] font-semibold flex items-center">신규 STUDY</h2>
              <div className="flex gap-[8px] items-center">
                <button
                  onClick={handlePrev}
                  disabled={startIndex === 0}
                  className={`flex items-center justify-center w-[32px] h-[32px] cursor-pointer transition-colors duration-200
                    ${startIndex === 0 ? 'text-[#bdbdbd]' : 'text-[#8349FF]'}`}
                >
                  <FiChevronLeft className="w-[20px] h-[20px]" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={startIndex + maxVisible >= newStudyData.length}
                  className={`flex items-center justify-center w-[32px] h-[32px] cursor-pointer transition-colors duration-200
                    ${startIndex + maxVisible >= newStudyData.length ? 'text-[#bdbdbd]' : 'text-[#8349FF]'}`}
                >
                  <FiChevronRight className="w-[20px] h-[20px]" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-[40px] gap-y-[40px] transition-all duration-300">
              {visibleNewStudies.map((item, index) => (
                <StudyCard
                  key={`new-${startIndex + index}`}
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
          </div>

          {/* 전체 STUDY */}
          <div>
            <h2 className="text-[20px] font-semibold mt-[80px] mb-[24px]">전체 STUDY</h2>
            <div className="flex flex-wrap gap-x-[40px] gap-y-[40px]">
              {dummyData.concat(dummyData).slice(0, 4).map((item, index) => (
                <StudyCard
                  key={`total-${index}`}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  description={item.description}
                  memberCount={item.memberCount}
                  time={item.time}
                  variant="vertical"
                  thumbnailRatio="w-[260px] h-[260px]"
                  className="w-[260px]"
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}