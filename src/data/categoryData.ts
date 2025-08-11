export interface CategoryItem {
  title: string
  items: string[]
}

export const categoryData: CategoryItem[] = [
  { title: '언어', items: ['영어', '일본어'] },
  { title: '자격증', items: ['전산/세무/회계', '컴퓨터활용능력'] },
  { title: '디자인', items: ['포토샵/일러스트', '피그마'] },
  { title: 'IT·프로그래밍', items: ['웹 개발', '게임 개발'] },
  { title: '경영·마케팅', items: ['경영전략', '마케팅'] },
  { title: '취미', items: ['영화', '독서'] },
]

// URL 변환 헬퍼
export const toPath = (s: string) => encodeURIComponent(s.replace(/\s+/g, '-'))
export const fromPath = (s?: string) =>
  s ? decodeURIComponent(s).replace(/-/g, ' ') : ''
