// src/components/event/EventCard.tsx
import { Link, useNavigate } from 'react-router-dom'
import { useUserInfo } from '@/store/userInfoStore.ts'
import type { EventItem } from '@/types/event.ts'
import { isAdmin } from '@/utils/isAdmin.ts'
import { BiCalendar } from 'react-icons/bi'

const FALLBACK_THUMB = '/assets/event/thumb.png'

export function EventCard({ event }: { event: EventItem }) {
  const { userInfo } = useUserInfo()
  const navigate = useNavigate()

  

  const src = event.thumbnailUrl?.trim() || event.images[0] || FALLBACK_THUMB
  const formatMMDD = (iso?: string) => {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso.slice(5, 10) // YYYY-MM-DD... -> MM-DD
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${mm}-${dd}`
  }

  return (
    <div className="w-full max-w-[684px] flex flex-col gap-2">
      <div className="w-full h-[320px] rounded-md p-4 bg-white">
        {/* 썸네일 */}
        <div className="w-full h-[256px] bg-white flex items-center justify-center rounded overflow-hidden">
          <Link to={`/event/${event.id}`}>
            <img
              src={src}
              alt={event.title || '이벤트 썸네일'}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                if (e.currentTarget.src !== FALLBACK_THUMB)
                  e.currentTarget.src = FALLBACK_THUMB
              }}
              className="w-full h-full object-contain"
            />
          </Link>
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between mt-2">
          {/* 왼쪽 정보 */}
          <div className="flex items-center gap-[6px] min-w-0">
            {/* 진행 상태 */}
            <span
              aria-label={`이벤트 진행 상태: ${event.status}`}
              className="w-[56px] h-[24px] px-[6px] py-[2px] rounded bg-alertText text-text3 text-[11px] font-semibold flex items-center justify-center"
            >
              {event.status}
            </span>

            {/* 종료일 (MM-DD) */}
            <span className="w-[72px] h-[24px] text-[10px] border border-alertText text-alertText rounded bg-white px-[6px] py-[1px] flex items-center justify-center">
              <BiCalendar className="w-[12px] h-[12px] mr-[2px]" />~
              {formatMMDD(event.endDate)}
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
