export type Message =
  | {
      type: 'personal'
      sender: string
      senderImage: string
      content: string
      sentAt: string
    }
  | {
      type: 'notice'
      titlePrefix: string
      title: string
      content: string
      sentAt: string
    }

export type CurrentMessagePageType = 'inbox' | 'sent' | 'compose' | null
