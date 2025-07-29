import { Link, useNavigate } from 'react-router-dom'
import mainLogo from '@/assets/icons/MainLogo.png'
import { CiSearch } from 'react-icons/ci'
import { useState } from 'react'

export default function NavBar() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (searchQuery: string) => {
    navigate(`/search/${searchQuery}`)
  }
  return (
    <div className="w-full bg-[#212429] text-white">
      <div className="flex flex-col gap-[40px] w-full max-w-[1400px] mx-auto h-[224px] justify-center">
        <div className="flex items-center gap-[144px]">
          <img src={mainLogo} alt="스토빗로고" className="w-[240px] h-[80px]" />
          <div className="relative w-[744px]">
            <input
              className="w-[744px] h-[48px] bg-[#575757] rounded-full pl-[300px]"
              placeholder="어떤 공부를 하고싶으세요?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <button
              className="absolute right-[30px] top-1/2 -translate-y-1/2 text-white text-[24px] cursor-pointer"
              onClick={() => handleSearch(search)}
            >
              <CiSearch />
            </button>
          </div>
          <div className="flex gap-[12px] text-text3 text-[16px] items-center">
            <Link to="/auth/signup">회원가입</Link>
            <div>|</div>
            <Link to="/login">로그인</Link>
          </div>
        </div>
        <div className="flex gap-[65px] text-text3 text-[20px] items-center">
          <Link to="/study/category/1">카테고리</Link>
          <Link to="/">홈</Link>
          <Link to="/mystudy/applied">나의 스터디</Link>
          <Link to="/study/create">스터디 만들기</Link>
          <Link to="/event">이벤트</Link>
        </div>
      </div>
    </div>
  )
}
