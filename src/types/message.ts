export type InboxMessage =
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

export interface SentMessage {
  id: string
  nickname: string
  receiver: string
  content: string
  sentAt: string // 'YYYY-MM-DD HH:mm' 형식의 문자열
}
