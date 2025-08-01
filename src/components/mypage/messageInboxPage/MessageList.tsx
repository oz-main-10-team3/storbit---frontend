import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import type { Message } from '@/types/message'
import { useState } from 'react'
import { cn } from '@/utils/cn'
import MessageDetail from '@/components/mypage/messageInboxPage/MessageDetail'

export default function MessageList({ messages }: { messages: Message[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [openSelectMessage, setOpenSelectMessage] = useState<string | null>(
    null
  )
  const itemsPerPage = 10

  const totalPages = Math.ceil(messages.length / itemsPerPage)
  const paginatedMessages = [...messages]
    .slice()
    .reverse()
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="flex flex-col gap-[50px] pb-[20px]">
      <div>
        {paginatedMessages.map((message) => (
          <div key={message.id} className="pt-[16px]">
            <button
              className="flex w-[664px] p-[24px] gap-[16px] items-center h-[72px] border-[1px] border-primary rounded-[8px] text-[20px] cursor-pointer"
              onClick={() => {
                if (openSelectMessage !== message.id) {
                  setOpenSelectMessage(message.id)
                } else if (openSelectMessage) {
                  setOpenSelectMessage(null)
                } else {
                  setOpenSelectMessage(message.id)
                }
              }}
            >
              {message.type === 'personal' ? (
                <>
                  <div className="min-w-[160px] text-left text-text1 font-semibold">
                    {message.sender}
                  </div>
                  <div className="text-text2 w-[423px] font-light truncate text-left">
                    {message.content}
                  </div>
                </>
              ) : (
                <>
                  <div className="min-w-[160px] text-left text-text1 font-semibold">
                    [{message.titlePrefix}]
                  </div>
                  <div className="text-text2 w-[423px] font-light truncate text-left">
                    {message.content}
                  </div>
                </>
              )}
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
              <MessageDetail message={message} />
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
    </div>
  )
}
