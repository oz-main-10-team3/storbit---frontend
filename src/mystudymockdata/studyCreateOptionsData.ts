export const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const period = i < 12 ? '오전' : '오후'
  const hour = i % 12 === 0 ? 12 : i % 12
  const time = `${period} ${hour}:00`
  return { value: time, label: time }
})

export const studyCategoryOptions = [
  { value: '온라인', label: '온라인' },
  { value: '오프라인', label: '오프라인' },
  { value: '혼합', label: '혼합' },
]

export const studyTypeOptions = [
  {
    value: 'IT · 프로그래밍 > 개발 교육과정',
    label: 'IT · 프로그래밍 > 개발 교육과정',
  },
  {
    value: 'IT · 프로그래밍 > 커리어 개발',
    label: 'IT · 프로그래밍 > 커리어 개발',
  },
  {
    value: 'IT · 프로그래밍 > 개발 프로젝트',
    label: 'IT · 프로그래밍 > 개발 프로젝트',
  },
]

export const daysOfWeek = [
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
  '일요일',
  '공휴일 포함',
]
