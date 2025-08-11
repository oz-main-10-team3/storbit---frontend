// src/mock/eventMockData.ts
// src/mock/eventMockData.ts
import type { EventItem } from '@/types/event'

export const eventMockData: EventItem[] = [
  {
    id: 1,
    title: '가입 3초 만에 받는 웰컴 선물!',
    type: '리워드 이벤트',
    startDate: '2025-08-01',
    endDate: '2025-08-31',
    status: '진행중',
    thumbnailUrl: '/assets/event/thumb.png',
    images: ['/assets/event/detail1.png', '/assets/event/detail2.png'],
  },
  {
    id: 2,
    title: '가입 3초 만에 받는 웰컴 선물!',
    type: '리워드 이벤트',
    startDate: '2025-08-01',
    endDate: '2025-08-31',
    status: '진행중',
    thumbnailUrl: '/assets/event/thumb.png',
    images: ['/assets/event/detail1.png', '/assets/event/detail2.png'],
  },
]
