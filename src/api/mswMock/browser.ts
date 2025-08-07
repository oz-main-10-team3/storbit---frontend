import { setupWorker } from 'msw/browser'
import { handlers } from '@/api/mswMock/handlers'

export const worker = setupWorker(...handlers)
