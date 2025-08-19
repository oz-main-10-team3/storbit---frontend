import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EventForm } from '@/components/event/EventForm'
import type { EventItem } from '@/types/event'
import { createEvent } from '@/api/eventapi.ts'

// date input (YYYY-MM-DD) → ISO(UTC) 변환
const toISO = (v: string) =>
  v && v.includes('T') ? v : new Date(v).toISOString()

const blobToBase64 = async (blobUrl: string): Promise<string> => {
  const response = await fetch(blobUrl)
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// UI 모델(EventItem) → 서버 본문으로 매핑
const buildCreateBody = async (e: EventItem) => {
  let event_image_base64 = ''
  if (e.thumbnailUrl?.startsWith('blob:')) {
    event_image_base64 = await blobToBase64(e.thumbnailUrl)
  } else {
    event_image_base64 = e.thumbnailUrl || e.images[0] || ''
  }

  return {
    title: e.title,
    event_image: event_image_base64,
    is_active: e.status !== '종료',
    start_date: toISO(e.startDate),
    end_date: toISO(e.endDate),
  }
}

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

  const handleSubmit = async (newEvent: EventItem) => {
    try {
      const body = await buildCreateBody(newEvent)
      await createEvent(body)
      navigate('/event') // 등록 후 이벤트 목록으로 이동
    } catch (e) {
      alert('이벤트 생성에 실패했습니다. 다시 시도해 주세요.')
      // console.error(e)
    }
  }

  return (
    <div className="flex justify-center w-full pt-[60px] pb-[120px]">
      <EventForm
        onSubmit={handleSubmit}
        formData={form}
        onChange={setForm}
      />
    </div>
  )
}