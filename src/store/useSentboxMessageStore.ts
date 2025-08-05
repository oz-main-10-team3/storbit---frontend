import { create } from 'zustand'
import type { SentMessage } from '@/types/message'
import { sentMessages } from '@/mystudymockdata/sentboxMessageData'

interface SentboxMessageState {
  sentboxMessages: SentMessage[]
  deleteSentboxMessage: (id: string) => void
  allRemoveSentboxMessages: () => void
}

export const useSentboxMessageStore = create<SentboxMessageState>((set) => ({
  sentboxMessages: sentMessages,
  deleteSentboxMessage: (id) =>
    set((state) => ({
      sentboxMessages: state.sentboxMessages.filter(
        (sentboxMessage) => sentboxMessage.id !== id
      ),
    })),
  allRemoveSentboxMessages: () => set(() => ({ sentboxMessages: [] })),
}))
