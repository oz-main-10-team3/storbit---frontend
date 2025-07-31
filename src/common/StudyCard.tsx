import { useState } from 'react'
import { cn } from '@/utils/cn'
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { BsClock } from 'react-icons/bs'

interface StudyCardProps {
  imageUrl: string
  title: string
  description: string
  memberCount?: number
  time?: string
  showBookmarkIcon?: boolean
  className?: string
  variant?: 'horizontal' | 'vertical'
  thumbnailRatio?: string
  onClick?: () => void
}

const StudyCard = ({
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
    setIsBookmarked(prev => !prev)
  }

  return (
    <div
      onClick={onClick}
      className={cn('block', wrapperClass, className)}
    >
      {/* 이미지 */}
      <div className={cn(imageClass, 'rounded-[8px] overflow-hidden')}>
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