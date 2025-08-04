import CommonButton from '@/common/CommonButton'
import CommonModal from '@/common/CommonModal'
import { useInboxMessageStore } from '@/store/useInboxMessageStore'
import { useSentboxMessageStore } from '@/store/useSentboxMessageStore'
import type { CurrentMessagePageType } from '@/types/message'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import TransientModal from '@/common/TransientModal'

export default function MessageLayout() {
  const allRemoveInboxMessages = useInboxMessageStore(
    (state) => state.allRemoveInboxMessages
  )

  const AllRemoveSentboxMessages = useSentboxMessageStore(
    (state) => state.allRemoveSentboxMessages
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTransientModalOpen, setIsTransientModalOpen] = useState(false)
  const [shouldOpenTransientModal, setShouldOpenTransientModal] =
    useState(false)

  const baseStyle = 'text-[#bdbdbd] '
  const activeStyle = 'text-text2' // 활성화 스타일

  const location = useLocation()

  const getCurrentMessagePageType = (
    pathname: string
  ): CurrentMessagePageType => {
    if (pathname === '/mypage/messages/inbox') return 'inbox'
    if (pathname === '/mypage/messages/sent') return 'sent'
    if (pathname === '/mypage/messages/compose') return 'compose'
    return null
  }
  const currentPageState = getCurrentMessagePageType(location.pathname)

  const handleDeleteAll = () => {
    if (currentPageState === 'inbox') {
      allRemoveInboxMessages()
      return true
    } else if (currentPageState === 'sent') {
      AllRemoveSentboxMessages()
      return true
    } else if (currentPageState === 'compose') {
      return false
    } else {
      return false
    }
    setIsModalOpen(false)
  }

  const handleClick = () => {
    const isAllMessageDelete = handleDeleteAll()
    if (isAllMessageDelete) {
      setShouldOpenTransientModal(true) // 다음 모달을 열어야 할 조건을 먼저 기록
    }
    setIsModalOpen(false) // 현재 모달 닫기
  }

  // isModalOpen 상태가 false가 된 이후에 transientModal을 열기
  useEffect(() => {
    if (!isModalOpen && shouldOpenTransientModal) {
      setIsTransientModalOpen(true)
      setShouldOpenTransientModal(false) // 조건 플래그 초기화
    }
  }, [isModalOpen, shouldOpenTransientModal])

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
        {!(currentPageState === 'compose') && (
          <button
            className="text-[16px] text-[#bdbdbd] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            전체 삭제
          </button>
        )}
      </div>
      <Outlet />
      <CommonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        Icon={<AiOutlineExclamationCircle size={72} className="text-primary" />}
        title={`${currentPageState === 'inbox' ? '받은' : currentPageState === 'sent' ? '보낸' : ''} 쪽지함 모두 삭제`}
        className="w-[384px] h-[384px]"
      >
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col items-center justify-center text-[16px] text-text2">
            <div> 정말 모든 쪽지를 지우시겠어요?</div>
            <div> 한 번 지우면 되돌릴 수 없어요!</div>
          </div>
          <div className="flex gap-[4px]">
            <CommonButton variant="primary" onClick={handleClick}>
              전체삭제
            </CommonButton>
            <CommonButton
              variant="secondary"
              className="border-[1px] border-primary"
              onClick={() => setIsModalOpen(false)}
            >
              취소
            </CommonButton>
          </div>
        </div>
      </CommonModal>
      <TransientModal
        isOpen={isTransientModalOpen}
        type="messageDelete"
        onClose={() => setIsTransientModalOpen(false)}
        autoCloseDelay={3}
      />
    </div>
  )
}
