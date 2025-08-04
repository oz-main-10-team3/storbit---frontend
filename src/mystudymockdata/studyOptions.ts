// study 드롭다운 옵션 데이터
type StudyOption = {
  id: string
  label: string
  value: string
}

export const studyOptions: StudyOption[] = [
  { id: '1', label: '프론트엔드 스터디', value: 'frontend' },
  { id: '2', label: '백엔드 스터디', value: 'backend' },
  { id: '3', label: '알고리즘 스터디', value: 'algorithm' },
  { id: '4', label: 'CS 전공 공부', value: 'cs' },
  { id: '5', label: '리액트 프로젝트', value: 'react-project' },
  { id: '6', label: '면접 준비', value: 'interview' },
  { id: '7', label: '포트폴리오 작성', value: 'portfolio' },
  { id: '8', label: 'Next.js 학습', value: 'nextjs' },
  { id: '9', label: '기술 블로그 작성', value: 'tech-blog' },
  { id: '10', label: '스터디 모집 중', value: 'recruiting' },
]
