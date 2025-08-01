import { useNavigate, useParams, useLocation } from 'react-router-dom'

const sideMenu = {
  category: 'IT · 프로그래밍',
  items: ['전체', '웹 개발', '게임 개발'],
}

export default function SideCategoryMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const { category } = useParams()

  const handleClick = (item: string) => {
    if (item === '전체') {
      navigate(`/category/${encodeURIComponent(category || '')}`)
    } else {
      navigate(`/category/${encodeURIComponent(category || '')}/${encodeURIComponent(item)}`)
    }
  }

  return (
    <aside className="w-[200px] flex flex-col gap-[64px]">
      <h2 className="text-[24px] font-semibold">{sideMenu.category}</h2>
      <ul className="flex flex-col gap-[24px]">
      {sideMenu.items.map((item) => {
        const isActive =
            item === '전체'
            ? location.pathname === `/category/${encodeURIComponent(category || '')}`
            : location.pathname === `/category/${encodeURIComponent(category || '')}/${encodeURIComponent(item)}`

        return (
            <li
            key={item}
            className={`cursor-pointer text-[18px] transition-colors duration-200 ${
                isActive ? 'text-[#8349FF] font-semibold' : 'text-[#D1D1D1] hover:text-[#8349FF]'
            }`}
            onClick={() => handleClick(item)}
            >
            {item}
            </li>
        )
        })}
      </ul>
    </aside>
  )
}