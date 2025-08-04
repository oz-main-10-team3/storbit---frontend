import SentboxMessageList from '@/components/mypage/messageSentboxPage/SentboxMessageList'
import { useSentboxMessageStore } from '@/store/useSentboxMessageStore'

export default function MessageSentPage() {
  const sentboxMessages = useSentboxMessageStore(
    (state) => state.sentboxMessages
  )
  return (
    <div className="flex flex-col gap-[12px] text-2xl">
      <SentboxMessageList messages={sentboxMessages} />
    </div>
  )
}
