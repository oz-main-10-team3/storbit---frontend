import CommonModal from '@/common/CommonModal'
import CommonButton from '@/common/CommonButton'
import type { RecruitStatusModalProps } from '@/types/RecruitApplicant.ts'

export default function RecruitStatusModal({
  isOpen,
  onClose,
  applicants,
  onReject,
  onAccept,
  onConfirm,
  onAcceptAll,
  onRejectAll,
}: RecruitStatusModalProps) {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      className="w-[564px] h-[85vh] rounded-[20px] opacity-100"
      title={'모집 현황'}
    >
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(98vh-240px)] px-1 pr-2">
        <div className="text-center mt-2">
          <p className="text-[40px] font-bold text-[#8E61FF] leading-tight mt-2">
            {applicants.length}명
          </p>
          <p className="text-sm text-gray-400 mt-1">
            스터디에 들어오고 싶은 예비 멤버들이에요!
          </p>
        </div>
        {applicants.map((applicant) => (
          <div key={applicant.id} className="flex flex-col gap-2 p-0 w-full">
            <div className="flex items-center gap-3">
              <div className="w-[48px] h-[48px] rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                {applicant.profileImageUrl ? (
                  <img
                    src={applicant.profileImageUrl}
                    alt={applicant.nickname}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-sm text-gray-400">👤</span>
                )}
              </div>
              <div className="flex flex-col text-sm w-full">
                <div className="flex items-center gap-2 w-full">
                  <p className="font-semibold">{applicant.nickname}</p>
                  <span className="text-[12px] px-2 py-[2px] rounded border border-[#8E61FF] bg-white text-[#8E61FF]">
                    {applicant.level}
                  </span>
                  {applicant.status === '신청 확인' ? (
                    <span className="text-[12px] px-2 py-[2px] rounded border border-red-500 bg-red-500 text-[#FFFFFF]">
                      신청확인
                    </span>
                  ) : (
                    <span className="text-[12px] px-2 py-[2px] rounded  border border-red-500 bg-red-500 text-[#FFFFFF]">
                      검토중
                    </span>
                  )}
                  <span className="ml-auto text-[11px] text-gray-400">
                    {applicant.createdAt}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[#F5F5F5] rounded-md px-3 py-2">
              <p className="text-xs w-[416px] h-[86px] text-gray-600">
                {applicant.description}
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-3">
              {applicant.status === '검토중' ? (
                <>
                  <CommonButton
                    variant="secondary"
                    className="text-sm px-4 py-1 w-[112px]"
                    onClick={() => {
                      onReject(applicant.id)
                    }}
                  >
                    거절
                  </CommonButton>
                  <CommonButton
                    variant="primary"
                    className="text-sm px-4 py-1 w-[112px]"
                    onClick={() => {
                      onAccept(applicant.id)
                    }}
                  >
                    멤버확정
                  </CommonButton>
                </>
              ) : (
                <>
                  <CommonButton
                    variant="secondary"
                    className="text-sm px-4 py-1 w-[112px]"
                    onClick={() => {
                      onReject(applicant.id)
                    }}
                  >
                    거절
                  </CommonButton>
                  <CommonButton
                    variant="primary"
                    className="text-sm px-4 py-1 w-[112px]"
                    onClick={() => {
                      onConfirm(applicant.id)
                    }}
                  >
                    확인
                  </CommonButton>
                </>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-8 gap-4">
          <CommonButton
            className="w-[416px]"
            onClick={() => {
              applicants.forEach((applicant) => {
                onReject(applicant.id)
              })
              onRejectAll()
            }}
            variant="secondary"
          >
            전체 거절
          </CommonButton>
          <CommonButton
            className="w-[416px] "
            onClick={() => {
              applicants.forEach((applicant) => {
                onAccept(applicant.id)
              })
              onAcceptAll()
            }}
            variant="primary"
          >
            전체 승낙
          </CommonButton>
        </div>
      </div>
    </CommonModal>
  )
}
