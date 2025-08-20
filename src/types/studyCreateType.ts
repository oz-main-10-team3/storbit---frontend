export interface StudyCreateType {
  title: string
  description: string
  thumbnailUrl: string
  type: string
  maxWaitMember: number
  level: string
  gender: string
  category: number
  schedule: string[]
  startTime: string
  member: number
  leaderEmail: number
}

export interface study {
  id: number
  studyName: string
  studyIntroduction: string
  image: object
  studyType: string
  studyCategory: string
  capacity: string
  isUnlimited: string
  dayOfWeek: string[]
  studyTime: string
  gender: '남' | '여' | '무관'
  createdAt: string
}
