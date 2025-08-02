import { cn } from '@/utils/cn'
import { useState } from 'react'
import { MdCalendarMonth, MdKeyboardArrowDown } from 'react-icons/md'

interface DropdownProps {
  type: 'calendar' | 'study'
  options: { label: string; value: string }[]
  width?: number
  onChange: (value: string) => void
}

//option 2가지 type으로 정할 수 있게하기
//onChange(opt.value) 로 데이터 가져오기 set함수 props로 받아오기
//사이즈 너비를 받아와서 크기 조절하기

export default function DropDownCalendar({
  type,
  options,
  width,
  onChange,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(options[0].value)

  return (
    <div className="relative">
      <div
        className={cn(
          'flex items-center justify-between h-[43px] text-[14px] text-text4 border-[1px] border-[#bdbdbd] rounded-[4px] px-[8px] py-[10px] cursor-pointer',
          width ? `w-[${width}px]` : 'w-[104px]'
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div>{selected}</div>
        {type === 'calendar' && <MdCalendarMonth size={20} />}
        {type === 'study' && <MdKeyboardArrowDown size={20} />}
      </div>

      {isOpen && (
        <ul
          className={cn(
            'absolute z-10 mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto',
            width ? `w-[${width}px]` : 'w-[104px]'
          )}
        >
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              onClick={() => {
                setSelected(opt.label)
                setIsOpen(false)
                onChange(opt.value)
              }}
              className={cn(
                'px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-primary',
                selected === opt.label && 'bg-primary text-white'
              )}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
