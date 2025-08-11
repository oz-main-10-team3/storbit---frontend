import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventForm } from '@/components/event/EventForm'
import { eventMockData } from '@/data/eventMockData'
import type { EventItem } from '@/types/event'

export default function CreateEventPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState<Omit<EventItem, 'id'>>({
    title: '',
    type: '',
    startDate: '',
    endDate: '',
    status: '',
    thumbnailUrl: '',
    images: [],
  })

  const handleSubmit = (newEvent: EventItem) => {
    eventMockData.push({ ...newEvent, id: Date.now() }) // mock 처리
    navigate('/event') // 등록 후 이벤트 목록으로 이동
  }

  return (
    <div className="flex justify-center w-full pt-[60px] pb-[120px]">
      <EventForm
        onSubmit={handleSubmit}
        initialData={form}
        onChange={setForm}
      />
    </div>
  )
}
