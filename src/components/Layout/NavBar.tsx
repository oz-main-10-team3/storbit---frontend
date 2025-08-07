import { Link, useNavigate } from 'react-router-dom'
import logoWhite from '@/assets/images/logo-w.png'
import { CiSearch } from 'react-icons/ci'
import { useState, useRef } from 'react'
import CategoryMenu from '@/components/Layout/CategoryMenu'
import { useUserInfo } from '@/store/userInfoStore'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import NavbarUserInfoDropDown from '@/components/Layout/NavbarUserInfoDropDown'
import { cn } from '@/utils/cn'
import { api } from '@/api/mainApi'
import axios from 'axios'

export default function NavBar() {
  const userInfo = useUserInfo((state) => state.userInfo)
  const [search, setSearch] = useState('')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const navigate = useNavigate()
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSearch = (searchQuery: string) => {
    navigate(`/search/${searchQuery}`)
  }

  const handleCategorySelect = (category: string, item: string) => {
    if (item) {
      // 특정 항목 선택 시 - 해당 항목 페이지로 이동
      navigate(`/study/${item}`)
    } else {
      // 카테고리 제목 선택 시 - 해당 카테고리 페이지로 이동
      navigate(`/category/${category}`)
    }
    setIsCategoryOpen(false) // 선택 후 바로 닫기
  }

  // 카테고리 호버 이벤트 핸들러들
  const openCategoryMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsCategoryOpen(true)
  }

  const closeCategoryMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCategoryOpen(false)
    }, 300)
  }
  const logout = async () => {
    try {
      const res = await api.post('/api/v1/auth/logout')
      if (res.status === 200) {
        useUserInfo.getState().setUserInfo(null)
        setIsDropdownOpen(false)
        navigate('/')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const detail = error.response?.data?.detail

        if (status === 401) {
          alert(detail || '인증 정보가 유효하지 않습니다. 다시 로그인해주세요.')
          useUserInfo.getState().setUserInfo(null)
          navigate('/login')
        } else {
          alert('알 수 없는 오류가 발생했습니다.')
        }
      } else {
        alert('네트워크 오류 또는 서버 오류가 발생했습니다.')
      }
    }
  }

  const navItemClass = 'transition-colors hover:text-[#8349FF] hover:font-bold'

  return (
    <div className="w-full bg-[#212429] text-white relative">
      <div className="flex flex-col gap-[40px] w-full max-w-[1400px] mx-auto h-[224px] justify-center">
        {/* 로고 / 검색 / 로그인/회원가입 */}
        <div
          className={cn(
            'flex items-center ',
            userInfo ? 'gap-[108px]' : 'gap-[144px]'
          )}
        >
          <img
            src={logoWhite}
            alt="storbitlogo-white"
            className="w-[240px] h-[80px]"
          />

          <div className="relative w-[744px]">
            <input
              className="w-[744px] h-[48px] bg-[#575757] rounded-full pl-[300px]"
              placeholder="어떤 공부를 하고싶으세요?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(search)}
            />
            <button
              className="absolute right-[30px] top-1/2 -translate-y-1/2 text-white text-[24px] cursor-pointer"
              onClick={() => handleSearch(search)}
            >
              <CiSearch />
            </button>
          </div>

          <div className="flex w-full gap-[12px] text-[16px] items-center relative">
            {userInfo ? (
              <>
                <button className="cursor-pointer" onClick={logout}>
                  로그아웃
                </button>
                <div>|</div>
                <button
                  className="flex items-center cursor-pointer"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                >
                  <div>{userInfo.user.nickname}</div>
                  {isDropdownOpen ? (
                    <MdKeyboardArrowUp size={20} />
                  ) : (
                    <MdKeyboardArrowDown size={20} />
                  )}
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/signup">회원가입</Link>
                <div>|</div>
                <Link to="/login">로그인</Link>
              </>
            )}
            {isDropdownOpen && (
              <NavbarUserInfoDropDown setIsDropdownOpen={setIsDropdownOpen} />
            )}
          </div>
        </div>

        {/* 메뉴 영역 */}
        <div className="flex gap-[65px] text-[20px] items-center">
          <div
            className="relative"
            onMouseEnter={openCategoryMenu}
            onMouseLeave={closeCategoryMenu}
          >
            <button
              type="button"
              className={`bg-transparent border-none cursor-pointer transition-colors duration-200 ${
                isCategoryOpen
                  ? 'text-[#8349FF] font-bold'
                  : 'text-white hover:text-[#8349FF] hover:font-bold'
              }`}
            >
              카테고리
            </button>
          </div>

          <div>
            <Link to="/" className={navItemClass}>
              홈
            </Link>
          </div>
          <div>
            <Link to="/mystudy/applied" className={navItemClass}>
              나의 스터디
            </Link>
          </div>
          <div>
            <Link to="/study/create" className={navItemClass}>
              스터디 만들기
            </Link>
          </div>
          <div>
            <Link to="/event" className={navItemClass}>
              이벤트
            </Link>
          </div>
        </div>
      </div>

      {/* 카테고리 메뉴 */}
      {isCategoryOpen && (
        <div
          className="absolute top-full left-0 w-full z-50"
          onMouseEnter={openCategoryMenu}
          onMouseLeave={closeCategoryMenu}
        >
          <CategoryMenu
            onCategorySelect={handleCategorySelect}
            onClose={() => setIsCategoryOpen(false)}
          />
        </div>
      )}
    </div>
  )
}
