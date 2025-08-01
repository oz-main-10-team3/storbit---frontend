import { Link, useNavigate } from 'react-router-dom'
import logoWhite from '@/assets/images/logo-w.png'
import { CiSearch } from 'react-icons/ci'
import { useState, useRef } from 'react'
import CategoryMenu from '@/components/Layout/CategoryMenu'

export default function NavBar() {
  const [search, setSearch] = useState('')
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const navigate = useNavigate()
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = (searchQuery: string) => {
    navigate(`/search/${searchQuery}`)
  }

  const handleCategorySelect = (category: string, item: string) => {
    if (item) {
      navigate(`/search/${item}`)
    } else {
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

  const navItemClass = 'transition-colors duration-200 hover:text-[#8349FF] hover:font-bold'

  return (
    <div className="w-full bg-[#212429] text-white relative">
      <div className="flex flex-col gap-[40px] w-full max-w-[1400px] mx-auto h-[224px] justify-center">
        {/* 로고 / 검색 / 로그인/회원가입 */}
        <div className="flex items-center gap-[144px]">
          <img src={logoWhite} alt="storbitlogo-white" className="w-[240px] h-[80px]" />

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

          <div className="flex gap-[12px] text-[16px] items-center">
            <Link to="/auth/signup">회원가입</Link>
            <div>|</div>
            <Link to="/login">로그인</Link>
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
              className={`bg-transparent border-none text-inherit cursor-pointer transition-colors duration-200 ${
                isCategoryOpen ? 'text-[#8349FF]' : ''
              } hover:text-[#8349FF] hover:font-bold`}
            >
              카테고리
            </button>
          </div>

          <div><Link to="/" className={navItemClass}>홈</Link></div>
          <div><Link to="/mystudy/applied" className={navItemClass}>나의 스터디</Link></div>
          <div><Link to="/study/create" className={navItemClass}>스터디 만들기</Link></div>
          <div><Link to="/event" className={navItemClass}>이벤트</Link></div>
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