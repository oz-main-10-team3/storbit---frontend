import CommonButton from '@/common/CommonButton'
import TransientModal from '@/common/TransientModal'
import { useSentboxMessageStore } from '@/store/useSentboxMessageStore'
import type { SentMessage } from '@/types/message'
import { useState } from 'react'

export default function SentboxMessageDetail({
  message,
  setIsMessageDeleteModal,
}: {
  message: SentMessage
  setIsMessageDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const deleteSentboxMessage = useSentboxMessageStore(
    (state) => state.deleteSentboxMessage
  )
  const [isResendModal, setIsResendModal] = useState(false)

  return (
    <div className="flex flex-col w-[664px] px-[60px] py-[40px] mt-[16px] h-[312px] border-[1px] border-primary rounded-[8px] text-[20px] cursor-pointer">
      <div className="text-[24px]"> 보낸 내용</div>
      <div className="text-text4 text-[15px] mt-[16px] flex-1">
        {message.content}
      </div>
      <div className="flex gap-[4px] justify-end">
        <CommonButton
          variant="secondary"
          className="border-[1px] border-primary"
          onClick={() => {
            setIsResendModal(true)
          }}
        >
          재전송
        </CommonButton>
        <CommonButton
          variant="primary"
          onClick={() => {
            deleteSentboxMessage(message.id)
            setIsMessageDeleteModal(true)
          }}
        >
          삭제
        </CommonButton>
      </div>
      <TransientModal
        isOpen={isResendModal}
        onClose={() => setIsResendModal(false)}
        type="messageResend"
        autoCloseDelay={3}
      />
    </div>
  )
}
