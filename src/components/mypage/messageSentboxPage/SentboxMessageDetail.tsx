import CommonButton from '@/common/CommonButton'
import { useSentboxMessageStore } from '@/store/useSentboxMessageStore'
import type { SentMessage } from '@/types/message'

export default function SentboxMessageDetail({
  message,
}: {
  message: SentMessage
}) {
  const deleteSentboxMessage = useSentboxMessageStore(
    (state) => state.deleteSentboxMessage
  )
  return (
    <div className="flex flex-col w-[664px] px-[60px] py-[40px] p-[24px] mt-[16px] h-[312px] border-[1px] border-primary rounded-[8px] text-[20px] cursor-pointer">
      <div className="text-[24px]"> 보낸 내용</div>
      <div className="text-text4 text-[15px] mt-[16px] flex-1">
        {message.content}
      </div>
      <div className="flex gap-[4px] justify-end">
        <CommonButton
          variant="secondary"
          className="border-[1px] border-primary"
          onClick={() => {}}
        >
          재전송
        </CommonButton>
        <CommonButton
          variant="primary"
          onClick={() => deleteSentboxMessage(message.id)}
        >
          삭제
        </CommonButton>
      </div>
    </div>
  )
}
