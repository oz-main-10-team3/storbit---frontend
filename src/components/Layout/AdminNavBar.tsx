import { useNavigate } from 'react-router-dom'
import { useUserInfo } from '@/store/userInfoStore'
import { api } from '@/api/mainApi'
import axios from 'axios'
import adminLogo from '@/assets/images/admin-logo.png'
import { cn } from '@/utils/cn.ts'

export default function AdminNavBar() {
  const { userInfo, setUserInfo } = useUserInfo()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      const res = await api.post('/api/v1/auth/logout')
      if (res.status === 200) {
        setUserInfo(null)
        navigate('/event')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const detail = error.response?.data?.detail

        if (status === 401) {
          alert(detail || '인증 정보가 유효하지 않습니다.')
          setUserInfo(null)
          navigate('/login')
        } else {
          alert('알 수 없는 오류가 발생했습니다.')
        }
      } else {
        alert('네트워크 오류 또는 서버 오류가 발생했습니다.')
      }
    }
  }

  return (
    <div className="flex flex-col gap-[20px] w-full max-w-[1920px] mx-auto h-[224px] justify-center">
      {/* Top Navigation */}
      <nav className="h-[64px] flex items-center justify-between px-[80px] w-full border-b border-gray-200">
        <div
          className={cn(
            'flex items-center ',
            userInfo ? 'gap-[166px]' : 'gap-[166px]'
          )}
        >
          <span className="text-[24px] font-extrabold text-[#925AFF]">
            <img
              src={adminLogo}
              alt="storbitlogo-white"
              className="w-[240px] h-[80px]"
            />
          </span>
          <div className="relative w-[744px]">
            <ul className="flex gap-[40px] text-[14px] font-medium text-gray-300">
              <li className="cursor-pointer">대시보드</li>
              <li className="cursor-pointer">사용자 관리</li>
              <li className="cursor-pointer">스터디 관리</li>
              <li className="text-[#925AFF] font-bold cursor-pointer">
                콘텐츠 관리
              </li>
              <li className="cursor-pointer">설정</li>
            </ul>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-gray-300">
            {userInfo?.user?.nickname || '스토빗관리자'}
          </span>
          <button
            onClick={logout}
            className="ml-2 border border-gray-300 px-[8px] py-[2px] text-[12px] text-gray-500 rounded bg-gray-50"
          >
            로그아웃
          </button>
        </div>
      </nav>

      {/* Sub Navigation */}
      <div className="w-full h-[48px]  flex items-center  px-[80px] border-b border-gray-200">
        <ul className="flex gap-[20px] text-[14px] font-medium text-gray-400 relative">
          <li className="relative font-bold text-[#925AFF] cursor-pointer">
            이벤트 작성
          </li>
          <li className="cursor-pointer text-gray-400">이벤트 관리</li>
          <li className="cursor-pointer text-gray-400">공지사항</li>
          <li className="cursor-pointer text-gray-400">FAQ관리</li>
        </ul>
      </div>
    </div>
  )
}
