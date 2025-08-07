export interface RecruitApplicant {
  id: number
  nickname: string
  profileImageUrl?: string
  level: string
  status: string
  createdAt: string
  description: string
}

export interface RecruitStatusModalProps {
  isOpen: boolean
  onClose: () => void
  applicants: RecruitApplicant[]
  onReject: (id: number) => void
  onAccept: (id: number) => void
  onConfirm: (id: number) => void
  onAcceptAll: () => void
  onRejectAll: () => void
}
