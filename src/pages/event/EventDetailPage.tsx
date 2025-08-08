import { useParams } from 'react-router-dom'
import { eventMockData } from '@/data/eventMockData.ts'

export default function EventDetailPage() {
  const { eventid } = useParams()
  const event = eventMockData.find((e) => e.id === Number(eventid))

  if (!event) return <div>이벤트를 찾을 수 없습니다.</div>

  return (
    <div className="p-10">
      {event.status === '진행중' &&
        event.images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-[780px] object-cover mx-auto"
            alt={`이벤트 이미지 ${i + 1}`}
          />
        ))}
    </div>
  )
}
