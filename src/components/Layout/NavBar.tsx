import { Link, useNavigate } from 'react-router-dom'
import logoWhite from '@/assets/images/logo-w.png'
import { CiSearch } from 'react-icons/ci'
import { useState, useRef } from 'react'
import CategoryMenu from '@/components/Layout/CategoryMenu'
import { useUserInfo } from '@/store/userInfoStore'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import NavbarUserInfoDropDown from '@/components/Layout/NavbarUserInfoDropDown'
import { HiMenu } from 'react-icons/hi' // 햄버거 메뉴 아이콘 추가

export default function NavBar() {
  const userInfo = useUserInfo((state) => state.userInfo)
  const [search, setSearch] = useState('')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const navigate = useNavigate()
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // 모바일 메뉴 상태 추가

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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
    useUserInfo.getState().setUserInfo(null)
    setIsDropdownOpen(false)
    navigate('/')

    // try {
    //   const res = await api.post('/api/v1/auth/logout')
    //   if (res.status === 200) {
    //     useUserInfo.getState().setUserInfo(null)
    //     setIsDropdownOpen(false)
    //     navigate('/')
    //   }
    // } catch (error) {
    //   if (axios.isAxiosError(error)) {
    //     const status = error.response?.status
    //     const detail = error.response?.data?.detail

    //     if (status === 401) {
    //       alert(detail || '인증 정보가 유효하지 않습니다. 다시 로그인해주세요.')
    //       useUserInfo.getState().setUserInfo(null)
    //       navigate('/login')
    //     } else {
    //       alert('알 수 없는 오류가 발생했습니다.')
    //     }
    //   } else {
    //     alert('네트워크 오류 또는 서버 오류가 발생했습니다.')
    //   }
    // }
  }

  const navItemClass = 'transition-colors hover:text-[#8349FF] hover:font-bold'

  return (
    <div className="w-full bg-[#212429] text-white relative">
      <div className="flex flex-col w-full max-w-[1400px] mx-auto p-6 md:p-10">
        {/* 로고, 검색, 로그인/회원가입 */}
        <div className="flex items-center justify-between md:justify-center gap-[clamp(15px,10vw,108px)]">
          {/* 로고 */}
          <img
            src={logoWhite}
            alt="storbitlogo-white"
            className="w-[clamp(120px,20vw,240px)] h-auto"
          />

          {/* 모바일 햄버거 메뉴 */}
          <div className=" md:hidden">
            <button onClick={handleMobileMenuToggle} className="cursor-pointer">
              <HiMenu size={32} />
            </button>
          </div>

          {/* 검색창 (모바일에서는 숨김) */}
          <div className="hidden md:flex relative flex-grow max-w-[744px]">
            <input
              className="w-full min-w-40 h-[48px] bg-[#575757] rounded-full pl-6 pr-12"
              placeholder="어떤 공부를 하고 싶으세요?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(search)}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-[24px] cursor-pointer"
              onClick={() => handleSearch(search)}
            >
              <CiSearch />
            </button>
          </div>

          {/* 로그인/회원가입 (모바일에서는 숨김) */}
          <div className="hidden md:flex w-full gap-[12px] text-[16px] items-center relative max-w-max">
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
                  <div>{userInfo.nickname}</div>
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

        {/* 메뉴 영역 (모바일에서는 숨김) */}
        <div className="hidden md:flex gap-[65px] text-[20px] items-center mt-8">
          {/* 카테고리 메뉴 */}
          <div
            className="relative"
            onMouseEnter={openCategoryMenu}
            onMouseLeave={closeCategoryMenu}
          >
            <button
              type="button"
              className={`bg-transparent border-none cursor-pointer transition-colors duration-200 ${isCategoryOpen ? 'text-[#8349FF] font-bold' : 'text-white hover:text-[#8349FF] hover:font-bold'}`}
            >
              카테고리
            </button>
          </div>
          {/* 기타 메뉴 */}
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

      {/* 카테고리 메뉴 오버레이 */}
      {isCategoryOpen && (
        <div
          className="absolute left-0 z-50 w-full top-full"
          onMouseEnter={openCategoryMenu}
          onMouseLeave={closeCategoryMenu}
        >
          <CategoryMenu
            onCategorySelect={handleCategorySelect}
            onClose={() => setIsCategoryOpen(false)}
          />
        </div>
      )}

      {/* 모바일 전체 메뉴 오버레이 */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#212429] z-50 flex flex-col items-center justify-start p-6 animate-slide-in-right">
          {/* 닫기 버튼 */}
          <div className="flex justify-end items-start w-full h-[39px] mb-8 mt-[0.5px] ">
            <button onClick={handleMobileMenuToggle} className="cursor-pointer">
              <HiMenu size={32} />
            </button>
          </div>

          {/* 모바일 검색창 */}
          <div className="relative w-full max-w-sm mb-8">
            <input
              className="w-full h-12 bg-[#575757] rounded-full pl-4 pr-12"
              placeholder="어떤 공부를 하고 싶으세요?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(search)}
            />
            <button
              className="absolute text-2xl text-white -translate-y-1/2 cursor-pointer right-4 top-1/2"
              onClick={() => handleSearch(search)}
            >
              <CiSearch />
            </button>
          </div>

          {/* 모바일 메뉴 리스트 */}
          <ul className="flex flex-col gap-6 text-xl">
            <li>
              <Link to="/" onClick={handleMobileMenuToggle}>
                홈
              </Link>
            </li>
            <li>
              <Link to="/mystudy/applied" onClick={handleMobileMenuToggle}>
                나의 스터디
              </Link>
            </li>
            <li>
              <Link to="/study/create" onClick={handleMobileMenuToggle}>
                스터디 만들기
              </Link>
            </li>
            <li>
              <Link to="/event" onClick={handleMobileMenuToggle}>
                이벤트
              </Link>
            </li>
            <hr className="my-4 border-[#575757]" />
            {userInfo ? (
              <>
                <li>
                  <button
                    onClick={() => {
                      logout()
                      handleMobileMenuToggle()
                    }}
                  >
                    로그아웃
                  </button>
                </li>
                <li>
                  <Link to="#" onClick={handleMobileMenuToggle}>
                    {userInfo.user?.nickname} 님
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/auth/signup" onClick={handleMobileMenuToggle}>
                    회원가입
                  </Link>
                </li>
                <li>
                  <Link to="/login" onClick={handleMobileMenuToggle}>
                    로그인
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
