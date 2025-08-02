import Calendar from 'react-calendar'
import './AttendanceCalendar.css'
import { useAttendanceCalendar } from '@/store/useAttendance'

export default function AttendanceCalendar({
  activeStartDate,
  setActiveStartDate,
}: {
  activeStartDate: Date
  setActiveStartDate: React.Dispatch<React.SetStateAction<Date>>
}) {
  const attendanceDates = useAttendanceCalendar(
    (state) => state.attendanceDates
  )

  return (
    <Calendar
      locale="en-US"
      showNeighboringMonth={false}
      calendarType="gregory"
      activeStartDate={activeStartDate}
      onActiveStartDateChange={({ activeStartDate }) =>
        setActiveStartDate(activeStartDate ?? new Date())
      }
      tileClassName={({ date, view }) => {
        if (view === 'month') {
          const dateStr = date.toISOString().split('T')[0]
          return attendanceDates.includes(dateStr)
            ? 'bg-green-200 rounded-full'
            : ''
        }
      }}
    />
  )
}
