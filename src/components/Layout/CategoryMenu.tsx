interface CategoryItem {
    title: string
    items: string[]
  }
  
  interface CategoryMenuProps {
    onCategorySelect?: (category: string, item: string) => void
    onClose?: () => void
  }
  
  const categoryData: CategoryItem[] = [
    { title: '언어', items: ['영어', '일본어'] },
    { title: '자격증', items: ['전산회계', '컴활'] },
    { title: '디자인', items: ['포토샵', '피그마'] },
    { title: 'IT·프로그래밍', items: ['웹개발', '게임개발'] },
    { title: '경영·마케팅', items: ['마케팅', '전략'] },
    { title: '취미', items: ['영화', '독서'] },
  ]
  
  export default function CategoryMenu({ 
    onCategorySelect, 
    onClose 
  }: CategoryMenuProps) {
    const handleItemClick = (categoryTitle: string, item: string) => {
      onCategorySelect?.(categoryTitle, item)
      onClose?.()
    }
  
    const handleCategoryTitleClick = (categoryTitle: string) => {
      onCategorySelect?.(categoryTitle, '')
      onClose?.()
    }
  
    return (
      <div className="w-full bg-[#212429] text-white border-t border-white">
        <div className="max-w-[1400px] mx-[124px] grid grid-cols-6 gap-[134px] p-[40px]">
          {categoryData.map((category) => (
            <div key={category.title}>
              <h3 
                className="font-semibold text-[20px] mb-[24px] cursor-pointer"
                onClick={() => handleCategoryTitleClick(category.title)}
              >
                {category.title}
              </h3>
              <ul className="space-y-1">
                {category.items.map((item) => (
                  <li 
                    key={item} 
                    className="cursor-pointer"
                    onClick={() => handleItemClick(category.title, item)}
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