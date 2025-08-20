function parseKoreanTime(timeStr: string) {
  const match = timeStr.match(/(오전|오후)\s*(\d{1,2}):(\d{2})/)
  if (!match) return null

  const [, period, hourStr, minuteStr] = match
  let hour = parseInt(hourStr, 10)
  const minute = parseInt(minuteStr, 10)

  if (period === '오전') {
    if (hour === 12) hour = 0
  } else {
    // 오후
    if (hour !== 12) hour += 12
  }

  return { hour, minute }
}

export function koreanTimeToISO(timeStr: string, date = '2025-08-20') {
  const parsed = parseKoreanTime(timeStr)
  if (!parsed) return null

  const { hour, minute } = parsed
  // 한국 시간(KST, UTC+9)을 기준으로 Date 객체 생성
  const dateObj = new Date(
    `${date}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00+09:00`
  )

  return dateObj.toISOString() // UTC 기준 ISO 문자열
}
