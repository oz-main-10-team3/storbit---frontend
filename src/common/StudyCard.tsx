import { cn } from '@/utils/cn'
import { IoHeartOutline } from 'react-icons/io5'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { BsClock } from 'react-icons/bs'

interface StudyCardProps {
  imageUrl: string
  title: string
  description: string
  memberCount?: number
  time?: string
  showBookmarkIcon?: boolean
  clickable?: boolean
  thumbnailRatio?: string
  className?: string // 외부에서 크기 커스터마이징 가능
  variant?: 'horizontal' | 'vertical'
  onClick?: () => void
}

const StudyCard = ({
  imageUrl,
  title,
  description,
  memberCount,
  time,
  className,
  variant = 'vertical',
  onClick,
}: StudyCardProps) => {
  const isVertical = variant === 'vertical'

  return (
    <div
      onClick={onClick}
      className={cn(
        'cursor-pointer',
        isVertical
          ? 'w-full max-w-[360px] min-w-[260px]'
          : 'w-full max-w-[440px]',
        className
      )}
    >
      {/* 이미지 */}
      <div
        className={cn(
          'rounded-[8px] overflow-hidden',
          isVertical ? 'w-full h-[360px]' : 'w-full h-[260px]'
        )}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className={cn('mt-[16px]')}>
        <div className="flex justify-between items-start">
          <p className="text-[18px] font-semibold text-[#121212] line-clamp-1">{title}</p>
          <IoHeartOutline className="w-[24px] h-[24px] text-[#bdbdbd] shrink-0 mt-[1px]" />
        </div>

        <p className="text-[14px] text-[#121212] mt-[4px] text-left line-clamp-2">
          {description}
        </p>

        {(memberCount || time) && (
          <div className="flex items-center gap-4 text-sm text-[#bdbdbd] mt-[12px]">
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