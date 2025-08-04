interface SortTabProps {
  selected: 'latest' | 'popular'
  onChange: (value: 'latest' | 'popular') => void
}

export default function SortTab({ selected, onChange }: SortTabProps) {
  return (
    <div className="flex items-center gap-[16px]">
      <button
        className={`text-[16px] cursor-pointer ${
          selected === 'latest' ? 'text-[#121212] ' : 'text-[#CECECE]'
        }`}
        onClick={() => onChange('latest')}
      >
        최신순
      </button>
      <span className="text-[#121212]">|</span>
      <button
        className={`text-[16px] cursor-pointer ${
          selected === 'popular' ? 'text-[#121212] ' : 'text-[#CECECE]'
        }`}
        onClick={() => onChange('popular')}
      >
        인기순
      </button>
    </div>
  )
}
