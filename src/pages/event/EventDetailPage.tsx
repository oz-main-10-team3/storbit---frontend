import { useParams } from 'react-router-dom'
import { useEvent } from '@/hooks/useEvents'

export default function EventDetailPage() {
  const { eventid, eventId } = useParams<{
    eventid?: string
    eventId?: string
  }>()
  const id = Number(eventid ?? eventId)

  // ✅ Hooks must be called unconditionally
  const { data: event, isLoading, error } = useEvent(id)

  if (!Number.isFinite(id)) {
    return <div className="p-10 text-center">잘못된 이벤트 ID입니다.</div>
  }

  if (isLoading) return <div className="p-10 text-center">불러오는 중...</div>
  if (error || !event)
    return (
      <div className="p-10 text-center text-red-500">
        이벤트를 불러오지 못했어요.
      </div>
    )

  return (
    <div className="p-10">
      {event.status === '진행중' &&
        event.images.map((img, i) => (
          <img
            key={img || String(i)}
            src={img}
            className="w-[780px] object-cover mx-auto"
            alt={`이벤트 이미지 ${i + 1}`}
          />
        ))}
    </div>
  )
}
