import { create } from 'zustand'
import type { Message } from '@/types/message'
import { inboxMockData } from '@/mystudymockdata/InboxMessageData'

interface InboxMessageState {
  inboxMessages: Message[]
  deleteInboxMessage: (id: string) => void
  allRemoveInboxMessages: () => void
}

export const useInboxMessageStore = create<InboxMessageState>((set) => ({
  inboxMessages: inboxMockData,
  deleteInboxMessage: (id) =>
    set((state) => ({
      inboxMessages: state.inboxMessages.filter(
        (inboxMessage) => inboxMessage.id !== id
      ),
    })),
  allRemoveInboxMessages: () => set(() => ({ inboxMessages: [] })),
}))
