import { NavLink } from 'react-router-dom'

const menuItems = [
  { path: '/mystudy/applied', label: '신청한 스터디' },
  { path: '/mystudy/joined', label: '참여한 스터디' },
  { path: '/mystudy/created', label: '내가 만든 스터디' },
  { path: '/mystudy/favorites', label: '찜한 스터디' },
]

export default function MyStudySidebar() {
  return (
    <div className="flex flex-col gap-[40px] text-sm text-text font-medium mt-[88px]">
      {menuItems.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `transition-colors duration-150 ${
              isActive ? 'text-primary font-bold' : 'text-[#BDBDBD]'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  )
}
