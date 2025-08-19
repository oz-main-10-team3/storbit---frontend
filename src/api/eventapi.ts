import { api } from '@/api/mainApi'

// 백엔드 DTO
export interface ApiEventDTO {
  id: number
  title: string
  event_image: string | null
  is_active: boolean
  start_date: string
  end_date: string
}

export interface EventBody {
  title: string
  event_image: string | File | null
  is_active: boolean
  start_date: string // ISO(예: 2025-08-19T04:52:23.235Z)
  end_date: string // ISO
}

// File이면 multipart로 전송
function toFormData(b: EventBody): FormData {
  const fd = new FormData()
  fd.append('title', b.title)
  if (b.event_image instanceof File) fd.append('event_image', b.event_image)
  else if (typeof b.event_image === 'string')
    fd.append('event_image', b.event_image)
  fd.append('is_active', String(b.is_active))
  fd.append('start_date', b.start_date)
  fd.append('end_date', b.end_date)
  return fd
}
const pickBody = (b: EventBody) =>
  b.event_image instanceof File ? toFormData(b) : b

// 공개 API
export const getEvents = async () => {
  const { data } = await api.get<ApiEventDTO[]>('/api/v1/events/')
  return data
}
export const getEventDetail = async (id: number) => {
  const { data } = await api.get<ApiEventDTO>(`/api/v1/events/${id}/`)
  return data
}

// 관리자 API
export const createEvent = async (body: EventBody) => {
  // console.log('Sending createEvent body:', body)
  const { data } = await api.post<ApiEventDTO>(
    '/api/v1/admin/events/',
    pickBody(body)
  )
  // console.log('Received createEvent response:', data)
  return data
}
export const updateEvent = async (id: number, body: EventBody) => {
  // console.log('Sending updateEvent body:', body)
  const { data } = await api.put<ApiEventDTO>(
    `/api/v1/admin/events/${id}/`,
    pickBody(body)
  )
  // console.log('Received updateEvent response:', data)
  return data
}
export const deleteEvent = async (id: number) => {
  await api.delete(`/api/v1/admin/events/${id}/delete/`)
}
