import rawData from '@/data/recruitStatusMock.json' assert { type: 'json' }
import type { RecruitApplicant } from '@/types/Applicant'

const isValidStatus = (
  status: string
): status is RecruitApplicant['status'] => {
  return status === '신청 확인' || status === '검토중'
}

export const recruitApplicants: RecruitApplicant[] = rawData
  .filter((item): item is RecruitApplicant => isValidStatus(item.status))
  .map((item) => ({
    ...item,
    status: item.status as RecruitApplicant['status'],
  }))
