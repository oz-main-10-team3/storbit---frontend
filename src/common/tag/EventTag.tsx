import { cn } from '@/utils/cn'
import { FaRegCalendarAlt } from "react-icons/fa";

interface EventTagProps {
  status: string 
  date: string  
  className?: string
}

const EventTag = ({ status, date, className }: EventTagProps) => {
  return (
    <div className={cn('flex gap-[4px] items-center h-[24px]', className)}>
      {/* 진행중 태그 */}
      <span
        className={cn(
          'bg-[#F45D75] text-white text-[12px]',
          'px-[4px] py-[4px] rounded-[4px]'
        )}
      >
        {status}
      </span>

      {/* 날짜 태그 */}
      <span
        className={cn(
          'flex items-center gap-[4px] border border-[#F45D75]',
          'text-[#F45D75] text-[12px]',
          'px-[4px] py-[4px] rounded-[4px]'
        )}
      >
        <FaRegCalendarAlt className="w-[16px] h-[16px]" />
        {date}
      </span>
    </div>
  )
}

export default EventTag