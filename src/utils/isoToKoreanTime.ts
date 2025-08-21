export function isoToKoreanTime(isoString: string | Date) {
  const date = new Date(isoString)

  // 한국 시간대(KST, UTC+9)로 보정
  const koreanHour = date.getHours() // 이미 UTC → 로컬 변환됨 (만약 서버에서 UTC 그대로라면 +9 더해줘야 함)
  const hour12 = koreanHour % 12 === 0 ? 12 : koreanHour % 12
  const period = koreanHour < 12 ? '오전' : '오후'

  return `${period} ${hour12}시`
}
