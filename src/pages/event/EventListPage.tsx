import { useUserInfo } from '@/store/userInfoStore.ts'
import { useNavigate } from 'react-router-dom'
import { isAdmin } from '@/utils/isAdmin.ts'
import { EventCard } from '@/components/event/EventCard.tsx'
import { useEvents } from '@/hooks/useEvents'

export default function EventListPage() {
  const { userInfo } = useUserInfo()
  const navigate = useNavigate()

  const { data: events = [], isLoading, error } = useEvents()

  const handleCreateClick = () => {
    navigate('/admin/events/create')
  }

  if (isLoading) {
    return <div className="px-10 py-[72px] text-center">불러오는 중...</div>
  }

  if (error) {
    return (
      <div className="px-10 py-[72px] text-center text-red-500">
        이벤트를 불러오지 못했어요.
      </div>
    )
  }

  return (
    <div className="px-10 py-[72px]">
      <div className="flex justify-between items-center max-w-[1440px] mx-auto mb-10">
        <h2 className="text-[20px] font-bold text-black">주목 할 만한 소식</h2>
        {isAdmin(userInfo) && (
          <span
            onClick={handleCreateClick}
            className="text-text4 px-4 py-2 rounded cursor-pointer"
          >
            글쓰기
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-[56px] gap-y-[40px] max-w-[1440px] mx-auto">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col gap-2">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  )
}
