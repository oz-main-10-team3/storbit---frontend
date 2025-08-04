import { create } from 'zustand'

const mockAttendanceData: {
  [key: string]: string[] // key: `${year}-${month}-${studyId}`, value: 출석 날짜 배열
} = {
  '2025-08-frontend': ['2025-08-01', '2025-08-05', '2025-08-15'],
  '2025-08-backend': ['2025-08-02', '2025-08-10'],
  '2025-07-algorithm': ['2025-07-03', '2025-07-20'],
}

interface AttendanceCalendar {
  attendanceDates: string[]
  setAttendanceDates: (key: string) => void
}

export const useAttendanceCalendar = create<AttendanceCalendar>((set) => ({
  attendanceDates: [],
  setAttendanceDates: (
    key // key: `${year}-${month}-${studyId}`, value: 출석 날짜 배열
  ) => {
    set(() => ({
      attendanceDates: mockAttendanceData[key] || [],
    }))
  },
}))
