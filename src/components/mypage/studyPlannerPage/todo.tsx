import { cn } from '@/utils/cn'
import { GoCircle } from 'react-icons/go'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useState } from 'react'

export default function Todo({ content }: { content: string }) {
  const [isActive, setIsActive] = useState(false)
  return (
    <button
      className={cn(
        'flex items-center w-[390px] h-[48px] px-[16px] border-[1px] border-disabled-text rounded-[8px] bg-white cursor-pointer mt-[8px]',
        {
          'bg-secondary border-primary': isActive,
        }
      )}
      onClick={() => setIsActive((prev) => !prev)}
    >
      {isActive ? (
        <AiOutlineCheckCircle size={18} className="text-primary" />
      ) : (
        <GoCircle size={18} />
      )}
      <div className="text-[16px] pl-[5px]">{content}</div>
    </button>
  )
}
