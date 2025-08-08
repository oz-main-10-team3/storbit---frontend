export const toCustomDate = (dateStr: string) => {
  const d = new Date(dateStr)
  if (d.getHours() === 0 && d.getMinutes() === 0) {
    d.setDate(d.getDate() - 1)
    return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} 24:00`
  }
  return `${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}
