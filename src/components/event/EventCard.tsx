import { Link, useNavigate } from 'react-router-dom'
import { useUserInfo } from '@/store/userInfoStore.ts'
import type { EventItem } from '@/types/event.ts'
import { isAdmin } from '@/utils/isAdmin.ts'
import { BiCalendar } from 'react-icons/bi'

export function EventCard({ event }: { event: EventItem }) {
  const { userInfo } = useUserInfo()
  const navigate = useNavigate()

  if (event.status !== '진행중') return null

  return (
    <div className="w-full max-w-[684px] flex flex-col gap-2">
      <div className="w-full h-[320px] rounded-md  p-4 bg-white">
        {/* 썸네일 */}
        <div className="w-full h-[256px] bg-white flex items-center justify-center rounded overflow-hidden">
          <Link to={`/event/${event.id}`}>
            <img
              src={event.thumbnailUrl}
              alt="썸네일"
              className="w-[684px] h-full object-contain "
            />
          </Link>
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between mt-2">
          {/* 왼쪽 정보 */}
          <div className="flex items-center gap-[6px]">
            {/* 진행 상태 */}
            <span className="w-[56px] h-[24px] px-[6px] py-[2px] rounded bg-alertText text-text3 text-[11px] font-semibold flex items-center justify-center">
              {event.status}
            </span>

            {/* 종료일 */}
            <span className="w-[72px] h-[24px] text-[10px] border border-alertText text-alertText rounded bg-white px-[6px] py-[1px] flex items-center justify-center">
              <BiCalendar className="w-[12px] h-[12px] mr-[2px]" />~
              {event.endDate?.slice(5)}
            </span>

            {/* 타이틀 */}
            <span className="text-[14px] font-semibold text-gray-900 truncate ml-2">
              {event.title}
            </span>
          </div>

          {/* 관리자용 수정 버튼 */}
          {isAdmin(userInfo) && (
            <button
              onClick={() => navigate(`/admin/events/update/${event.id}`)}
              className="text-sm text-text4 hover:underline ml-auto"
            >
              수정
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
