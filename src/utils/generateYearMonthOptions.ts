export const generateYearMonthOptions = (
  startYear: number,
  endYear: number
) => {
  const options = []
  for (let year = endYear; year >= startYear; year--) {
    for (let month = 12; month >= 1; month--) {
      const label = `${year}.${month.toString().padStart(2, '0')}`
      const value = `${year}-${month.toString().padStart(2, '0')}`
      options.push({ label, value })
    }
  }
  return options
}
