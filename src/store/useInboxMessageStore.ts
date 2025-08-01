import { create } from 'zustand'
import type { Message } from '@/types/message'
import { inboxMockData } from '@/mystudymockdata/InboxMessageData'

interface InboxMessageState {
  inboxMessages: Message[]
  allRemoveInboxMessages: () => void
}

export const useInboxMessageStore = create<InboxMessageState>((set) => ({
  inboxMessages: inboxMockData,
  allRemoveInboxMessages: () => set(() => ({ inboxMessages: [] })),
}))
