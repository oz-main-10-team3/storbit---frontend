export interface RecruitApplicant {
  id: number
  nickname: string
  level: string
  profileImageUrl: string
  description: string
  status: '신청 확인' | '검토중'
  createdAt: string // 날짜: "2025-08-04 15:23"
}
