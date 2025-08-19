import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toUiEvent } from '@/api/eventMapping'
import {
  createEvent,
  deleteEvent,
  type EventBody,
  getEventDetail,
  getEvents,
  updateEvent,
} from '@/api/eventapi.ts'

export const useEvents = () =>
  useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await getEvents()
      if (Array.isArray(response)) {
        return response.map((d) => toUiEvent(d))
      } else {
        // console.error('API response is not an array:', response)
        return [] // Return empty array to prevent crash
      }
    },
  })

export const useEvent = (id: number) =>
  useQuery({
    queryKey: ['event', id],
    queryFn: async () => toUiEvent(await getEventDetail(id)),
    enabled: Number.isFinite(id),
  })

export const useCreateEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: EventBody) => createEvent(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
}
export const useUpdateEvent = (id: number) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: EventBody) => updateEvent(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['events'] })
      qc.invalidateQueries({ queryKey: ['event', id] })
    },
  })
}
export const useDeleteEvent = (id: number) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => deleteEvent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  })
}
