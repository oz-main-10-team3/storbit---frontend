import MyStudySidebar from '@/components/Layout/MyStudySidebar'
import { Outlet } from 'react-router'

export default function MyStudyLayout() {
  return (
    <div className="flex gap-[20px] max-w-[1400px] mx-auto ">
      <MyStudySidebar />
      <Outlet />
    </div>
  )
}
