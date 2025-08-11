import defaultUserImg from '@/assets/images/default-profile.png'
import CommonButton from '@/common/CommonButton'
import InputField from '@/common/InputField'
import type { InboxMessage } from '@/types/message'
import { toCustomDate } from '@/utils/toCustomDate'
import { useState } from 'react'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'

export default function StudyRoomInboxMessage({
  message,
}: {
  message: InboxMessage
}) {
  const [isDetailMessageOpen, setIsDetailMessageOpen] = useState(false)
  return (
    <div className="mt-6 w-full">
      <div className="flex text-[16px] gap-[10px] text-text">
        <img
          src={defaultUserImg}
          alt="흩어지면뽂음밥 님의 유저 이미지"
          className="w-[48px] rounded-full"
        />
        <div className="flex flex-col gap-[4px] w-[344px]">
          <div className="flex justify-between">
            <div className="truncate">
              {message.type === 'personal'
                ? message.sender
                : `[${message.title}]`}
            </div>
            <div
              className="flex items-center justify-center gap-[5px] text-disabled-text cursor-pointer"
              onClick={() => setIsDetailMessageOpen((prev) => !prev)}
            >
              <div className="w-[100px]">{toCustomDate(message.sentAt)}</div>
              {isDetailMessageOpen ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </div>
          </div>
          <div className="text-[12px] truncate">{message.content}</div>
        </div>
      </div>
      {isDetailMessageOpen && (
        <div className="flex flex-col gap-[24px] w-[408px] h-[144px] bg-secondary rounded-[8px] mt-[24px] p-[16px]">
          <div className="text-text text-[16px]">{message.content}</div>
          <div className="flex h-[48px] gap-[8px]">
            <InputField className="bg-white h-[48px] w-[280px]" />
            <CommonButton>전송</CommonButton>
          </div>
        </div>
      )}
    </div>
  )
}
