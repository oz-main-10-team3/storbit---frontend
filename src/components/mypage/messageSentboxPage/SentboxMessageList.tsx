import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import type { SentMessage } from '@/types/message'
import { useState } from 'react'
import { cn } from '@/utils/cn'
import SentboxMessageDetail from '@/components/mypage/messageSentboxPage/SentboxMessageDetail'
import TransientModal from '@/common/TransientModal'

export default function SentboxMessageList({
  messages,
}: {
  messages: SentMessage[]
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [openSelectMessage, setOpenSelectMessage] = useState<string | null>(
    null
  )
  const [isMessageDeleteModal, setIsMessageDeleteModal] = useState(false)

  const itemsPerPage = 10

  const totalPages = Math.ceil(messages.length / itemsPerPage)
  const paginatedMessages = [...messages]
    .reverse()
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="flex flex-col gap-[50px] pb-[20px]">
      <div>
        {paginatedMessages.map((message) => (
          <div key={message.id} className="pt-[16px]">
            <button
              className="flex w-[664px] p-[24px] gap-[16px] items-center h-[72px] border-[1px] border-primary rounded-[8px] text-[20px] cursor-pointer"
              onClick={() =>
                setOpenSelectMessage(
                  openSelectMessage !== message.id ? message.id : null
                )
              }
            >
              <div className="min-w-[160px] text-left text-text1 font-semibold">
                {message.receiver}
              </div>
              <div className="text-text2 w-[423px] font-light truncate text-left">
                {message.content}
              </div>

              {message.id === openSelectMessage ? (
                <MdKeyboardArrowDown
                  size={40}
                  className="text-disabled-text ml-auto"
                />
              ) : (
                <MdKeyboardArrowUp
                  size={40}
                  className="text-disabled-text ml-auto"
                />
              )}
            </button>
            {message.id === openSelectMessage && (
              <SentboxMessageDetail
                message={message}
                setIsMessageDeleteModal={setIsMessageDeleteModal}
              />
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-[16px]">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={cn(
              'text-[20px] text-disabled-text cursor-pointer',
              currentPage === i + 1 ? 'text-primary ' : ''
            )}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <TransientModal
        isOpen={isMessageDeleteModal}
        onClose={() => setIsMessageDeleteModal(false)}
        type="messageDelete"
        autoCloseDelay={3}
      />
    </div>
  )
}
