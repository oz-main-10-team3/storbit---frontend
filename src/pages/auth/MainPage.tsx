import StudyCard from '@/common/StudyCard'
import { dummyData } from '@/data/dummyData'
import MainBanner from '@/components/Main/MainBanner'

const GuestMainPage = () => {
  return (
  <>
  <MainBanner />
  {/* HOT STUDY */}
  <section className="py-6 px-4">
    <div className="max-w-[1400px] mx-auto">
      <h2 className="text-xl font-semibold mb-4">오늘의 HOT STUDY 10</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
        {dummyData.slice(0, 3).map((item, index) => (
          <StudyCard
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
            memberCount={item.memberCount}
            time={item.time}
            variant="horizontal"
            thumbnailRatio="w-[440px] h-[256px]"
            className="w-[440px]"
          />
        ))}
      </div>
    </div>
  </section>

  {/* NEW STUDY */}
  <section className="py-6 px-4">
    <div className="max-w-[1400px] mx-auto">
      <h2 className="text-xl font-semibold mb-4">NEW STUDY</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px]">
        {dummyData.slice(3, 6).map((item, index) => (
          <StudyCard
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
            memberCount={item.memberCount}
            time={item.time}
            variant="horizontal"
            thumbnailRatio="w-[440px] h-[256px]"
            className="w-[440px]"
          />
        ))}
      </div>
    </div>
  </section>

  {/* STEADY STUDY */}
  <section className="py-6 px-4">
    <div className="max-w-[1400px] mx-auto">
      <h2 className="text-xl font-semibold mb-4">STEADY STUDY</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[40px]">
        {dummyData.slice(6, 10).map((item, index) => (
          <StudyCard
            key={index}
            imageUrl={item.imageUrl}
            title={item.title}
            description={item.description}
            memberCount={item.memberCount}
            time={item.time}
            variant="vertical"
            thumbnailRatio="w-[320px] h-[320px]"
            className="w-[320px]"
          />
        ))}
      </div>
    </div>
  </section>
    </>
  )
}

export default GuestMainPage