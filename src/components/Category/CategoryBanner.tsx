import bestImg from '@/assets/images/best-banner.png'
import popularImg from '@/assets/images/hot-banner.png'
import weekendImg from '@/assets/images/weekend-banner.png'
import dawnImg from '@/assets/images/dawn-banner.png'
import deadlineImg from '@/assets/images/deadline-banner.png'
import goalImg from '@/assets/images/achievement-banner.png'
import beginnerImg from '@/assets/images/beginner-banner.png'
import customImg from '@/assets/images/custom-banner.png' // 맞춤추천용

interface CategoryBannerProps {
  filter: string | null
}

const bannerImageMap: Record<string, string> = {
  best: bestImg,
  popular: popularImg,
  weekend: weekendImg,
  dawn: dawnImg,
  deadline: deadlineImg,
  goal: goalImg,
  beginner: beginnerImg,
  custom: customImg,
}

const CategoryBanner = ({ filter }: CategoryBannerProps) => {
  // 잘못된 filter 값이 들어오면 기본값 best로 폴백
  const key = filter && bannerImageMap[filter] ? filter : 'best'
  const banner = bannerImageMap[key]

  return (
    <div className="w-full">
      <img
        src={banner}
        alt={`${key} 배너`}
        className="w-full h-[256px] object-cover" // 높이 고정 + 비율 유지
        loading="eager"
        onError={(e) => {
          // 이미지 로딩 실패 시 기본 배너로 변경
          ;(e.currentTarget as HTMLImageElement).src = bestImg
        }}
      />
    </div>
  )
}

export default CategoryBanner
