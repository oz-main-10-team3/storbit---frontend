import { AiOutlineCheckCircle } from 'react-icons/ai'
import { IoSettingsOutline } from 'react-icons/io5'
import { PiCrownSimpleFill } from 'react-icons/pi'
import type { StudyCardData } from '@/mystudymockdata/studyRoomMockData'
import { cn } from '@/utils/cn'

export default function StudyRoomUserCard({
  user,
  setMessageSender,
  setIsMessageSendModal,
}: {
  user: StudyCardData
  setMessageSender: React.Dispatch<React.SetStateAction<string | null>>
  setIsMessageSendModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { userProfile, nickname, dailyMissions, isMe, isLeader } = user
  const handleSendMessageModalOpen = () => {
    setMessageSender(nickname)
    setIsMessageSendModal(true)
  }
  return (
    <div
      className={cn(
        'flex flex-col gap-[16px] w-[272px] h-[150px] min-h-[150px] rounded-[10px] border-[1px] bg-white p-[16px] text-[12px] text-text2',
        isMe ? 'border-alertText' : 'border-[#bdbdbd]'
      )}
    >
      <div className="flex gap-[16px]">
        <img
          src={userProfile}
          alt="스터티개인프로필이미지"
          className="h-[41px] rounded-full"
        />
        <div className="flex flex-col gap-[2px] w-full">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-[8px]">
              {isLeader && (
                <PiCrownSimpleFill size={15} className="text-primary" />
              )}
              <div className="text-[16px] font-semibold">{nickname}</div>
            </div>

            <IoSettingsOutline
              size={20}
              className="text-[#bdbdbd] cursor-pointer"
            />
          </div>
          <div className="flex gap-[8px] text-[#a2a2a2]">
            <button
              className="cursor-pointer"
              onClick={handleSendMessageModalOpen}
            >
              쪽지보내기
            </button>
            <button className="cursor-pointer">프로필 보기</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[2px]">
        <div className="text-[16px] font-semibold">데일리미션</div>
        <div className="flex flex-col gap-[1px]">
          {dailyMissions.map((mission, index) => (
            <div
              key={`${mission}-${index}`}
              className="flex items-center gap-[8px]"
            >
              <AiOutlineCheckCircle size={12} />
              <div>{mission}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
