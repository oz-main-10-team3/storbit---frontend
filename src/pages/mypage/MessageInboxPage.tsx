import MessageList from '@/components/mypage/messageInboxPage/MessageList'
import { useInboxMessageStore } from '@/store/useInboxMessageStore'

export default function MessageInboxPage() {
  const inboxMessages = useInboxMessageStore((state) => state.inboxMessages)
  return (
    <div className="flex flex-col gap-[12px] text-2xl">
      <MessageList messages={inboxMessages} />
    </div>
  )
}
