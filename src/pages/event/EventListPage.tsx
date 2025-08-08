import { useUserInfo } from '@/store/userInfoStore.ts'
import { useNavigate } from 'react-router-dom'
import { isAdmin } from '@/utils/isAdmin.ts'
import { eventMockData } from '@/data/eventMockData.ts'
import { EventCard } from '@/components/event/EventCard.tsx'

export default function EventListPage() {
  const { userInfo } = useUserInfo()
  const navigate = useNavigate()

  const handleCreateClick = () => {
    navigate('/admin/events/create')
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
        {eventMockData
          .filter((event) => event.status === '진행중')
          .map((event) => (
            <div key={event.id} className="flex flex-col gap-2">
              <EventCard event={event} />
            </div>
          ))}
      </div>
    </div>
  )
}
