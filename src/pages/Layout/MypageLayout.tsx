import MypageSidebar from '@/components/Layout/MypageSidebar'
import { Outlet } from 'react-router'

export default function MypageLayout() {
  return (
    <div className="flex gap-[20px]">
      <MypageSidebar />
      <Outlet />
    </div>
  )
}
