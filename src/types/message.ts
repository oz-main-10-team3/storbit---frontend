export type Message =
  | {
      id: string
      type: 'personal'
      sender: string
      senderImage: string
      content: string
      sentAt: string
    }
  | {
      id: string
      type: 'notice'
      titlePrefix: string
      title: string
      content: string
      sentAt: string
    }

export type CurrentMessagePageType = 'inbox' | 'sent' | 'compose' | null
