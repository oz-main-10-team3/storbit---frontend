import { NavLink, useParams } from 'react-router-dom'

const sideMenu = {
  category: 'IT · 프로그래밍',
  items: ['전체', '웹 개발', '게임 개발'],
}

export default function SideCategoryMenu() {
  const { category } = useParams()
  
  const getLink = (item: string) => {
    return item === '전체'
      ? `/category/${encodeURIComponent(category || '')}`
      : `/category/${encodeURIComponent(category || '')}/${encodeURIComponent(item)}`
  }
  
  return (
    <aside className="w-[200px] flex flex-col gap-[64px]">
      <h2 className="text-[24px] font-semibold">{sideMenu.category}</h2>
      <ul className="flex flex-col gap-[24px]">
        {sideMenu.items.map((item) => (
          <li key={item}>
            <NavLink
              to={getLink(item)}
              end={item === '전체'}
              className={({ isActive }) =>
                `text-[18px] transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#8349FF] font-semibold'
                    : 'text-[#D1D1D1] hover:text-[#8349FF]'
                }`
              }
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
