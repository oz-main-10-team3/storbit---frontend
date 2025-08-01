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
    onCategorySelect = () => {}, 
    onClose = () => {} 
  }: CategoryMenuProps = {}) {
    const handleItemClick = (categoryTitle: string, item: string) => {
      if (onCategorySelect) {
        onCategorySelect(categoryTitle, item)
      }
      // 카테고리 선택 후 메뉴 닫기
      if (onClose) {
        onClose()
      }
    }
  
    const handleCategoryTitleClick = (categoryTitle: string) => {
      // 카테고리 제목 클릭 시 해당 카테고리 전체 검색
      if (onCategorySelect) {
        onCategorySelect(categoryTitle, '')
      }
      if (onClose) {
        onClose()
      }
    }
  
    return (
      <div className="w-full bg-[#212429] text-white border-t border-white">
        <div className="max-w-[1400px] mx-auto p-6 grid grid-cols-6 gap-4">
          {categoryData.map((category) => (
            <div key={category.title}>
              <h3 
                className="font-semibold text-[20px] mb-[24px] cursor-pointer 
                transition-colors duration-200"
                onClick={() => handleCategoryTitleClick(category.title)}
              >
                {category.title}
              </h3>
              <ul className="space-y-1">
                {category.items.map((item) => (
                  <li 
                    key={item} 
                    className="text-[16px] cursor-pointer"
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