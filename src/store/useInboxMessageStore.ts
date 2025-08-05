import { create } from 'zustand'
import type { InboxMessage } from '@/types/message'
import { inboxMockData } from '@/mystudymockdata/inboxMessageData'

interface InboxMessageState {
  inboxMessages: InboxMessage[]
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
