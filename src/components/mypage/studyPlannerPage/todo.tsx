import { cn } from '@/utils/cn'
import { GoCircle } from 'react-icons/go'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useTodoStore } from '@/store/useTodoStore'
import type { TodoType } from '@/types/todo'

export default function Todo({ id, content, isActive }: TodoType) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  return (
    <button
      className={cn(
        'flex items-center w-[390px] h-[48px] px-[16px] border-[1px] border-disabled-text rounded-[8px] bg-white cursor-pointer mt-[8px]',
        {
          'bg-secondary border-primary': isActive,
        }
      )}
      onClick={() => toggleTodo(id)}
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
