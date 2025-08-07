import rawData from '@/data/recruitStatusMock.json' assert { type: 'json' }
import type { RecruitApplicant } from '@/types/Applicant'

const VALID_RECRUIT_STATUSES: RecruitApplicant['status'][] = [
  '신청 확인',
  '검토중',
]

const isValidStatus = (status: unknown): status is RecruitApplicant['status'] =>
  typeof status === 'string' &&
  VALID_RECRUIT_STATUSES.includes(status as RecruitApplicant['status'])

function isRecruitApplicant(item: unknown): item is RecruitApplicant {
  if (typeof item !== 'object' || item === null) return false
  const obj = item as Record<string, unknown>
  return (
    typeof obj.id === 'number' &&
    typeof obj.nickname === 'string' &&
    typeof obj.level === 'string' &&
    typeof obj.profileImageUrl === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.createdAt === 'string' &&
    isValidStatus(obj.status)
  )
}

// 🔥 스터디방 전체의 신청자를 한 배열로 합치기
const applicantsArray = Object.values(rawData)
  .flat() // 2차원 배열 → 1차원 배열로
  .filter(isRecruitApplicant)
  .map((item) => ({
    ...item,
    status: item.status as RecruitApplicant['status'],
  }))

export const recruitApplicants: RecruitApplicant[] = applicantsArray

export const recruitApplicantsByStudy: Record<string, RecruitApplicant[]> =
  Object.fromEntries(
    Object.entries(rawData).map(([studyId, arr]) => [
      studyId,
      (arr as unknown[]).filter(isRecruitApplicant).map((item) => ({
        ...item,
        status: item.status as RecruitApplicant['status'],
      })),
    ])
  )
