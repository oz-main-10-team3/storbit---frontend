import CommonButton from '@/common/CommonButton'
import CommonModal from '@/common/CommonModal'
import { useInboxMessageStore } from '@/store/useInboxMessageStore'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function MessageLayout() {
  const allRemoveInboxMessages = useInboxMessageStore(
    (state) => state.allRemoveInboxMessages
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const baseStyle = 'text-[#bdbdbd] '
  const activeStyle = 'text-text2' // 원하는 활성화 스타일
  return (
    <div className="flex flex-col gap-[24px] mt-[88px] ml-[160px]">
      <div className="flex justify-between items-center">
        <div className="flex gap-[12px] text-[20px]">
          <NavLink
            to="/mypage/messages/inbox"
            className={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          >
            받은쪽지
          </NavLink>
          <div>|</div>
          <NavLink
            to="/mypage/messages/sent"
            className={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          >
            보낸쪽지
          </NavLink>
          <div>|</div>
          <NavLink
            to="/mypage/messages/compose"
            className={({ isActive }) => (isActive ? activeStyle : baseStyle)}
          >
            쪽지보내기
          </NavLink>
        </div>
        <button
          className="text-[16px] text-[#bdbdbd] cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          전체 삭제
        </button>
      </div>
      <Outlet />
      <CommonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="받은 쪽지함을 모두 삭제하시겠습니까?"
        subtitle="확인 버튼 클릭 시 받은 쪽지함이 모두 삭제됩니다."
        className="w-[420px]"
      >
        <div className="flex gap-[4px]">
          <CommonButton
            variant="primary"
            onClick={() => {
              allRemoveInboxMessages()
              setIsModalOpen(false)
            }}
          >
            확인
          </CommonButton>
          <CommonButton
            variant="secondary"
            className="border-[1px] border-primary"
            onClick={() => setIsModalOpen(false)}
          >
            취소
          </CommonButton>
        </div>
      </CommonModal>
    </div>
  )
}
