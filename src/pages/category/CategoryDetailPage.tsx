import SideCategoryMenu from '@/pages/category/SideCategoryMenu'

export default function CategoryDetailPage() {
    return (
      <div className="w-full mt-[80px]">
        <div className="max-w-[1400px] mx-auto flex gap-[40px] py-[40px]">
          {/* 사이드 메뉴 (고정) */}
          <aside className="w-[200px] flex-shrink-0">
            <SideCategoryMenu />
          </aside>
  
          {/* 콘텐츠 영역 */}
          <section className="flex-1 ml-[40px]">
            {/* 이미지 카드, 타이틀 등 들어감 */}
            <h2 className="text-[20px] font-semibold mb-[24px]">전체보기</h2>
            {/* 카드 그리드 등 */}
          </section>
        </div>
      </div>
    )
  }