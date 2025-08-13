import CommonModal from '@/common/CommonModal'
import CommonButton from '@/common/CommonButton'

interface Member {
  id: number
  nickname: string
  attendanceRate: number
}

interface MemberStatusModalProps {
  isOpen: boolean
  onClose: () => void
  members: Member[]
}

export default function MemberStatusModal({
  isOpen,
  onClose,
  members,
}: MemberStatusModalProps) {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="멤버 현황"
      className="w-[564px] h-[85vh] rounded-[20px] opacity-100"
    >
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(98vh-240px)] px-1 pr-2">
        <div className="text-center mt-2">
          <p className="text-[40px] font-bold text-[#8E61FF] leading-tight mt-2">
            {members.length}명
          </p>
          <p className="text-sm text-gray-400 mt-1">현재 스터디 멤버입니다.</p>
        </div>
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-2 border-b">
            <div className="w-[48px] h-[48px] rounded-full bg-gray-200"></div>
            <div className="flex flex-col text-sm">
              <p className="font-semibold">{member.nickname}</p>
              <p className="text-xs text-gray-500">
                출석률: {member.attendanceRate}%
              </p>
            </div>
            <div className="ml-auto flex gap-2">
              <CommonButton variant="secondary" className="text-sm px-3 py-1">
                멤버 확인
              </CommonButton>
              <CommonButton variant="primary" className="text-sm px-3 py-1">
                멤버 확정
              </CommonButton>
            </div>
          </div>
        ))}
      </div>
    </CommonModal>
  )
}
