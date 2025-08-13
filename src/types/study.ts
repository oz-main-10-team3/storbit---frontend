export interface Study {
  level: string
  capacity: string
  time: string
  days: string[]
  waitingMode: boolean
  isSingleButton: boolean
  userId: number
  id: number
  title: string
  description: string
  imageUrl: string
  tags: string[]
  isLiked: boolean
  isApplied: boolean
  status: '검토중' | '매칭 완료' | '미승인' | '대기' | 'default'
  leaderName: string
  createdAt: string
  startDate: string
  endDate: string
  maxMember: number
  currentMember: number
  category: string
  isLeader: boolean
  meetingCycle: string
  platform: string
  startStatus?: boolean
  isLeft?: boolean
}
