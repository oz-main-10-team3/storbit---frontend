import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/utils/cn'
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { BsClock } from 'react-icons/bs'
import StudyTag from '@/common/tag/StudyTag'

interface StudyCardProps {
  id?: number
  imageUrl: string
  title: string
  description: string
  memberCount?: number
  time?: string
  showBookmarkIcon?: boolean
  className?: string //외부에서 카드 전체 스타일을 확장할 때 사용 (Tailwind 클래스)
  variant?: 'horizontal' | 'vertical'
  thumbnailRatio?: string //썸네일 이미지 영역의 크기를 커스터마이징할 때 사용
  onClick?: () => void
}

const StudyCard = ({
  id,
  imageUrl,
  title,
  description,
  memberCount,
  time,
  showBookmarkIcon,
  className,
  variant = 'vertical',
  thumbnailRatio,
  onClick,
}: StudyCardProps) => {
  const isVertical = variant === 'vertical'
  const [isBookmarked, setIsBookmarked] = useState(false)

  const imageClass = thumbnailRatio
    ? thumbnailRatio
    : isVertical
      ? 'w-[320px] h-[320px]'
      : 'w-[440px] h-[256px]'

  const wrapperClass = isVertical ? 'w-[320px]' : 'w-[440px]'

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation() // 카드 클릭 방지
    setIsBookmarked((prev) => !prev)
  }
  const Navigate = useNavigate()
  const handleCardClick = () => {
    Navigate(`/study/detail/${id}`)
    if (onClick) onClick()
  }
  return (
    <div
      onClick={handleCardClick}
      className={cn('block', wrapperClass, className)}
    >
      {/* 이미지 영역 */}
      <div className={cn(imageClass, 'relative rounded-[8px] overflow-hidden')}>
        {/* 태그 박스 */}
        <div className="absolute top-[16px] right-[16px] flex gap-[4px] z-10">
          <StudyTag variant="level" text="초급" />
          <StudyTag variant="category" text="프로그래밍" />
        </div>

        {/* 이미지 */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className={cn(isVertical ? 'pt-[16px]' : 'pt-[20px]')}>
        <div className="flex justify-between items-start">
          <p className="text-[18px] font-semibold text-[#121212] line-clamp-1">
            {title}
          </p>
          {showBookmarkIcon !== false && (
            <button onClick={handleBookmarkClick}>
              {isBookmarked ? (
                <IoHeartSharp className="w-[24px] h-[24px] text-[#8349FF] cursor-pointer" />
              ) : (
                <IoHeartOutline className="w-[24px] h-[24px] text-[#bdbdbd] cursor-pointer" />
              )}
            </button>
          )}
        </div>

        <p className="text-[14px] text-[#121212] mt-[8px] text-left line-clamp-2">
          {description}
        </p>

        {!isVertical && (memberCount || time) && (
          <div className="flex items-center gap-4 text-sm text-[#bdbdbd] mt-4">
            {memberCount !== undefined && (
              <div className="flex items-center gap-1">
                <HiOutlineUserGroup className="w-[16px] h-[16px]" />
                <span>{memberCount}/10</span>
              </div>
            )}
            {time && (
              <div className="flex items-center gap-1">
                <BsClock className="w-[16px] h-[16px]" />
                <span>{time}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default StudyCard
