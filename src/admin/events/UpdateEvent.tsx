import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { eventMockData } from '@/data/eventMockData'
import type { EventItem } from '@/types/event'
import { EventForm } from '@/components/event/EventForm'

export default function UpdateEventPage() {
  const { eventid } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState<EventItem | null>(null)
  const [form, setForm] = useState<Omit<EventItem, 'id'>>({
    title: '',
    type: '' as EventItem['type'],
    startDate: '',
    endDate: '',
    status: '' as EventItem['status'],
    thumbnailUrl: '',
    images: [],
  })

  useEffect(() => {
    const foundEvent = eventMockData.find((e) => e.id === Number(eventid))
    if (foundEvent) {
      setEvent(foundEvent)
      setForm({
        title: foundEvent.title,
        type: foundEvent.type,
        startDate: foundEvent.startDate,
        endDate: foundEvent.endDate,
        status: foundEvent.status,
        thumbnailUrl: foundEvent.thumbnailUrl,
        images: foundEvent.images,
      })
    }
  }, [eventid])

  if (!event) return <div className="p-10">이벤트를 찾을 수 없습니다.</div>

  const handleSubmit = (updatedEvent: EventItem) => {
    const index = eventMockData.findIndex((e) => e.id === event.id)
    if (index !== -1) {
      eventMockData[index] = { ...updatedEvent, id: event.id }
      navigate('/event')
    }
  }

  const handleDelete = () => {
    const confirmed = window.confirm('정말로 이 이벤트를 삭제하시겠습니까?\n')
    if (confirmed) {
      const index = eventMockData.findIndex((e) => e.id === event.id)
      if (index !== -1) {
        eventMockData.splice(index, 1)
        navigate('/event')
      }
    }
  }
  return (
    <div className="flex justify-center w-full pt-[60px] pb-[120px]">
      <EventForm
        onSubmit={handleSubmit}
        initialData={form}
        onChange={setForm}
        isUpdate
        onDelete={handleDelete}
      />
    </div>
  )
}
