import MessageList from '@/components/mypage/messageInboxPage/MessageList'
import { inboxMockData } from '@/mystudymockdata/InboxMessageData'

export default function MessageInboxPage() {
  return (
    <div className="flex flex-col gap-[12px] text-2xl">
      <MessageList messages={inboxMockData} />
    </div>
  )
}
