// src/types/event.ts
export type EventStatus = '진행 상태' | '예정' | '진행중' | '종료' | string
export type EventType =
  | '이벤트 유형'
  | '리워드 이벤트'
  | '이자카야 이벤트'
  | '인기이자카야 이벤트'
  | '시즌 한정판'
  | string

export interface EventItem {
  id: number
  title: string
  type: EventType
  startDate: string
  endDate: string
  status: EventStatus
  thumbnailUrl: string
  images: string[] // 상세 이미지 최대 10장
}
