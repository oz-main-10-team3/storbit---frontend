import InboxMessageList from '@/components/mypage/messageInboxPage/InboxMessageList'
import { useInboxMessageStore } from '@/store/useInboxMessageStore'

export default function MessageInboxPage() {
  const inboxMessages = useInboxMessageStore((state) => state.inboxMessages)
  return (
    <div className="flex flex-col gap-[12px] text-2xl">
      <InboxMessageList messages={inboxMessages} />
    </div>
  )
}
