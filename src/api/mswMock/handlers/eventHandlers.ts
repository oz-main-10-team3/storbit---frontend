import { http, HttpResponse } from 'msw'
import { eventMockData } from '@/data/eventMockData'
import type { ApiEventDTO } from '@/api/eventapi'
import type { EventItem } from '@/types/event'

const toApiEventDTO = (event: EventItem): ApiEventDTO => ({
  id: event.id,
  title: event.title,
  event_image: event.thumbnailUrl,
  is_active: event.status === '진행중' || event.status === '예정',
  start_date: new Date(event.startDate).toISOString(),
  end_date: new Date(event.endDate).toISOString(),
});

export const eventHandlers = [
  http.get('/api/events/', () => {
    return HttpResponse.json(eventMockData.map(toApiEventDTO))
  }),
]
