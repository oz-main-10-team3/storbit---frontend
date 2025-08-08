import { NavLink, useParams } from 'react-router-dom'
import { categoryData, fromPath, toPath } from '@/data/categoryData'

export default function SideCategoryMenu() {
  const { category: rawCategory } = useParams()
  const categoryTitle = fromPath(rawCategory)

  // 현재 대분류 찾기 (없으면 첫 번째로 fallback)
  const currentCategory =
    categoryData.find((c) => c.title === categoryTitle) ?? categoryData[0]

  const menuItems = ['전체', ...currentCategory.items]

  const getLink = (item: string) =>
    item === '전체'
      ? `/category/${toPath(currentCategory.title)}`
      : `/category/${toPath(currentCategory.title)}/${toPath(item)}`

  return (
    <aside className="w-[200px] flex flex-col gap-[64px]">
      <h2 className="text-[24px] font-semibold">{currentCategory.title}</h2>
      <ul className="flex flex-col gap-[24px]">
        {menuItems.map((item) => (
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
