import { setupWorker } from 'msw/browser'
import { authHandlers } from '@/api/mswMock/handlers/authHandlers'
import { myStudiesHandlers } from '@/api/mswMock/handlers/myStudiesHandlers'
import { studyMakeHandlers } from '@/api/mswMock/handlers/studyMakeHandlers'

export const worker = setupWorker(
  ...authHandlers,
  ...myStudiesHandlers,
  ...studyMakeHandlers
)
