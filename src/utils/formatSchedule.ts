const dayMap: Record<string, string> = {
  월요일: '월',
  화요일: '화',
  수요일: '수',
  목요일: '목',
  금요일: '금',
  토요일: '토',
  일요일: '일',
}

export function formatSchedule(daysStr: string, timeStr: string) {
  return (
    daysStr
      .replace(/포함/g, '') // '포함' 제거
      .split(',') // , 로 나누기
      .map((day) => {
        const trimmed = day.trim()
        return dayMap[trimmed] || trimmed // 요일이면 변환, 아니면 그대로
      })
      .join(', ') + ` ${timeStr}`
  )
}
