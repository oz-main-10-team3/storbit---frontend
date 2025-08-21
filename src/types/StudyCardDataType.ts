//mockData 타입
export interface StudyCardDataType {
  id: number
  userProfile: string | null
  nickname: string
  dailyMissions: string[]
  isMe: boolean
  isLeader: boolean
}

// 실제 서버 API 용 타입 (작성자 : yh)
export type StudyCardData = {
  id: number
  title: string
  description: string
  thumbnail_url: string | null
  type: string
  max_wait_member: number
  level: string
  gender: 'male' | 'female' | 'all'
  category: number // 1 , 2, 3
  category_name: string
  schedule: string
  start_time: Date | string
  member: number
  leader_name: string
  accepted_count: number
  is_live: boolean
  member_count: number
  status: string
}

export interface StudyRoomsResponse {
  count: number
  next: string | null
  previous: string | null
  results: StudyCardData[]
}
