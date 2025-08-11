import { type ReactNode, useEffect, useRef, useState } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { AiOutlineLeft } from 'react-icons/ai'

interface DropdownOption<T = string> {
  label: ReactNode
  value: T
}

interface DropdownProps<T = string> {
  label?: ReactNode
  options: DropdownOption<T>[]
  selected?: T
  onChange: (value: T) => void
  placeholder?: string
  className?: string
}

const triggerVariants = cva(
  'w-full h-[48px]  rounded-md border text-sm text-left transition bg-white',
  {
    variants: {
      isOpen: {
        true: 'border-black text-text',
        false: 'border-gray-300 text-text4',
      },
    },
  }
)

const itemVariants = cva('text-sm cursor-pointer transition', {
  variants: {
    isActive: {
      true: 'text-primary',
      false: 'text-text2 hover:bg-dropDown-hover hover:text-primary',
    },
  },
})

export default function Dropdown<T = string>({
  label,
  options,
  selected,
  onChange,
  placeholder = '선택해 주세요',
  className,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedLabel = options.find((opt) => opt.value === selected)?.label
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className={cn('relative w-48', className)}>
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <button
        type="button"
        className={triggerVariants({ isOpen })}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex justify-between items-center w-full">
          {selectedLabel ?? <span className="text-text4">{placeholder}</span>}
          <span className="ml-2 text-text4">
            <AiOutlineLeft className="rotate-270" />
          </span>
        </span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              onClick={() => {
                onChange(opt.value)
                setIsOpen(false)
              }}
              className={itemVariants({ isActive: selected === opt.value })}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
