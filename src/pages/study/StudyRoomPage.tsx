// import { useParams } from 'react-router-dom'
import userProfile from '@/assets/images/default-profile.png'
import StudyRoomUserCard from '@/components/study/studyRoomPage/StudyRoomUserCard'
import { studyRoomUserCardMockData } from '@/mystudymockdata/studyRoomMockData'
import { CiMail } from 'react-icons/ci'
import { IoIosLogOut } from 'react-icons/io'

export default function StudyRoomPage() {
  return (
    <div>
      <div className="flex text-[32px] h-[136px] w-full items-center justify-between px-[72px] border-b-[1px] border-b-[#e6e6e6]">
        <div>알고리즘 마스터 스터디</div>
        <div className="flex gap-[16px] items-center">
          <img
            src={userProfile}
            alt="유저프로피이미지"
            className="rounded-full w-[64px]"
          />
          <div className="flex gap-[8px] items-center">
            <div className="text-[18px] text-text1">흩어지면볶음밥</div>
            <CiMail size={20} className="text-[#bdbdbd] cursor-pointer" />
            <IoIosLogOut size={20} className="text-[#bdbdbd] cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="relative ">
        <div
          className="absolute left-0 top-0 w-full h-[944px] z-0"
          style={{
            backgroundImage: 'radial-gradient(#ccc 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>
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
          {studyRoomUserCardMockData.map((user) => (
            <StudyRoomUserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}
