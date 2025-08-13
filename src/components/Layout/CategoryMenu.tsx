import { useNavigate } from 'react-router-dom'
import { categoryData, toPath } from '@/data/categoryData'

interface CategoryMenuProps {
  onCategorySelect?: (category: string, item: string) => void
  onClose?: () => void
}

export default function CategoryMenu({
  onCategorySelect,
  onClose,
}: CategoryMenuProps) {
  const navigate = useNavigate()

  const goCategory = (categoryTitle: string) => {
    onCategorySelect?.(categoryTitle, '')
    navigate(`/category/${toPath(categoryTitle)}`)
    onClose?.()
  }

  const goSubcategory = (categoryTitle: string, item: string) => {
    onCategorySelect?.(categoryTitle, item)
    navigate(`/category/${toPath(categoryTitle)}/${toPath(item)}`)
    onClose?.()
  }

  return (
    <div className="w-full bg-[#212429] text-white border-t border-white">
      <div className="max-w-[1400px] mx-[124px] grid grid-cols-6 gap-[134px] p-[40px]">
        {categoryData.map((category) => (
          <div key={category.title}>
            <h3
              className="font-semibold text-[20px] mb-[24px] cursor-pointer"
              onClick={() => goCategory(category.title)}
            >
              {category.title}
            </h3>
            <ul className="space-y-1">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer"
                  onClick={() => goSubcategory(category.title, item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
