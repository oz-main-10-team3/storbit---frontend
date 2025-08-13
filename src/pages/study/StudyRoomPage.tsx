import Whiteboard from '@/components/study/studyRoomPage/KonvaWhiteBoard'
import StudyRoomUserCard from '@/components/study/studyRoomPage/StudyRoomUserCard'
import { studyRoomUserCardMockData } from '@/mystudymockdata/studyRoomMockData'
import { useEffect, useRef, useState } from 'react'
import { useUserInfo } from '@/store/userInfoStore'
import { CiMail } from 'react-icons/ci'
import { IoIosLogOut, IoMdMore } from 'react-icons/io'
import CommonModal from '@/common/CommonModal'
import Dropdown from '@/common/DropDown'
import CommonButton from '@/common/CommonButton'
import MissionModal from '@/common/MissionModal'
import { useParams } from 'react-router-dom'
import defaultUserImg from '@/assets/images/default-profile.png'
import StudyRoomMessageInboxModal from '@/components/study/studyRoomPage/StudyRoomMessageInboxModal'
import StudyRoomSendMessageModal from '@/components/study/studyRoomPage/StudyRoomSendMessageModal'
import StudyRoomUserProfileModal from '@/components/study/studyRoomPage/StudyRoomUserProfileModal'
import type { StudyCardDataType } from '@/types/StudyCardDataType'

const reportModalDropdownOption = [
  { label: '부적절한 스터디 내용', value: '1' },
  { label: '스터디장의 비매너 행동', value: '2' },
  { label: '금전 관련 문제', value: '3' },
  { label: '욕설 및 비방', value: '4' },
  { label: '스팸 및 도배', value: '5' },
  { label: '개인정보 오남용', value: '6' },
  { label: '기타(직접 작성)', value: '7' },
]

export default function StudyRoomPage() {
  const [isOpenTitleMenuModal, setIsOpenTitleMenuModal] = useState(false)
  const [isReprotModalOpen, setReportModalOpen] = useState(false)
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false)
  const [isMessageInboxModalOpen, setIsMessageInboxModalOpen] = useState(false)
  const [selectReportModalDropdownOption, setSelectReportModalDropdownOption] =
    useState('')
  const [isMessageSendModal, setIsMessageSendModal] = useState(false)
  const [messageSender, setMessageSender] = useState<string | null>(null)
  const { roomId } = useParams()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false)
  const [selectedUserProfile, setSelectedUserProfile] =
    useState<StudyCardDataType | null>(null)

  const user = useUserInfo((state) => state.userInfo?.user)

  useEffect(() => {
    if (roomId) {
      setIsDailyModalOpen(true)
    }
  }, [roomId])

  return (
    <div>
      <div className="flex text-[32px] h-[136px] w-full items-center justify-between px-[72px] border-b-[1px] border-b-[#e6e6e6]">
        <div className="flex items-center gap-[4px]">
          <div>알고리즘 마스터 스터디</div>
          <div className="relative">
            <IoMdMore
              size={25}
              onClick={() => setIsOpenTitleMenuModal((prev) => !prev)}
              className="cursor-pointer"
            />
            {isOpenTitleMenuModal && (
              <div className="flex justify-center items-center absolute top-[30px] w-[120px] h-[40px] bg-white rounded-md shadow-lg z-10">
                <div
                  className="text-base cursor-pointer"
                  onClick={() => {
                    setIsOpenTitleMenuModal(false)
                    setReportModalOpen(true)
                  }}
                >
                  스터디 신고하기
                </div>
              </div>
            )}
            <CommonModal
              title="스터디 신고"
              isOpen={isReprotModalOpen}
              onClose={() => setReportModalOpen(false)}
              className="w-[560px] h-[598px] p-[40px]"
            >
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center justify-center text-[16px] text-text4">
                  <div>불쾌하거나 부적절한 상황이 발생했다면 신고해주세요.</div>
                  <div>모든 신고는 비공개로 처리됩니다.</div>
                </div>
                <div className="flex flex-col self-start mt-[40px] text-[16px] text-text gap-[16px]">
                  <div className="flex">
                    <div>신고사유</div>
                    <div className="text-alertText">*</div>
                  </div>
                  <Dropdown
                    options={reportModalDropdownOption}
                    placeholder="선택해 주세요"
                    selected={selectReportModalDropdownOption}
                    onChange={setSelectReportModalDropdownOption}
                    className="w-[276px]"
                  />
                </div>
                <div className="flex flex-col self-start mt-[40px] text-[16px] text-text gap-[16px]">
                  <div className="flex">
                    <div>상세설명</div>
                    <div className="text-alertText ">*</div>
                  </div>
                  <textarea
                    className="w-[480px] h-[104px] border border-[#bdbdbd] rounded-[4px] bg-white resize-none overflow-hidden px-[16px] py-[10px] placeholder:text-[14px] placeholder:text-[#bdbdbd]"
                    placeholder="이유를 작성해주세요"
                  />
                </div>
                <CommonButton
                  className="mt-[40px]"
                  onClick={() => setReportModalOpen(false)}
                >
                  신고하기
                </CommonButton>
              </div>
            </CommonModal>
            {isDailyModalOpen && (
              <MissionModal
                isOpen={isDailyModalOpen}
                onClose={() => setIsDailyModalOpen(false)}
                title="데일리 미션"
                subtitle={
                  <p className="whitespace-pre-line text-sm text-text4 text-center">
                    내가 오늘 꼭 달성하고 싶은 목표를 설정해주세요!
                    {'\n'}최대 5개까지 설정할 수 있습니다.
                  </p>
                }
              />
            )}
            <StudyRoomMessageInboxModal
              isOpen={isMessageInboxModalOpen}
              onClose={() => setIsMessageInboxModalOpen(false)}
              title="쪽지함"
              className="p-[30px] w-[488px] max-h-[712px] justify-start"
            />
            <StudyRoomSendMessageModal
              isOpen={isMessageSendModal}
              onClose={() => setIsMessageSendModal(false)}
              title="쪽지 보내기"
              messageSender={messageSender ?? ''}
              className="w-[560px] p-[40px]"
            />
          </div>
        </div>
        <div className="flex gap-[16px] items-center">
          <img
            src={user?.profile_image_url ?? defaultUserImg}
            alt="유저프로피이미지"
            className="rounded-full w-[64px]"
          />
          <div className="flex gap-[8px] items-center">
            <div className="text-[18px] text-text1">{user?.nickname}</div>
            <CiMail
              size={20}
              className="text-[#bdbdbd] cursor-pointer"
              onClick={() => setIsMessageInboxModalOpen((prev) => !prev)}
            />
            <IoIosLogOut size={20} className="text-[#bdbdbd] cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="relative ">
        <div
          ref={containerRef}
          className="absolute left-0 top-0 w-full h-[944px] z-0"
          style={{
            backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          <Whiteboard containerRef={containerRef} />
        </div>
        <div className="flex flex-col gap-[24px] absolute right-[72px] top-[40px] z-10 overflow-scroll h-[850px] scrollbar-hide">
          <div className="flex flex-col gap-[16px] w-[272px] h-[150px] rounded-[10px] border-[1px] bg-white border-primary p-[16px] text-[12px] text-text2">
            <div className="flex flex-col gap-[2px]">
              <div className="text-[16px] font-semibold">최종목표</div>
              <div>우리 스터디 그룹의 목표는 우주정복 입니다.</div>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="text-[16px] font-semibold">공통미션</div>
              <div className="flex flex-col gap-[1px]">
                <div>오늘은 목성부터 정복 할겁니다.</div>
                <div>오늘은 목성부터 정복 할겁니다.</div>
              </div>
            </div>
          </div>
          {studyRoomUserCardMockData.map((user, index) => (
            <StudyRoomUserCard
              key={`${user.nickname}-${index}`}
              user={user}
              setMessageSender={setMessageSender}
              setIsMessageSendModal={setIsMessageSendModal}
              setIsUserProfileModalOpen={setIsUserProfileModalOpen}
              setSelectedUserProfile={setSelectedUserProfile}
            />
          ))}
        </div>
      </div>
      <StudyRoomUserProfileModal
        title="프로필 보기"
        isOpen={isUserProfileModalOpen}
        onClose={() => setIsUserProfileModalOpen(false)}
        selectedUserProfile={selectedUserProfile}
        className="w-[400px] h-[544px] p-[44px]"
      />
    </div>
  )
}
