export interface Study {
  id: number
  title: string
  description: string
  imageUrl: string
  tags: string[]
  isLiked: boolean
  isApplied: boolean
  status: '검토중' | '매칭 완료' | '미승인' | '대기' | 'default'
}
