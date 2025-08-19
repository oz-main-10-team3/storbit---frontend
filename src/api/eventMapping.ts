import type { ApiEventDTO } from '@/api/eventapi.ts'

export type EventStatus = '예정' | '진행중' | '종료'
export type EventType =
  | '리워드 이벤트'
  | '이자카야 이벤트'
  | '인기이자카야 이벤트'
  | '시즌 한정판'

// 프로젝트의 EventItem과 동일
export interface UiEventItem {
  id: number
  title: string
  type: EventType
  startDate: string
  endDate: string
  status: EventStatus
  thumbnailUrl: string
  images: string[]
  isActive: boolean
}

const calcStatus = (
  nowISO: string,
  s: string,
  e: string,
  active: boolean
): EventStatus => {
  const now = Date.parse(nowISO)
  const st = Date.parse(s)
  const en = Date.parse(e)
  if (!active) return '종료'
  if (now < st) return '예정'
  if (now > en) return '종료'
  return '진행중'
}

export const toUiEvent = (
  d: ApiEventDTO,
  defaultType: EventType = '리워드 이벤트',
  nowISO = new Date().toISOString()
): UiEventItem => {
  const startDate = d?.start_date || ''
  const endDate = d?.end_date || ''
  const isActive = d?.is_active || false
  const eventImage = d?.event_image ?? ''

  return {
    id: d?.id || 0,
    title: d?.title || '',
    type: defaultType, // 백엔드에 없으니 기본값
    startDate,
    endDate,
    status: calcStatus(nowISO, startDate, endDate, isActive),
    thumbnailUrl: eventImage,
    images: eventImage ? [eventImage] : [],
    isActive,
  }
}
