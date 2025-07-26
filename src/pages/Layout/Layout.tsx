import Footer from '@/components/Layout/Footer'
import NavBar from '@/components/Layout/NavBar'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}
