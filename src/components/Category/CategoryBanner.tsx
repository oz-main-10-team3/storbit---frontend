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
  const banner = bannerImageMap[filter ?? 'best']
  if (!banner) return null

  return (
    <div className="w-full">
      <img
        src={banner}
        alt={`${filter} 배너`}
        className="w-full object-cover"
      />
    </div>
  )
}

export default CategoryBanner
