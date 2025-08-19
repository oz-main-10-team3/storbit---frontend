import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { EventForm } from '@/components/event/EventForm'
import type { EventItem } from '@/types/event'
import { useDeleteEvent, useEvent, useUpdateEvent } from '@/hooks/useEvents'

// YYYY-MM-DD 또는 datetime-local -> ISO(UTC)
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

// UI(EventItem) -> 서버 본문
const buildUpdateBody = async (e: EventItem) => {
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

export function UpdateEventPage() {
  const { eventid, eventId } = useParams<{
    eventid?: string
    eventId?: string
  }>()
  const id = Number(eventid ?? eventId)
  const navigate = useNavigate()

  const { data: event, isLoading, error } = useEvent(id)
  const updateMutation = useUpdateEvent(id)
  const deleteMutation = useDeleteEvent(id)

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
    if (event) {
      setForm({
        title: event.title,
        type: event.type,
        startDate: event.startDate,
        endDate: event.endDate,
        status: event.status,
        thumbnailUrl: event.thumbnailUrl,
        images: event.images,
      })
    }
  }, [event])

  if (!Number.isFinite(id))
    return <div className="p-10 text-center">잘못된 이벤트 ID입니다.</div>
  if (isLoading) return <div className="p-10 text-center">불러오는 중...</div>
  if (error || !event)
    return (
      <div className="p-10 text-center text-red-500">
        이벤트를 불러오지 못했어요.
      </div>
    )

  const handleSubmit = async (updatedEvent: EventItem) => {
    try {
      const body = await buildUpdateBody(updatedEvent)
      await updateMutation.mutateAsync(body)
      navigate('/event')
    } catch {
      alert('이벤트 수정에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm('정말로 이 이벤트를 삭제하시겠습니까?')
    if (!confirmed) return
    try {
      await deleteMutation.mutateAsync()
      navigate('/event')
    } catch {
      alert('이벤트 삭제에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  return (
    <div className="flex justify-center w-full pt-[60px] pb-[120px]">
      <EventForm
        onSubmit={handleSubmit}
        formData={form}
        onChange={setForm}
        isUpdate
        onDelete={handleDelete}
        currentId={id}
      />
    </div>
  )
}