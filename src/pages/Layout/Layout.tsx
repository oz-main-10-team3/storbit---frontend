import Footer from '@/components/Layout/Footer'
import NavBar from '@/components/Layout/NavBar'
import AdminNavBar from '@/components/Layout/AdminNavBar'
import { Outlet, useLocation } from 'react-router-dom'
import { isAdmin } from '@/utils/isAdmin.ts'
import { useUserInfo } from '@/store/userInfoStore.ts'
import ScrollToTop from '@/common/ScrollToTop.tsx'

export default function Layout() {
  const { userInfo } = useUserInfo()
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')
  return (
    <>
      {isAdmin(userInfo) && isAdminPage ? <AdminNavBar /> : <NavBar />}
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  )
}
