import StudyCard from '@/common/StudyCard'

interface Item {
  imageUrl: string
  title: string
  description: string
  memberCount?: number
  time?: string
}

interface Props {
  items: Item[]
  onClickItem?: (item: Item) => void
}

export default function SearchResultList({ items, onClickItem }: Props) {
  return (
    <div className="grid grid-cols-3 gap-[40px]">
      {items.map((item, i) => (
        <StudyCard
          key={`${item.title}-${i}`}
          variant="horizontal"
          className="w-[440px]"
          thumbnailRatio="w-[440px] h-[256px]"
          imageUrl={item.imageUrl}
          title={item.title}
          description={item.description}
          memberCount={item.memberCount}
          time={item.time}
          onClick={() => onClickItem?.(item)}
        />
      ))}
    </div>
  )
}
